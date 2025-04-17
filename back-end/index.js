// server.js
require('dotenv').config()
const express = require('express')
const multer  = require('multer')
const AWS     = require('aws-sdk')
const admin   = require('firebase-admin')

const app    = express()
const upload = multer()            // store file in memory

// —– AWS S3 setup —–
AWS.config.update({
  accessKeyId:     process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region:          process.env.AWS_REGION,
})
const s3 = new AWS.S3()

// —– Firebase Admin setup —–
// Place your downloaded serviceAccountKey.json next to this file
const serviceAccount = require('./serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})
const db = admin.firestore()

// —– Route: POST /upload —–
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file                   // multer puts the file here
    if (!file) return res.status(400).send('No file uploaded.')

    // generate a unique filename
    const key = `${Date.now()}_${file.originalname}`

    // upload to S3 (public-read so URL is accessible)
    const { Location: url } = await s3.upload({
      Bucket: process.env.S3_BUCKET_NAME,
      Key:    key,
      Body:   file.buffer,
      ContentType: file.mimetype,
      ACL:    'public-read',
    }).promise()

    // save into Firestore
    const doc = await db.collection('images').add({
      url,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    })

    // return the saved doc ID and URL
    res.json({ id: doc.id, url })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Upload failed' })
  }
})

// —– start server —–
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`> listening on http://localhost:${PORT}`)
})

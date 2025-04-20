import express from 'express';
import multer from 'multer';
import { uploadBufferToS3 } from './yourUploadHelpers.js';
import { reverseImageSearch } from './serpApi.js'; // your wrapper around serpapi
import { removeBackground } from './removeBg.js'; // your remove.bg helper
import admin from 'firebase-admin';

const upload = multer();
const app = express();




const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`> listening on http://localhost:${PORT}`)
})


app.post('/upload', upload.single('file'), async (req, res) => {
  // 1. Upload original to S3
  const key = `uploads/${Date.now()}_${req.file.originalname}`;
  const originalUrl = await uploadBufferToS3(req.file.buffer, key, req.file.mimetype);

  // // 2. Reverse-image search on that URL
  // const visualMatches = await reverseImageSearch(originalUrl);

  // // 3. Remove background & upload processed image
  // const nobgBuffer = await removeBackground(req.file.buffer);
  // const nobgKey = key.replace(/\.(png|jpe?g)$/i, '_nobg.png');
  // const processedUrl = await uploadBufferToS3(nobgBuffer, nobgKey, 'image/png');

  // // 4. Save metadata to Firestore
  // await admin.firestore().collection('clothes').add({
  //   originalUrl,
  //   processedUrl,
  //   visualMatches,
  //   createdAt: admin.firestore.FieldValue.serverTimestamp(),
  // });

  // res.json({ originalUrl, processedUrl, visualMatches });
  res.json({ originalUrl });

});
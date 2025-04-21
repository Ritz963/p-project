import express from 'express';
import { db, auth } from '../config/firebase.js';

const router = express.Router();


router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;

  try {

    //create user with Firebase
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name
    });

    //initialize user document in Firestore
    const userDocRef = db.collection('users').doc(userRecord.uid);
    await userDocRef.set({
      email: userRecord.email,
      name,
      createdAt: new Date()
    });

    //create the 'main' closet
    await setDoc(
      doc(db, 'users', userCredential.user.uid, 'closets', 'Main'),
      { createdAt: serverTimestamp() }
    );

    res.status(201).json({ message: 'User created successfully', uid: userRecord.uid });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: error.message || 'Error creating account' });
  }
});

export default router;

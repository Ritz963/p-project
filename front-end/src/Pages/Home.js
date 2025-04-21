// File: src/pages/Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../Components/Navigation';
import ImageCarousel from '../Components/ImageCarousel';
import ActionButtons from '../Components/ActionButtons';
import UploadModal from '../Components/UploadModal';
import Cursor from '../Components/cursor';
import { useClosetItems } from '../hooks/useClosetItems';
import { useAuth } from '../contexts/AuthContext';
import placeholder from '../assets/straight.png';
import '../css/App.css';
import { useSearchParams } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseClient';

function Home() {
  const [search] = useSearchParams();
  const closetName = search.get('closet') || 'Main';
  const { user, loading: authLoading } = useAuth();
  const userId = user?.uid;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { items: rawTops,    loading: l1 } = useClosetItems(userId, closetName, 'tops');
  const { items: rawBottoms, loading: l2 } = useClosetItems(userId, closetName, 'bottoms');
  const { items: rawShoes,   loading: l3 } = useClosetItems(userId, closetName, 'shoes');
  const loading = authLoading || l1 || l2 || l3;

  const tops    = rawTops   .map(i => i.imageUrl);
  const bottoms = rawBottoms.map(i => i.imageUrl);
  const shoes   = rawShoes  .map(i => i.imageUrl);

  const shirtImgs = tops.length    ? tops    : [placeholder];
  const pantImgs  = bottoms.length ? bottoms : [placeholder];
  const shoeImgs  = shoes.length   ? shoes   : [placeholder];

  const [idxTop,  setIdxTop]  = useState(0);
  const [idxBot,  setIdxBot]  = useState(0);
  const [idxShoe, setIdxShoe] = useState(0);

  const handleRandomize = () => {
    setIdxTop(  Math.floor(Math.random() * shirtImgs.length) );
    setIdxBot(  Math.floor(Math.random() * pantImgs .length) );
    setIdxShoe( Math.floor(Math.random() * shoeImgs .length) );
  };


  const handleUploadClick = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleFileUpload = async (file) => {
    if (!file || !userId) return;
    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', userId);
    formData.append('closetName', closetName);

    try {
      const { data } = await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return data;  
    } catch (err) {
      console.error('Upload failed:', err);
      throw err;
    }
  };

  if (loading) {
    return <div>Loading your closet…</div>;
  }


   const handleSave = async () => {
       if (!userId) return;
       const outfitCol = collection(db, 'users', userId, 'outfits');
       try {
         await addDoc(outfitCol, {
          closet: closetName,
           top:    shirtImgs[idxTop],
           bottom: pantImgs[idxBot],
           shoe:   shoeImgs[idxShoe],
           createdAt: serverTimestamp()
       });
       alert('Outfit saved!');
      } catch (err) {
       console.error('Save outfit failed', err);
         alert('Failed to save outfit.');
       }
     };

  return (
    <div className="app-container">
      <Navigation />


      <div className="main-content">
        <div className="carousels-container">
          <ImageCarousel
            images={shirtImgs}
            selectedIndex={idxTop}
            onChangeIndex={setIdxTop}
          />
          <ImageCarousel
            images={pantImgs}
            selectedIndex={idxBot}
            onChangeIndex={setIdxBot}
          />
          <ImageCarousel
            images={shoeImgs}
            selectedIndex={idxShoe}
            onChangeIndex={setIdxShoe}
            imageClass="shoes-image"
          />
        </div>

  <ActionButtons
    onSave={handleSave}
    onRandomize={handleRandomize}
    onUploadClick={handleUploadClick}
  />
</div>

      <UploadModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onUpload={handleFileUpload}
      />
    </div>
  );
}

export default Home;

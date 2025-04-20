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

  // Modal open state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1) Fetch the three collections
  const { items: rawTops,    loading: l1 } = useClosetItems(userId, closetName, 'tops');
  const { items: rawBottoms, loading: l2 } = useClosetItems(userId, closetName, 'bottoms');
  const { items: rawShoes,   loading: l3 } = useClosetItems(userId, closetName, 'shoes');
  const loading = authLoading || l1 || l2 || l3;

  // 2) Extract URLs (or placeholder)
  const tops    = rawTops   .map(i => i.imageUrl);
  const bottoms = rawBottoms.map(i => i.imageUrl);
  const shoes   = rawShoes  .map(i => i.imageUrl);

  const shirtImgs = tops.length    ? tops    : [placeholder];
  const pantImgs  = bottoms.length ? bottoms : [placeholder];
  const shoeImgs  = shoes.length   ? shoes   : [placeholder];

  // 3) Controlled indices for each carousel
  const [idxTop,  setIdxTop]  = useState(0);
  const [idxBot,  setIdxBot]  = useState(0);
  const [idxShoe, setIdxShoe] = useState(0);

  // 4) Randomize handler
  const handleRandomize = () => {
    setIdxTop(  Math.floor(Math.random() * shirtImgs.length) );
    setIdxBot(  Math.floor(Math.random() * pantImgs .length) );
    setIdxShoe( Math.floor(Math.random() * shoeImgs .length) );
  };

  // 5) Cursor effect
  useEffect(() => {
    const cursorEl = document.querySelector('.cursor');
    if (cursorEl) new Cursor(cursorEl);
  }, []);

  // 6) Upload modal handlers
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
      return data;  // { clothingType, brand, color, titles… }
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

      <svg className="cursor" width="80" height="80" viewBox="0 0 80 80">
        <circle className="cursor__inner" cx="40" cy="40" r="20" />
      </svg>

      <div className="main-content">
        {/* left side: the three stacked carousels */}
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

  {/* right side: your action buttons */}
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

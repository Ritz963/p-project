import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import ClosetCarousels from '../Components/ClosetCarousels';
import ActionButtons from '../Components/ActionButtons';
import UploadModal from '../Components/UploadModal';
import Cursor from '../Components/cursor';
import '../css/App.css';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFileUpload = (file) => {
    console.log('File uploaded:', file);
    // Add your file upload logic here
  };

  useEffect(() => {
    const cursor = new Cursor(document.querySelector('.cursor'));
  }, []);

  return (
    <div className="app-container">
      <Navigation />
      <svg className="cursor" width="80" height="80" viewBox="0 0 80 80">
        <circle className="cursor__inner" cx="40" cy="40" r="20" />
      </svg>
      <div className="main-content">
        <ClosetCarousels />
        <ActionButtons onUploadClick={handleUploadClick} />
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

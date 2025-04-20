import React from 'react';

const ActionButtons = ({ onUploadClick }) => {
  return (
    <div className="action-buttons">
      <button className="action-btn save-btn">Save Outfit</button>
      <button className="action-btn randomize-btn">Randomize</button>
      <button className="action-btn upload-btn" onClick={onUploadClick}>
        Upload
      </button>
    </div>
  );
};

export default ActionButtons;

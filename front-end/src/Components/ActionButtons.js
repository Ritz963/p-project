// src/Components/ActionButtons.js
import React from 'react';

const ActionButtons = ({ onSave, onRandomize, onUploadClick }) => {
  return (
    <div className="action-buttons">
      <button className="action-btn save-btn" onClick={onSave}>
        Save Outfit
      </button>
      <button className="action-btn randomize-btn" onClick={onRandomize}>
        Randomize
      </button>
      <button className="action-btn upload-btn" onClick={onUploadClick}>
        Upload
      </button>
    </div>
  );
};

export default ActionButtons;

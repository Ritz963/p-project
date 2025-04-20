import React, { useState, useRef, useEffect } from 'react';
import { MdOutlineUploadFile } from "react-icons/md";


const UploadModal = ({ isOpen, onClose, onUpload }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  // Whenever `file` changes, generate (or revoke) the preview URL
  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // cleanup when component unmounts or file changes
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleAreaClick = () => {
    fileInputRef.current && fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && (selected.type === 'image/jpeg' || selected.type === 'image/png')) {
      setFile(selected);
    } else {
      // you could show an error here if you like
      setFile(null);
    }
  };

  const handleConfirm = () => {
    if (file) {
      onUpload(file);
      setFile(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="upload-modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Upload Area */}
        <div className="upload-area" onClick={handleAreaClick}>
          {previewUrl
            ? <img src={previewUrl} alt="Preview" className="preview-image" />
            : <>
                <span className="upload-icon"><MdOutlineUploadFile /></span>
                <p className="upload-text">Click or tap to select a file</p>
              </>
          }
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {/* Confirm Button */}
        <button
          className="confirm-btn"
          onClick={handleConfirm}
          disabled={!file}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default UploadModal;

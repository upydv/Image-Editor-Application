import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Upload.css';  // Import the CSS file


function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  // const [upload, setUpload] =useState(false)
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', selectedFile);

    try {
      const response = await axios.post('https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const filePath = response.data.filePath;
        setProfileImage(filePath);
        alert(`Successfully Uploaded.`);
        // setUpload(true);
        navigate(`/sketching/${filePath}`);
      }
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      alert(`Upload Failed: ${errorMessage}`);
      console.error('Error uploading', errorMessage);
    }
  };

  return (
    <div className="UploadContainer">
      <label>Upload your Profile Picture</label>
      <form className="UploadImage" onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="file"
        name="profileImage"
        accept="image/*"
        onChange={handleFileChange}
      />

        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;

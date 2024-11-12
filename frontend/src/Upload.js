import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Set the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', selectedFile);

    try {
      // Send the POST request using Axios
      const response = await axios.post('https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setProfileImage(response.data.filePath);
        alert(`Successfully Uploaded.`);
      }
    } catch (error) 
    {
      const errorMessage = error.response ? error.response.data : error.message;
      alert(`Upload Failed: ${errorMessage}`);
      console.error('Error uploading', errorMessage);
    }
  };

  return (
    <div>
      <label>Upload your Profile Picture</label>
      <form className="UploadImage" onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="file"
          name="profileImage"
          onChange={handleFileChange}
          style={{ margin: '10px', width: '250px' }}
        />
        <button type="submit">Upload</button>
      </form>

      {/* Display the uploaded profile image if available */}
      {profileImage && <div>Profile Image Path: {profileImage}</div>}
    </div>
  );
}

export default Upload;

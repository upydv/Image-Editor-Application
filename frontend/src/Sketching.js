import React, { useState } from 'react';
import Upload from './Upload';
import Header from './Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Sketching.css';

function Sketching() {
    const [flag, setFlag] = useState(false);
    const { filename } = useParams();
    const profileImage = `https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/uploads/${filename}`;
    const SKETCHED_PATH = `https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/sketched_pic/sketched_${filename}`;

    const fun_Skeching = async () => {
        try {
            const response = await axios.post('https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/api/sketch', {
                imageUrl: profileImage
            });
            alert("Sketched image saved");
            console.log(response.data.message);
            setFlag(true)
        } catch (error) {
            console.error("Error in sketching:", error);
            alert(error);
        }
    };

    const downloadImage = async () => {
        try {
            const response = await fetch(SKETCHED_PATH);
            
            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `sketched_${filename}`;  // Specify the filename for the download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);  // Clean up the object URL
            } else {
                alert("Sketched image is not available yet. Please try again later.");
            }
        } catch (error) {
            console.error("Error downloading the image:", error);
            alert("There was an error downloading the image.");
        }
    };
    

    return (
        <>
        <Header/>
        <div className="page">
            <div className="container">
                <p className="description">
                    Sketching by pen and pencil is a traditional art form that involves creating detailed images using simple tools.
                    Pencils are often used for shading and soft lines, while pens provide sharp, defined edges. This technique allows
                    artists to explore textures, depth, and intricate details, making each sketch unique and expressive.
                </p>
            </div>
            <div className="upload-section">
                <Upload />
            </div>
            <div className="image-row">
                <img src={profileImage} alt="Uploaded Preview" className="image" />
                <button onClick={fun_Skeching} className="button">Sketching It</button>
                {flag && (
        <img src={SKETCHED_PATH} alt="Sketched Result" className="image" />
      )}
                {/* <img src={SKETCHED_PATH} alt="Sketched Result" className="image" /> */}
            </div>
            { flag &&(
                <button onClick={downloadImage} className="button">
                    Download Sketched Image
                </button>)}
        </div>
        </>
    );
}

export default Sketching;

import React, { useState } from 'react';
import Upload from './Upload';
import Header from './Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Sketching.css';

function Grayscale() {
    const [flag, setFlag] = useState(false);
    const { filename } = useParams();
    const profileImage = `https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/uploads/${filename}`;
    const SAVE_PATH = `https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/Gray_Scale/Grayscale_${filename}`;

    const Function = async () => {
        try {
            const response = await axios.post('https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/api/Grayscale', {
                imageUrl: profileImage
            });
            alert("Grayscale image saved");
            console.log(response.data.message);
            setFlag(true)
        } catch (error) {
            console.error("Error in Grayscale:", error);
            alert(error);
        }
    };

    const downloadImage = async () => {
        try {
            const response = await fetch(SAVE_PATH);
            
            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `Grayscale_${filename}`;  // Specify the filename for the download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);  // Clean up the object URL
            } else {
                alert("Grayscale image is not available yet. Please try again later.");
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
            <div className="upload-section">
            <Upload routingPlace="Grayscale" />
            </div>
            <div className="image-row">
                <img src={profileImage} alt="Uploaded Preview" className="image" />
                <button onClick={Function} className="button">Grayscale It</button>
                {flag && (
                    <img src={SAVE_PATH} alt="Grayscale Result" className="image" />
                )}
            </div>
            { flag &&(
                <button onClick={downloadImage} className="button">
                    Download Grayscale Image
                </button>)}
        </div>
        </>
    );
}

export default Grayscale;

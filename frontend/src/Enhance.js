import React, { useState } from 'react';
import Upload from './Upload';
import Header from './Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Sketching.css';

function Enhance() {
    const [flag, setFlag] = useState(false);
    const { filename } = useParams();
    const profileImage = `https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/uploads/${filename}`;
    const SAVE_PATH = `https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/Enhanced_Images/enhanced_${filename}`;

    const Function = async () => {
        try {
            const response = await axios.post('https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/api/Enhance', {
                imageUrl: profileImage,
            });
            alert("Sharpened image saved");
            console.log(response.data.message);
            setFlag(true);
        } catch (error) {
            console.error("Error in sharpening the image:", error);
            alert("An error occurred while sharpening the image.");
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
                link.download = `Sharpened_${filename}`; // Specify the filename for the download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url); // Clean up the object URL
            } else {
                alert("Sharpened image is not available yet. Please try again later.");
            }
        } catch (error) {
            console.error("Error downloading the image:", error);
            alert("There was an error downloading the sharpened image.");
        }
    };

    return (
        <>
            <Header />
            <div className="page">
                <div className="container">
                    <p className="description">
                        Sharpening enhances the edges of an image, making it appear crisper and more defined.
                        This technique is widely used in image processing to highlight details and improve clarity.
                    </p>
                </div>
                <div className="upload-section">
                    <Upload routingPlace="Enhance" />
                </div>
                <div className="image-row">
                    <img src={profileImage} alt="Uploaded Preview" className="image" />
                    <button onClick={Function} className="button">Sharpen Image</button>
                    {flag && (
                        <img src={SAVE_PATH} alt="Sharpened Image Result" className="image" />
                    )}
                </div>
                {flag && (
                    <button onClick={downloadImage} className="button">
                        Download Sharpened Image
                    </button>
                )}
            </div>
        </>
    );
}

export default Enhance;

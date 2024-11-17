import React, { useState } from 'react';
import Upload from './Upload';
import Header from './Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Sketching.css';

function Mirror() {
    const [flag, setFlag] = useState(false);
    const { filename } = useParams();
    const profileImage = `https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/uploads/${filename}`;
    const mirroredImagePath = `https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/Mirrored_Images/mirrored_${filename}`;

    // Function to handle the mirroring process
    const fun_mirror = async () => {
        try {
            const response = await axios.post('https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/api/mirror', {
                imageUrl: profileImage
            });
            alert("Mirrored image saved");
            console.log(response.data.message);
            setFlag(true); // Display the mirrored image after it is processed
        } catch (error) {
            console.error("Error in Mirroring:", error);
            alert("There was an error processing the image. Please try again.");
        }
    };

    // Function to handle the download of the mirrored image
    const downloadImage = async () => {
        try {
            const response = await fetch(mirroredImagePath);
            
            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `mirrored_${filename}`;  // Specify the filename for the download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);  // Clean up the object URL
            } else {
                alert("Mirrored image is not available yet. Please try again later.");
            }
        } catch (error) {
            console.error("Error downloading the image:", error);
            alert("There was an error downloading the image.");
        }
    };

    return (
        <>
        <Header />
        <div className="page">
            {/* <div className="container">
                <p className="description">
                    Mirroring is a simple yet powerful image manipulation technique where the image is reflected horizontally or vertically, creating a symmetrical effect. This can give an artistic, dynamic, and balanced look to your photos.
                </p>
            </div> */}
            <div className="upload-section">
                <Upload routingPlace="Mirror" />
            </div>
            <div className="image-row">
                <img src={profileImage} alt="Uploaded Preview" className="image" />
                <button onClick={fun_mirror} className="button">Mirror It</button>
                {flag && (
                    <img src={mirroredImagePath} alt="Mirrored Result" className="image" />
                )}
            </div>
            {flag && (
                <button onClick={downloadImage} className="button">
                    Download Mirrored Image
                </button>
            )}
        </div>
        </>
    );
}

export default Mirror;

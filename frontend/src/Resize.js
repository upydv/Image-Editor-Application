import React, { useState } from 'react';
import Upload from './Upload';
import Header from './Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Sketching.css'; // Updated CSS file for resizing functionality

function Resize() {
    const [flag, setFlag] = useState(false);
    const [height, setHeight] = useState(0); // Default height
    const [width, setWidth] = useState(0); // Default width
    const { filename } = useParams();
    const profileImage = `https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/uploads/${filename}`;
    const SAVE_PATH = `https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/Resized_images/resized_${filename}`;

    const Function = async () => {
        try {
            const response = await axios.post('https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/api/Resize', {
                imageUrl: profileImage,
                width: width,
                height: height,
            });
            alert("Resized image has been saved successfully.");
            console.log(response.data.message);
            setFlag(true);
            // navigate(`/Resize`);
        } catch (error) {
            console.error("Error in resizing the image:", error);
            alert("Error occurred while resizing the image. Please try again.");
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
                link.download = `Resized_${filename}`; // Updated filename for resized image
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url); // Clean up the object URL

            } else {
                alert("Resized image is not available yet. Please try again later.");
            }
        } catch (error) {
            console.error("Error downloading the resized image:", error);
            alert("There was an error downloading the resized image.");
        }
    };

    const handleInputChange = () => {
        const h = document.getElementById('height').value;
        const w = document.getElementById('width').value;

        if (h) setHeight(parseInt(h, 10)); // Ensure the value is an integer
        if (w) setWidth(parseInt(w, 10)); // Ensure the value is an integer
        Function();
    };

    return (
        <>
            <Header />
            <div className="page">
                <div className="upload-section">
                    <Upload routingPlace="Resize" />
                    <div className="resize-inputs">
                        <input
                            id="height"
                            required
                            type="number"
                            placeholder="Enter Height (px)"
                            className="input"
                        />
                        <input
                            id="width"
                            required
                            type="number"
                            placeholder="Enter Width (px)"
                            className="input"
                        />
                    </div>
                </div>
                <div className="image-row">
                    <img src={profileImage} alt="Uploaded Preview" className="image" />
                    <button onClick={handleInputChange} className="button">
                        Resize Image
                    </button>
                    {flag && (
                        <img src={SAVE_PATH} alt="Resized Image Result" className="image" />
                    )}
                </div>
                {flag && (
                    <button onClick={downloadImage} className="button">
                        Download Resized Image
                    </button>
                )}
            </div>
        </>
    );
}

export default Resize;

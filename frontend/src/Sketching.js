import React from 'react';
import Upload from './Upload';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Sketching.css';

function Sketching() {
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
        } catch (error) {
            console.error("Error in sketching:", error);
            alert(error);
        }
    };

    return (
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
                <img src={SKETCHED_PATH} alt="Sketched Result" className="image" />
            </div>
        </div>
    );
}

export default Sketching;

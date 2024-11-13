import React from 'react';
import Upload from './Upload';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Sketching() {
    const pageStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)'
    };

    const containerStyle = {
        width: '80%',
        maxWidth: '500px',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '2px solid #ff6b6b'
    };

    const descriptionStyle = {
        fontSize: '1em',
        color: '#333',
        marginBottom: '20px'
    };

    const { filename } = useParams();
    let profileImage = `https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/uploads/${filename}`;

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
        <div style={pageStyle}>
            <div style={containerStyle}>
                <p style={descriptionStyle}>
                    Sketching by pen and pencil is a traditional art form that involves creating detailed images using simple tools.
                    Pencils are often used for shading and soft lines, while pens provide sharp, defined edges. This technique allows
                    artists to explore textures, depth, and intricate details, making each sketch unique and expressive.
                </p>
                <Upload />
                <img src={profileImage} alt="Not available" style={{ width: "50%", height: "50%" }} />
            </div>
            <div>
                <button onClick={fun_Skeching}>Sketching It</button>
            </div>
        </div>
    );
}

export default Sketching;

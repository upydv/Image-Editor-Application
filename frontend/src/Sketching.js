import React from 'react';
import Upload from './Upload'
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

    return (
        <div style={pageStyle}>
            <div style={containerStyle}>
                <p style={descriptionStyle}>
                    Sketching by pen and pencil is a traditional art form that involves creating detailed images using simple tools.
                    Pencils are often used for shading and soft lines, while pens provide sharp, defined edges. This technique allows
                    artists to explore textures, depth, and intricate details, making each sketch unique and expressive.
                </p>
                <Upload/>
            </div>
        </div>
    );
}

export default Sketching;

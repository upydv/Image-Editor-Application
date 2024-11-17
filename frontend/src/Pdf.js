import React, { useState } from 'react';
import Upload from './Upload';
import Header from './Header';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Sketching.css';

function Pdf() {
    const [flag, setFlag] = useState(false);
    const { filename } = useParams();
    const profileImage = `https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/uploads/${filename}`;
    const SAVE_PATH = `https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/Converted_PDFs/converted_${filename}.pdf`;

    const Function = async () => {
        try {
            const response = await axios.post('https://friendly-parakeet-rqqvrjqg4v7fwxr7-5000.app.github.dev/api/ImageToPDF', {
                imageUrl: profileImage
            });
            alert("Image converted to PDF successfully.");
            console.log(response.data.message);
            setFlag(true);
        } catch (error) {
            console.error("Error converting image to PDF:", error);
            alert("There was an error converting the image to PDF.");
        }
    };

    const downloadPDF = async () => {
        try {
            const response = await fetch(SAVE_PATH);
    
            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `Converted_${filename}.pdf`; // Specify the filename for the PDF
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url); // Clean up the object URL
            } else {
                alert("PDF file is not available yet. Please try again later.");
            }
        } catch (error) {
            console.error("Error downloading the PDF:", error);
            alert("There was an error downloading the PDF.");
        }
    };

    return (
        <>
            <Header />
            <div className="page">
                {/* <div className="container">
                    <p className="description">
                        Converting images to PDF allows you to combine visual content into a portable, easy-to-share format.
                        This feature is useful for creating document-style presentations or for printing purposes.
                    </p>
                </div> */}
                <div className="upload-section">
                    <Upload routingPlace="Pdf" />
                </div>
                <div className="image-row">
                    <img src={profileImage} alt="Uploaded Preview" className="image" />
                    <button onClick={Function} className="button">Convert to PDF</button>
                    {flag && (
                        // <img src={SAVE_PATH} alt="Converted PDF Result" className="image" />
                
                        <button onClick={downloadPDF} className="button">
                            Download Converted PDF
                        </button>
                        
                    )}
                </div>
                {/* {flag && (
                    <button onClick={downloadPDF} className="button">
                        Download Converted PDF
                    </button>
                )} */}
            </div>
        </>
    );
}

export default Pdf;

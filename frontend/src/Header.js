import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Importing the CSS file

function Header() {
    return (
        <div className="header">
            <div className="header-item">
                <Link to="/Resize" className="header-link">
                    <span className="icon">🔀</span>
                    <h3 className="icon-label">Image Resize</h3>
                </Link>
            </div>
            <div className="header-item">
                <Link to="/ImageToPDF" className="header-link">
                    <span className="icon">🔄</span>
                    <h3 className="icon-label">Image to PDF</h3>
                </Link>
            </div>
            <div className="header-item">
                <Link to="/Grayscale" className="header-link">
                    <span className="icon">📄</span>
                    <h3 className="icon-label">Image Grayscale</h3>
                </Link>
            </div>
            <div className="header-item">
                <Link to="/Sketching" className="header-link">
                    <span className="icon">📊</span>
                    <h3 className="icon-label">Image Sketching</h3>
                </Link>
            </div>
            <div className="header-item">
                <Link to="/RemoveBackground" className="header-link">
                    <span className="icon">🖼️</span>
                    <h3 className="icon-label">Remove Background</h3>
                </Link>
            </div>
            <div className="header-item">
                <Link to="/Enhance" className="header-link">
                    <span className="icon">⚡</span>
                    <h3 className="icon-label">Enhance Image</h3>
                </Link>
            </div>
            <div className="header-item">
                <Link to="/BackgroundBlur" className="header-link">
                    <span className="icon">🌫️</span>
                    <h3 className="icon-label">Background Blur</h3>
                </Link>
            </div>
        </div>
    );
}

export default Header;

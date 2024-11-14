import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="header" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <div className="header-item" style={{ textAlign: 'center' }}>
                <Link to="/image-resize" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <span className="icon" style={{ fontSize: '2rem' }}>🔀</span>
                    <h3>Image Resize</h3>
                </Link>
            </div>
            <div className="header-item" style={{ textAlign: 'center' }}>
                <Link to="/image-to-pdf" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <span className="icon" style={{ fontSize: '2rem' }}>🔄</span>
                    <h3>Image to PDF</h3>
                </Link>
            </div>
            <div className="header-item" style={{ textAlign: 'center' }}>
                <Link to="/compress-pdf" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <span className="icon" style={{ fontSize: '2rem' }}>📉</span>
                    <h3>Compress PDF</h3>
                </Link>
            </div>
            <div className="header-item" style={{ textAlign: 'center' }}>
                <Link to="/image-grayscale" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <span className="icon" style={{ fontSize: '2rem' }}>📄</span>
                    <h3>Image Grayscale</h3>
                </Link>
            </div>
            <div className="header-item" style={{ textAlign: 'center' }}>
                <Link to="/image-sketching" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <span className="icon" style={{ fontSize: '2rem' }}>📊</span>
                    <h3>Image Sketching</h3>
                </Link>
            </div>
        </div>
    );
}

export default Header;

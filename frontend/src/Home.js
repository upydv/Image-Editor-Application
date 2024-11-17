import './App.css';
import { Link } from 'react-router-dom';
import Header from './Header';

function Home() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <div className="header">
          {/* <h1>All-in-one image editing tools.</h1> */}
          <p>
            This Image Editor application provides various features to edit and transform images. With easy-to-use tools, users can resize images, convert them to PDF, apply filters, and much more.
          </p>
        </div>
        <div className="grid">
          <div>
            <Link to={'/Resize'}>
              <div className="card">
                <div className="icon">🔀</div>
                <h3>Image Resize</h3>
                <p>Resize images to specified dimensions while maintaining aspect ratio or custom dimensions.</p>
              </div>
            </Link>
          </div>
          <div>
            <Link to={'/Pdf'}>
              <div className="card">
                <div className="icon">🔄</div>
                <h3>Image to PDF</h3>
                <p>Convert single or multiple images into a PDF file.</p>
              </div>
            </Link>
          </div>

          <div>
            <Link to={'/Grayscale'}>
              <div className="card">
                <div className="icon">📄</div>
                <h3>Image Grayscale</h3>
                <p>Apply a grayscale filter to images, removing all color to create a classic black-and-white effect.</p>
              </div>
            </Link>
          </div>
          <div>
            <Link to={'/Sketching'}>
              <div className="card">
                <div className="icon">📊</div>
                <h3>Image Sketching</h3>
                <p>Transform images into pencil or pen-style sketches.</p>
              </div>
            </Link>
          </div>
          <div>
            <Link to={'/RemoveBackground'}>
              <div className="card">
                <div className="icon">🖼️</div>
                <h3>Remove Background</h3>
                <p>Remove the background of images to focus on the subject.</p>
              </div>
            </Link>
          </div>
          <div>
            <Link to={'/Enhance'}>
              <div className="card">
                <div className="icon">⚡</div>
                <h3>Sharpning & Enhance Image</h3>
                <p>Improve image quality with sharpening, noise reduction, and more.</p>
              </div>
            </Link>
          </div>
          <div>
            <Link to={'/BackgroundBlur'}>
              <div className="card">
                <div className="icon">🌫️</div>
                <h3>Background Blur</h3>
                <p>Blur the background of an image to emphasize the subject.</p>
              </div>
            </Link>
          </div>
          <div>
            <Link to={'/Mirror'}>
              <div className="card">
                <div className="icon">🌫️</div>
                <h3>Mirror Image</h3>
                <p>Blur the background of an image to emphasize the subject.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

import './App.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      <div class="container">
        <div class="header">
            <h1>Every tool you need to work with PDFs in one place</h1>
            <p>This Image Editor application provides various features to edit and transform images. With easy-to-use tools, users can resize images, convert them to PDF, apply filters, and much more.</p>
        </div>
        <div class="grid">
            <div class="card">
                <div class="icon">🔀</div>
                <h3>Image Resize< /h3>
                <p>Resize images to specified dimensions while maintaining aspect ratio or custom dimensions</p>
            </div>
            <div class="card">
                <div class="icon">🔄</div>
                <h3>Image to PDF</h3>
                <p>Convert single or multiple images into a PDF file.</p>
            </div>
            <div class="card">
                <div class="icon">📉</div>
                <h3>Compress PDF</h3>
                <p>Reduce file size while optimizing for maximal PDF quality.</p>
            </div>
            <div class="card">
                <div class="icon">📄</div>
                <h3>Image Grayscale</h3>
                <p>Apply a grayscale filter to images, removing all color to create a classic black-and-white effect.</p>
            </div>
            {/* <div class="card">
                <div class="icon">📈</div>
                <h3>PDF to Excel</h3>
                <p>Pull data straight from PDFs into Excel spreadsheets in a few short seconds.</p>
            </div>
            <div class="card">
                <div class="icon">📝</div>
                <h3>Word to PDF</h3>
                <p>Make DOC and DOCX files easy to read by converting them to PDF.</p>
            </div>
            <div class="card">
                <div class="icon">📊</div>
                <h3>PowerPoint to PDF</h3>
                <p>Make PPT and PPTX slideshows easy to view by converting them to PDF.</p>
            </div> */}
        </div>
        <Link to={'/Sketching'}>
            <div class="card">
                <div class="icon">📊</div>
                <h3>Image Sketching</h3>
                <p>Transform images into pencil or pen-style sketches.</p>
            </div>
        </Link>
        {/* <Link className='btn' to={`/update/${employee.employeeId}`}>Update</Link> */}
    </div>
    </div>
  );
}

export default Home;

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Sketching from './Sketching';
import Resize from './Resize';
import PDF from './PDF';
import Grayscale from './Grayscale';
import Enhance from './Enhance';
import RemoveBackground from './RemoveBackground';
import BackgroundBlur from './BackgroundBlur';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

  
          <Route path='/' element={<Home/>}/>

           {/* Path for Resize tool */}
          <Route path='/Resize' element={<Resize />} />
          <Route path='/Resize/uploads/:filename' element={<Resize />} />

          {/* Path for Image to PDF tool */}
          <Route path='/ImageToPDF' element={<PDF />} />
          <Route path='/ImageToPDF/uploads/:filename' element={<PDF />} />

          {/* Path for Image Grayscale tool */}
          <Route path='/Grayscale' element={<Grayscale />} />
          <Route path='/Grayscale/uploads/:filename' element={<Grayscale />} />

          {/* Path for Sketching tool */}
          <Route path='/Sketching' element={<Sketching />} />
          <Route path='/Sketching/uploads/:filename' element={<Sketching />} />

          {/* Path for Remove Background tool */}
          <Route path='/RemoveBackground' element={<RemoveBackground />} />
          <Route path='/RemoveBackground/uploads/:filename' element={<RemoveBackground />} />

          {/* Path for Background Blur tool */}
          <Route path='/BackgroundBlur' element={<BackgroundBlur />} />
          <Route path='/BackgroundBlur/uploads/:filename' element={<BackgroundBlur/>} />

           {/* Path for Enhance tool */}
           <Route path='/Enhance' element={<Enhance />} />
          <Route path='/Enhance/uploads/:filename' element={<Enhance />} />
          

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

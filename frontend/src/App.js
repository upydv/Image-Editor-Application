import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Sketching from './Sketching';
import Resize from './Resize';
import Pdf from './Pdf';
import Grayscale from './Grayscale';
import Enhance from './Enhance';
import RemoveBackground from './RemoveBackground';
import BackgroundBlur from './BackgroundBlur';
import Blackandwhite from './Blackandwhite';


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
          <Route path='/Pdf' element={<Pdf />} />
          <Route path='/Pdf/uploads/:filename' element={<Pdf/>} />

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

          {/* Path for Enhance tool */}
          <Route path='/Blackandwhite' element={<Blackandwhite />} />
          <Route path='/Blackandwhite/uploads/:filename' element={<Blackandwhite/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

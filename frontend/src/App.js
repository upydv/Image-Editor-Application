import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Sketching from './Sketching';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/sketching' element={<Sketching/>}/>
          <Route path='/sketching/uploads/:filename' element={<Sketching/>}/>

      
          {/* <Route path='/create' element={<AddEmployee/>}/>
          
          <Route path='/update' element={<Update/>}/>
          <Route path="/update/:id" element={<Update/>} />

          <Route path='/viewdetail' element={<ViewDetails/>}/>
          <Route path="/viewdetail/:id" element={<ViewDetails/>} /> */}
          
          {/* <Route path="/delete/:id" element={<ViewDetails/>} /> */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

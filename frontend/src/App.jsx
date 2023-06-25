
import './App.css'
import { Routes,Route } from 'react-router-dom';
import Home from './page/Home/Home';
import Login from './page/Login/Login';
import Booking from './page/Booking/Booking';
import Detailroom from './page/Booking/Detailroom';
function App() {
  return (
    <div className="container">
        
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Booking" element={<Booking/>}/>
          <Route path="/Booking/Detailroom" element={<Detailroom/>}/>
        </Routes>
    </div>
  )
}

export default App

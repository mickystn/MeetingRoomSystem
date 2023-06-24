
import './App.css'
import Navbar from './component/Navbar/Navbar.jsx';
import { Routes,Route } from 'react-router-dom';
import Home from './page/Home/Home';
import Login from './page/Login/Login';
import Navbaruser from './component/Navbar/Navbaruser.jsx';
import Dashboard from './page/Dashboard/Dashboarduser.jsx'; 
import { useEffect, useState } from 'react';
import {auth} from './service/api'

function App() {
  const [val,setVal]=useState();
  function selectNav(){
    if(localStorage.getItem("User")==null){
      return <Navbar/>
    }else{
      auth().then((res)=>{
        if(res=="err"){
          return <Navbar/>
        }
      })
      return <Navbaruser/>
    }
  }
  
  return (
    <div className="container">
        {selectNav()}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
        </Routes>
    </div>
  )
}

export default App

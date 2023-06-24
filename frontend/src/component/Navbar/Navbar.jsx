import '../../style/Navbar.css'
import { useNavigate } from "react-router-dom";

import { ReactLocation, Router } from 'react-location'
const reactLocation = new ReactLocation()

function Navbar(){
    const navigate = useNavigate();
    return (
        <div className="navbar">
            <div></div>
            <ul className="menu">
                <li><a href="/">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
                <button className="button" onClick={()=>{window.location = '/Login'}}>Login</button>
            </ul>
        </div>
    )
}
export default Navbar;
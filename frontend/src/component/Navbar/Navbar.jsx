import '../../style/Navbar.css'
import { useNavigate } from "react-router-dom";
function Navbar(){
    const navigate = useNavigate();
    return (
        <div className="navbar">
            <div></div>
            <ul className="menu">
                <li><a href="/">Home</a></li>
                <li><a href="https://mickie-portfolio.vercel.app/">Contact</a></li>
                <button className="button" onClick={()=>{navigate('/Login')}}>Login</button>
            </ul>
            <div className='hamburger'>
                <input id="menu__toggle" type="checkbox" />
                <label className="menu__btn">
                
                <span></span>
                </label>
                <ul className="menu__box">
                    <li><a className="menu__item" href="/">Home</a></li>
                    <li><a className="menu__item" href="https://mickie-portfolio.vercel.app/">Contact</a></li>
                    <li><a className="menu__item" onClick={()=>{
                        navigate("/Login")
                    }}>Login</a></li>
                </ul>
            </div>
        </div>
    )
}
export default Navbar;
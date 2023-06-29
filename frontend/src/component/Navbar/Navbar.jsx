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
                <label class="menu__btn" for="menu__toggle">
                
                <span></span>
                </label>
                <ul class="menu__box">
                    <li><a class="menu__item" href="/">Home</a></li>
                    <li><a class="menu__item" href="https://mickie-portfolio.vercel.app/">Contact</a></li>
                    <li><a class="menu__item" onClick={()=>{
                        localStorage.clear("User")
                        navigate("/")
                    }}>Logout</a></li>
                </ul>
            </div>
        </div>
    )
}
export default Navbar;
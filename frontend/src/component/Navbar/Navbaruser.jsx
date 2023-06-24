import '../../style/Navbar.css'
import { useNavigate } from "react-router-dom";
function Navbaruser(){
    const navigate = useNavigate();
    return (
        <div className="navbar">
            <div></div>
            <ul className="menu">
                <li><a href="/">Home</a></li>
                <button className="button" onClick={()=>{
                    localStorage.clear("User")
                    navigate('/')
                }}>Logout</button>
            </ul>
        </div>
    )
}
export default Navbaruser;
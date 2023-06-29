import '../../style/Navbar.css'
import { useNavigate } from "react-router-dom";
import {auth,getUser} from '../../service/api'
import { useEffect ,useState} from 'react';

function Navbaruser(){
    const [user,setUser]=useState({});
    const navigate = useNavigate();
    useEffect(()=>{
        auth().then((res)=>{
            if(res=='err'){
                navigate('/Login')
            }
            getUser(res.email).then((res)=>{       
                if(res=="error") return
                setUser(res);
            })
        })
    },[])
    return (
        <div className="navbar">
            <div></div>
            <ul className="menu">
                <li><a>{user[0]?.name}</a></li>
                <li><a onClick={()=>{navigate("/Booking")}}>Booking</a></li>
                <li><a onClick={()=>{navigate("/Booking/History")}}>History</a></li>
                <button className="button" onClick={()=>{
                    localStorage.clear("User")
                    navigate("/")
                }}>Logout</button>
            </ul>
            <div className='hamburger'>
                <input id="menu__toggle" type="checkbox" />
                <label class="menu__btn" for="menu__toggle">
                
                <span></span>
                </label>
                <ul class="menu__box">
                    <li><a class="menu__item" onClick={()=>{navigate("/Booking")}}>Booking</a></li>
                    <li><a class="menu__item" onClick={()=>{navigate("/Booking/History")}}>History</a></li>
                    <li><a class="menu__item" onClick={()=>{
                        localStorage.clear("User")
                        navigate("/")
                    }}>Logout</a></li>
                </ul>
            </div>
        </div>
    )
}
export default Navbaruser;
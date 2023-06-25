import '../../style/Navbar.css'
import { useNavigate } from "react-router-dom";
import {auth,getUser} from '../../service/api'
import { useEffect ,useState} from 'react';
function Navbaruser(){
    const [user,setUser]=useState({});
    const navigate = useNavigate();
    useEffect(()=>{
        auth().then((res)=>{
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
                <li><a href="/Booking">Booking</a></li>
                <li><a>History</a></li>
                <button className="button" onClick={()=>{
                    localStorage.clear("User")
                    navigate("/")
                }}>Logout</button>
            </ul>
        </div>
    )
}
export default Navbaruser;
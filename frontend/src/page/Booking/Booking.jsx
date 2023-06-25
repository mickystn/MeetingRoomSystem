
import { useNavigate,Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import {auth,getRoom} from '../../service/api'
import Navbaruser from '../../component/Navbar/Navbaruser';
import '../../style/Booking.css'

export default function Booking(){
    const [room,setRoom]=useState();
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('User')==null) {
            navigate('/Login')
            return
        }
        auth().then((res)=>{ //Check token
            if(res=="err"){
                navigate('/Login')
                return
            }
        })
        getRoom().then((res)=>{
            if(res=="err") return
            setRoom(res)
        })
        
    },[])

    return (
        <div className='Booking'>
            <Navbaruser/>
            <div className='Booking-container'>
                <div className='Booking-content'>
                    <h1>Booking</h1>
                    <div className="grid">
                        {room?.map((val,index)=>{
                            return (
                                <div className="card" key={index}>
                                    <img src={val.img} className=" card-img"></img>
                                    <div className="grp">
                                        <h1  className="card-txt">{val.room_name}</h1>
                                        <Link className="card-btn" to="/Booking/Detailroom" state={{id:val.id}}>Book</Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}


import { useNavigate,Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import {auth,getRoom} from '../../service/api'
import Navbaruser from '../../component/Navbar/Navbaruser';
import ReactLoading from 'react-loading';
import '../../style/Booking.css'

export default function Booking(){
    const [room,setRoom]=useState();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        if(localStorage.getItem('User')==null) {
            navigate('/Login')
            return
        }
        setLoading(true)
        auth().then((res)=>{ //Check token
            if(res=="err"){
                navigate('/Login')
                return
            }
        }).finally(()=>{
            setLoading(false)
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
                { loading? 
                    <div className="center">
                        <ReactLoading type="spin" color="black" height={150} width={150}  />
                    </div>
                :
                    <div>
                        
                        <h1>Booking</h1>
                        <div className="grid">
                            {room?.map((val,index)=>{
                                return (
                                    <div className="card" key={index}>
                                        <div className="grp">
                                            <h1  className="card-txt">{val.room_name}</h1>
                                            <Link className="card-btn" to="/Booking/Detailroom" state={{id:val.id}}>Book</Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
                </div>
            </div>
        </div>
    )
}

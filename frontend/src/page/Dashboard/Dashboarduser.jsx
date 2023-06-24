
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import {auth} from '../../service/api'

export default function Dashboarduser(){
    const [user,setUser]=useState();
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('User')==null) {
            navigate('/Login')
            return
        }
        auth().then((res)=>{
            if(res=="err"){
                navigate('/Login')
                return
            }
            
        })
        
    })
    return (
        <div className='Dashboard'>
            <h>test</h>
        </div>
    )
}
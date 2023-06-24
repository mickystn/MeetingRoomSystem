

import { useEffect, useState } from 'react'
import {auth} from '../../service/api'

export default function Dashboarduser(){
    const [user,setUser]=useState();

    useEffect(()=>{
        if(localStorage.getItem('User')==null) {
            window.location='/Login'
            return
        }
        auth().then((res)=>{
            if(res=="err"){
                window.location = '/Login'
                alert("test");
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
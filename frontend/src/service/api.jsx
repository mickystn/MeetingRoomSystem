import Axios from 'axios';
const api = "https://backend-meetingroom.vercel.app"

export const Logins = async(data)=>{
    const res = await Axios.post(api+"/User/login",data);

    if(res.data.token){
        localStorage.setItem("User", res.data.token);
        
        return res.data.message;
    }
    else{
        localStorage.clear()
        
        return res.data.message;
    }
}
export const auth = async()=>{
    const headers = { 'Authorization': 'Bearer '+ localStorage.getItem("User")}; // 
    const res = await Axios.post(api+"/User/auth",{},{headers});
    if(res.data.status=="ok"){
        
        return res.data.decoded.email;
    }else{
        localStorage.clear()
        return res.data.status;
    }
}
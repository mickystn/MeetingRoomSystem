import Axios from 'axios';
const api = "https://backend-meetingroom.vercel.app/"

export const Logins = async(data)=>{
    try{
        const res = await Axios.post(api+"/User/login",data);
        if(res.data.token){
            localStorage.setItem("User", res.data.token);
            return res.data.message;
        }
        else{
            localStorage.clear()
            return res.data.message;
        }
    }catch(err){
        return "something wrong!"
    }
    
}
export const auth = async()=>{
    const headers = { 'Authorization': 'Bearer '+ localStorage.getItem("User")}; // 
    const res = await Axios.post(api+"/User/auth",{},{headers});
    if(res.data.status=="ok"){
        return res.data.decoded;
    }
    localStorage.clear()
    return res.data.status;
}
export const getUser = async(email)=>{
    
    const res = await Axios.get(api+`/User/getUser/${email}`)   
    if(res.data.status=="ok"){
        return res.data.message;
    }
    return res.data.status;
}
export const getRoom = async()=>{
    const res = await Axios.get(api+"/Room/getRoom")
    if(res.data.status=="ok"){
        return res.data.message
    }
    return res.data.status
}
export const getBooking = async(id)=>{
    const res = await Axios.get(api+`/Booking/getBooking/${id}`)
    if(res.data.status=="ok"){
        return res.data.message;
    }
    return res.data.status;
}
export const Booking = async(data)=>{
    const res = await Axios.post(api+"/Booking/booking",data)
    if(res.data.status=="ok"){
        return res.data.message;
    }
    return res.data.status
}
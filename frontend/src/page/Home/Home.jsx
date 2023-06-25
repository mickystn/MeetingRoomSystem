
import '../../style/Home.css'
import img from "../../assets/img.png"
import img2 from "../../assets/dy.svg"
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { UserOutlined ,MailOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {auth} from '../../service/api'

import Navbar from '../../component/Navbar/Navbar'
import { useEffect } from 'react';

const { TextArea } = Input;
const onChange = (e) => {
    console.log('Change:', e.target.value);
  };

const theme = createTheme({
    breakpoints: {
        values: {
        mobile: 0,
        tablet: 500,
        laptop: 1024,
        desktop: 1280,
        },
    },
});

function Home(){
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("User")==null) return
        auth().then((res)=>{ //Check token
            if(res=="err") return navigate('/Login')
            navigate('/Booking')
        })
    })
    return (
        <div>
            <Navbar/>
            <div className="Home">
                <div className="Home-container">
                    <div className="Home-content">
                        <div className="Home-text">
                            <h1 className="txt-1">Booking System</h1>
                            <h1 className="txt-2">with just a few clicks</h1>
                            <h1 className="des">Our room booking system is available 24/7 and offers
                                a user-friendly platform for clients to easily reserve rooms.</h1>
                            <div className="let-book">
                                <button className="btn-book" onClick={()=>{navigate('/Login')}}>Let's book</button>
                            </div>
                        </div>
                        <div className="Home-img">
                            <img className="test" src={img}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Homedetail">
                <div className="Homedt-container">
                    <h1 className="txt-2 lft">Select Time</h1>
                    <div className="Homedt-content">
                        <div className="bg-calen">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <ThemeProvider theme={theme}>
                                    <DateCalendar disablePast readOnly sx={{ width: {mobile: 250,tablet:350}}}/>
                                </ThemeProvider>
                            </LocalizationProvider>
                        </div>
                        <div>
                            <div className="grid">
                                <button className="btn-time" disabled>09:00</button>
                                <button className="btn-time">10:00</button>
                                <button className="btn-time">11:00</button>
                                <button className="btn-time">12:00</button>
                                <button className="btn-time">13:00</button>
                                <button className="btn-time">14:00</button>
                                <button className="btn-time">15:00</button>
                                <button className="btn-time">16:00</button>
                                <button className="btn-time">17:00</button>
                            </div>
                            <button className="btn-time-txt">All times are in Thailand</button>
                        </div>
                        
                    </div>
                </div>
                <div className="Homedt-bot">
                    <button className="btn" onClick={()=>{navigate('/Login')}}>Book Now</button>
                </div>
            </div>
        </div>
    )
}
export default Home;
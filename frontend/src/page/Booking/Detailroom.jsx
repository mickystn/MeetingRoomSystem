import { useEffect ,useState,forwardRef} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import {auth,getBooking,getUser,Booking} from '../../service/api'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbaruser from '../../component/Navbar/Navbaruser';
import { Empty } from 'antd';
import '../../style/Detailroom.css'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ReactLoading from 'react-loading';

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

const time = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00",]
const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} {...props} />;
});
export default function Detailroom(props){
    const location = useLocation();
    const [booking,setBooking]=useState();
    const [dates,setDates] = useState();
    const [times,setTimes]=useState();
    const [timeselect,setTimeselect]=useState();
    const [open, setOpen] = useState(false);
    const [opend, setOpend] = useState(false);
    const [user,setUser] = useState();

    const [loading,setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('User')==null) return navigate('/Login')
        setLoading(true)
        auth().then((res)=>{
            if(res=='err') return navigate('/Login')
            getUser(res.email).then((res)=>{
                if(res=="error") return
                setUser(res);
            })
        }).finally(()=>{
            setLoading(false)
        })
        if(location.state==undefined) return navigate("/Booking")
        getBooking(location.state.id).then((res)=>{
            const today = new Date();   
            var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
            const result = res.filter((val)=>{return val.booking_date==date})
            const temp_time = result.map((val)=>{return val.start_time.slice(0,5)})
            const mergedArray = [...time, ...temp_time].sort();
            const uniqueArray = [];
            
            for (let i = 0; i < mergedArray.length; i++) {
                if (mergedArray.indexOf(mergedArray[i]) === i && mergedArray.lastIndexOf(mergedArray[i]) === i) {
                    uniqueArray.push(mergedArray[i]);
                }
            }
            setDates(date);
            setTimes(uniqueArray)
            setBooking(result)
        })
    },[])

    function getBookingtime(date){
        getBooking(location.state.id).then((res)=>{
            const result = res.filter((val)=>{return val.booking_date==date})
            const temp_time = result.map((val)=>{return val.start_time.slice(0,5)})
            const mergedArray = [...time, ...temp_time].sort();
            const uniqueArray = [];
            
            for (let i = 0; i < mergedArray.length; i++) {
                if (mergedArray.indexOf(mergedArray[i]) === i && mergedArray.lastIndexOf(mergedArray[i]) === i) {
                    uniqueArray.push(mergedArray[i]);
                }
            }
            setDates(date);
            setTimes(uniqueArray)
            setBooking(result)
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        } 
        setOpen(false);
        setOpend(false);
    };
    function bookSubmit(){
        if(timeselect==undefined) return setOpen(true)
        const data={
            room_id:location.state.id,
            booking_date:dates,
            start_time:timeselect,
            end_time:(parseInt(timeselect.split(":")[0])+1).toString()+":00",
            user_id:user[0].id,
        }
        Booking(data).then((res)=>{
            if(res=="error") return
            setOpend(true)
            setTimeout(()=>{
                navigate("/History")
            },2000)
        })
    }

    function showTime(){
        if(times?.length!=0){
            return (
                <div>
                    <div className="date">
                        <h1 className="date-title">Date : {dates}</h1>
                        <h1 className="date-title">Time available</h1>
                    </div>
                    <div className="grid">
                        {times?.map((val,index)=>{
                            return <button className="btn-time" key={index} onClick={()=>{setTimeselect(val)}}>{val}</button>
                        })}
                    </div>
                    <button className="btn-detail-txt" onClick={bookSubmit}>Book now</button>
                </div>
            )
        }else{
            return <Empty description={
                <span>
                    No time available
                </span>
            }/>
        }
    }

    return (
        <div className="Det">
            <Navbaruser/>
            <div className="Detailroom">
                <div className="center">
                {loading?
                    <ReactLoading type="spin" color="black" height={150} width={150}  /> 
                :
                    <div className="Detailroom-container">
                        <div>
                            <h1 className="txt-2 lft">Select Time</h1>
                            <div className="Detailroom-content">
                                <div className="item-detail">
                                    <div className="bg-calen">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <ThemeProvider theme={theme}>
                                                <DateCalendar disablePast  onChange={(val) =>{
                                                    getBookingtime(""+val.$D+"/"+(val.$M+1)+"/"+val.$y)
                                                }} sx={{ width: {mobile: 250,tablet:350}}}/>
                                            </ThemeProvider>
                                        </LocalizationProvider>
                                    </div>
                                </div>
                                <div className="item-detail">
                                    {showTime()}
                                </div>
                                <Snackbar open={open} anchorOrigin={{horizontal: 'center',vertical: 'top'}} autoHideDuration={3000} onClose={handleClose}>
                                    <Alert onClose={handleClose}  severity="error" sx={{ width: '100%' ,color:'#FFF' }}>
                                        Please Select Time!
                                    </Alert>
                                </Snackbar>
                                <Snackbar open={opend} anchorOrigin={{horizontal: 'center',vertical: 'top'}} autoHideDuration={3000} onClose={handleClose}>
                                    <Alert onClose={handleClose}  sx={{ width: '100%' ,color:'#FFF' }}>
                                        Booking complete
                                    </Alert>
                                </Snackbar>
                            </div>
                        </div>
                    </div>
                }
                </div>
            </div>
        </div>
    )

}
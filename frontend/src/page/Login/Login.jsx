
import '../../style/Login.css'
import img from '../../assets/img2.png';
import { MailOutlined ,LockOutlined} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useState,Fragment ,forwardRef, useEffect} from 'react';
import { Form, Input } from 'antd';
import {Logins,auth} from '../../service/api'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Navbar from '../../component/Navbar/Navbar'
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});
const rulePassword= [
    {
        required: true,
        message: 'Please input your password!',
    },
]
const ruleEmail = [
    {
        required: true,
        message: 'Please input your email!',
    },
    {
        type: 'email',
        message: 'Please check your email'
    }
]
export default function Login(){
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        auth().then((res)=>{
            if(res!='err'){
                navigate('/Booking')
            }
        })
    })

    function onFinish(values){
        const data = {email: values.Email, password: values.Password}
        Logins(data).then((res)=>{
            if(res=="login success"){
                navigate('/Booking')
            }else{
                setOpen(true);
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        setOpen(true)
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        } 
        setOpen(false);
    };
    return (
        <div className="Login">
            <Navbar/>
            <div className="Login-container">
                <div className="Login-content">
                    <div className="Login-img">
                        <img className="logo"src={img}/>
                    </div>
                    <div className="Login-txt">
                        <h1 className="txt-2">Sign up</h1>
                            <Form onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" >
                            <div className="input-group">
                                <Form.Item name="Email" rules={ruleEmail}>
                                    <Input size="default " placeholder="Email"  bordered={false} prefix={<MailOutlined />} className='inp'/>
                                </Form.Item>
                                <Form.Item name="Password" rules={rulePassword}>
                                    <Input.Password size="default " placeholder="Password" bordered={false} prefix={<LockOutlined />} className='inp'/>
                                </Form.Item>
                                <a className="des">Create an account</a>
                            </div>
                            <div className='input-btn'>
                                <Snackbar open={open} anchorOrigin={{horizontal: 'center',vertical: 'top'}} autoHideDuration={3000} onClose={handleClose}>
                                    <Alert onClose={handleClose}  severity="error" sx={{ width: '100%' ,color:'#FFF' }}>
                                        Check your email and password
                                    </Alert>
                                </Snackbar>
                                <button className="btn-login" >Login in</button>
                            </div>
                            </Form>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )
}
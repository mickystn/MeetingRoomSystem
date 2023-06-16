import Axios from "axios";
import { useEffect, useState } from "react";
import './Home.css'

import { DatePicker, TimePicker ,Form, Table ,Button, Input , Empty, Modal,message  } from 'antd';

const ruleName=[{required: true, message: 'Please input your username!',},];
const ruleEmail=[{required: true, message: 'Please input your email!',},];
const ruleDate=[{required: true, message: 'Please select date!',},];
const ruleTime=[{required: true, message: 'Please select time!',},];


function Home(){
    const [booking,setBooking]=useState("");
    const [isModalBookingOpen, setIsModalBookingOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [deleteq,setDelete]=useState();

    useEffect(()=>{
        Axios.get("https://meeting-room-system.vercel.app/").then((res)=>{
            const arr=res.data;
            arr.forEach((obj,index)=>{
                obj.key=index
            })
            setBooking(arr);
        })
    },[])

    const columns = [
        {
          title: 'Name',
          dataIndex: 'user_name',
          key: 'user_name',
        },
        {
          title: 'Email',
          dataIndex: 'user_email',
          key: 'user_email',
        } ,
        {
          title: 'Date',
          dataIndex: 'booking_date',
          key: 'booking_date',
        },
        {
          title: 'Start Time',
          dataIndex: 'start_time',
          key: 'start_time',
        },
        {
          title: 'End Time',
          dataIndex: 'end_time',
          key: 'end_time',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (key) => <a onClick={()=>{showDeleteModal(key.user_email)}}>Delete</a>,
        },
    ];


    const onFinish = (values) => {
        console.log('Success:', values);
        
        var hour = values.time.$d.toString().split(" ")[4].split(":")[0];
        var minute = values.time.$d.toString().split(" ")[4].split(":")[1];
        
        if(parseInt(hour)<9){
            messageApi.open({
                type: 'error',
                content: 'โปรดเลือกเวลาในช่วง 09:00น.-18:00น.',
            });
            return;
        }
        if(parseInt(hour)>18){
            messageApi.open({
                type: 'error',
                content: 'โปรดเลือกเวลาในช่วง 09:00น.-18:00น.',
            });
            return;
        }
        if(parseInt(hour)==17 && parseInt(minute)!=0){
            messageApi.open({
                type: 'error',
                content: 'ไม่สามารถจองเวลาได้เนืองจากเกิน 18:00น.',
            });
            return;
        }
        if(parseInt(hour)+1>18){
            messageApi.open({
                type: 'error',
                content: 'ไม่สามารถจองเวลาได้เนืองจากเกิน 18:00น.',
            });
            return;
        }
        var dateString = values.date.$D.toString()+"/"+(values.date.$M+1).toString()+"/"+values.date.$y.toString();
        var s_timeString = hour+":"+minute;
        var e_timeString = parseInt(hour)+1+":"+minute;
        var name = values.name;
        var email = values.email;
        const data  = {room_id:1,date:dateString,s_time:s_timeString,e_time:e_timeString,name:name,email:email}
        Axios.post("https://meeting-room-system.vercel.app/booking",data).then((res)=>{
            if(res.data=="จองเวลาเสร็จสิ้น"){
                setIsModalBookingOpen(false);
                window.location.reload();
            }
            if(res.data=="ไม่สามารถจองช่วงเวลาที่เลือกได้ โปรดเลือกช่วงเวลาอื่น"){
                messageApi.open({
                    type: 'error',
                    content: 'ไม่สามารถจองช่วงเวลาที่เลือกได้ โปรดเลือกช่วงเวลาอื่น',
                });
                return;
            }
        })
    };
    const onFinishFailed = (errorInfo) => {
        messageApi.open({
            type: 'error',
            content: 'โปรดใส่ข้อมูลให้ครบ',
        });
    };
    const showModal = () => {
        setIsModalBookingOpen(true);
    };
    const showDeleteModal = (val) => {
        setDelete(val);
        setIsModalDeleteOpen(true);
    };
    function isEmpty(){
        if(booking.length==0){
            return <Empty/>
        }
        return <Table columns={columns} dataSource={booking} />
    }
    const handleOk = () => {
        Axios.delete(`https://meeting-room-system.vercel.app/deleteBooking/${deleteq}`).then((res)=>{
            console.log(res);
            messageApi.open({
                type: 'error',
                content: 'ลบเสร็จสิ้น',
            });
            window.location.reload();
            
        })
        setIsModalDeleteOpen(false);
    };
    const handleCancel = () => {
        setIsModalDeleteOpen(false);
    };
    return (
        <div className="home-content">
            {contextHolder}
            <h1 className="title">Meeting Room Booking</h1>
            <div className="content">
                <Button type="primary" onClick={showModal} >
                    <p className="txt-modal">Booking</p>
                </Button>
                <Modal title="Booking" open={isModalBookingOpen} footer={[]}>
                    
                    <Form onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" style={{maxWidth: 450}}>
                        <Form.Item label="Name" name="name" rules={ruleName}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Email" name="email" rules={ruleEmail}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Date" name="date" rules={ruleDate}>
                            <DatePicker style={{width:'300px'}}/>
                        </Form.Item>
                        <Form.Item label="Time" name="time" rules={ruleTime}>
                            <TimePicker style={{width:'300px'}} format='HH:mm'/>
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" style={{marginTop:'1.5rem'}}>
                                Submit
                            </Button>
                            <Button onClick={()=>{setIsModalBookingOpen(false)}}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal title="Delete" open={isModalDeleteOpen}  onOk={handleOk} onCancel={handleCancel} okType="default"> 
                    <p>ต้องการจะลบเวลานี้ใช่หรือไม่</p>
                </Modal>
                <div className="schedule">{isEmpty()}</div>
            </div>
            
            
        </div>
    )
}

export default Home;
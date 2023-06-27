import { useEffect ,useState} from 'react'
import {auth,getHistory} from '../../service/api'
import Navbaruser from '../../component/Navbar/Navbaruser';
import { useNavigate } from "react-router-dom";
import '../../style/History.css'
import { Table } from 'antd';
import ReactLoading from 'react-loading';



const columns = [
    {
      title: 'Room',
      dataIndex: 'room_id',
      key: 'room_id',
    },
    {
      title: 'Date',
      dataIndex: 'booking_date',
      key: 'booking_date',
    },
    {
      title: 'Time',
      dataIndex: 'start_time',
      key: 'start_time',
      
    },
];


export default function History(){
    const [loading,setLoading] = useState(false);

    const [history,setHistory] = useState()

    const navigate = useNavigate();
    useEffect(()=>{
        setLoading(true)
        auth().then((res)=>{
            if(res=='err') return navigate('/Login')
            console.log(res.id);
            getHistory(res.id).then((res)=>{
                setHistory(res)
                console.log(res);
            })
        }).finally(()=>{
            setLoading(false)
        })
    },[])
    return (
        <div>
            <Navbaruser/>
            <div className="History">
                <div className="center">
                {loading?
                    <ReactLoading type="spin" color="black" height={150} width={150}  /> 
                :
                    <div className="History-container">
                        <div className="History-content">
                            <Table columns={columns} dataSource={history}/>
                        </div>
                    </div>
                }
                </div>
            </div>
        </div>
    )
}
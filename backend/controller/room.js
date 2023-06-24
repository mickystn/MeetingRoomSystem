
const db = require('../config/db')

exports.getBooking = (req,res)=>{
    let sql = "SELECT * FROM `bookings` ORDER BY booking_date ;";
    db.query(sql,(err,result)=>{
        res.json(result);
    })
}


exports.booking=(req,res)=>{
    const roomid = 1;
    const date = req.body.date;
    const s_time = req.body.s_time;
    const e_time = req.body.e_time;
    const name = req.body.name;
    const email = req.body.email;
    

    let sql=`SELECT * FROM bookings WHERE booking_date = ? AND 
            (((end_time BETWEEN ? AND ?) AND end_time!=?) OR ((start_time BETWEEN ? AND ?) AND start_time!=?))`
            
    let sqlInsert = `INSERT INTO bookings(room_id,booking_date,start_time,end_time,user_name,user_email) VALUES (?,?,?,?,?,?)`
    console.log(date ," ",s_time ," ",e_time);
    db.query(sql,[date,s_time,e_time,s_time,s_time,e_time,e_time],(err,result)=>{
        console.log(result.length);
        if(result.length!=0){
            res.send("ไม่สามารถจองช่วงเวลาที่เลือกได้ โปรดเลือกช่วงเวลาอื่น")
        }
        else{
            db.query(sqlInsert,[roomid,date,s_time,e_time,name,email],(err,result)=>{
                if(err){
                    res.send("มีบางอย่างทำงานผิด (sql)")
                }
                res.send("จองเวลาเสร็จสิ้น")
            })
        }
    })
}

exports.deleteBooking =(req,res)=>{
    const user_email = req.params.user_email;
    let sqlDelete = `DELETE FROM bookings WHERE user_email = ?`
    db.query(sqlDelete,[user_email],(err,result)=>{
        if(err){
            res.send("มีบางอย่างผิดพลาด (sql delete)")
        }
        res.send("ลบเสร็จสิ้น")
    })
}
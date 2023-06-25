
const db = require('../config/db')



exports.getBooking = (req,res)=>{
    const id = req.params.id;
    let sql = "SELECT * FROM `bookings` WHERE room_id = ?;";
    db.query(sql,id,(err,result)=>{
        res.json({status:'ok',message:result});
    })
}

exports.booking=(req,res)=>{
    const room_id = req.body.room_id;
    const date = req.body.booking_date;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    const user_id = req.body.user_id;
    
            
    let sql = `INSERT INTO bookings(room_id,booking_date,start_time,end_time,user_id) VALUES (?,?,?,?,?)`
    db.query(sql,[room_id,date,start_time,end_time,user_id],(err,result)=>{
        if(err){
            return res.json({status: 'error', message: err})
        }
        res.json({status: 'ok', message: 'book complete'})
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
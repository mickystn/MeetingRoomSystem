const db = require('../config/db')

exports.getRoom =(req,res)=>{
    let sql='SELECT * FROM rooms'
    db.query(sql,(err,result)=>{
        if(err){
            res.json({status:'error',message:err})
            return
        }
        res.json({status:'ok',message:result})
    })
}

const db = require('../config/db')
const secret_token = require('../config/token')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

exports.getUser =(req,res)=>{
    let sql = "SELECT * FROM `users`";
    db.query(sql,(err,result)=>{
        res.json(result);
    })
}
exports.register =(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;

    let sql = "INSERT INTO `users`( `email`, `password`, `name`) VALUES (?,?,?)";
    bcrypt.hash(password, saltRounds, function(err, hash) {
        db.query(sql,[email,hash,name],(err,result)=>{
            res.json(result);
        })
    });
}

exports.auth=(req,res)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        var decoded = jwt.verify(token,secret_token)
        res.json({status:'ok',decoded})
    }catch(err){
        res.json({status:'err',msg:err.message})
    }
}

exports.login=(req,res)=>{
    var email = req.body.email;
    var password = req.body.password;

    let sql = "SELECT * FROM `users` WHERE `email`=?"
    
    db.query(sql,[email],(err,result)=>{
        if(err){
            res.json({status: 'error', message: err})
            return;
        }
        if(result.length==0) {
            res.json({status:'error',message:'no user found'})
            return
        }
        
        bcrypt.compare(password, result[0].password).then(function(isLogin) {
            if(isLogin){
                var token = jwt.sign({email:result[0].email},secret_token,{expiresIn:'1h'})
                res.json({status:'ok',message:'login success',token})
            }else{
                res.json({status:'err',message:'login failed'})
            }
        });
    })

}
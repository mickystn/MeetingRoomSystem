
const express = require('express');
const router = express.Router();

const {getUser,register,login,auth} = require('../controller/user');

router.get("/getUser",getUser)
router.post("/register",register)
router.post("/auth",auth)
router.post("/login",login)


module.exports = router;

const express = require('express');
const router = express.Router();

const {getAllUser,getUser,register,login,auth} = require('../controller/user');

router.get("/getAllUser",getAllUser)
router.get("/getUser/:email",getUser)
router.post("/register",register)
router.post("/auth",auth)
router.post("/login",login)

module.exports = router;
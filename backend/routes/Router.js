
const express = require('express');
const router = express.Router();

const {getBooking,booking,deleteBooking} = require('../controller/room');



router.get("/",getBooking)
router.post("/booking",booking)
router.delete("/deleteBooking/:user_email",deleteBooking)

module.exports = router;
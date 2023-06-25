
const express = require('express');
const router = express.Router();

const {getBooking,booking,deleteBooking} = require('../controller/booking');

router.get("/getBooking/:id",getBooking)
router.post("/booking",booking)
router.delete("/deleteBooking/:user_email",deleteBooking)

module.exports = router;
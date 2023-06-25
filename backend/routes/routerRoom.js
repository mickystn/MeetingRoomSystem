
const express = require('express');
const router = express.Router();

const {getRoom} = require('../controller/room');

router.get("/getRoom",getRoom)

module.exports = router;
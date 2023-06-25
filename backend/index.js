
const express = require("express");
const app = express();
const cors = require("cors");
const routerBooking = require("./routes/routerBooking");
const routerUser = require("./routes/routerUser");
const routerRoom = require("./routes/routerRoom");
app.use('/photos',express.static('photos'));

app.use(express.json());
app.use(cors());
app.use('/Booking',routerBooking);
app.use('/User',routerUser);
app.use('/Room',routerRoom);
app.listen(3001,()=>{
    console.log("Server running on port 3001");
})

const express = require("express");
const app = express();
const cors = require("cors");
const routerRoom = require("./routes/routerRoom");
const routerUser = require("./routes/routerUser");
app.use('/photos',express.static('photos'));

app.use(express.json());
app.use(cors());
app.use('/Room',routerRoom);
app.use('/User',routerUser);

app.listen(3001,()=>{
    console.log("Server running on port 3001");
})
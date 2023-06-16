
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/Router");
app.use('/photos',express.static('photos'));

app.use(express.json());
app.use(cors());
app.use(router);
app.listen(3001,()=>{
    console.log("Server running on port 3001");
})
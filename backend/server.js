const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const StartMongoServer = require("./configs/db");
require('dotenv').config();
 
const user = require("./routes/user");
const group = require("./routes/group")

StartMongoServer();
const app = express();

app.use(cors())

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(400).json({ message: "API Working"})
})

app.use("/users", user)

app.use("/groups", group)



app.listen(PORT, (req, res) => {
    console.log(`Server started at port ${PORT}`)
})
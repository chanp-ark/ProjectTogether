const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const StartMongoServer = require("./configs/db");
require('dotenv').config();
 
const user = require("./routes/user");

StartMongoServer();
const app = express();

app.use(cors())

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.status(400).json({ message: "API Working"})
})


app.use("/users", user)

app.listen(PORT, (req, res) => {
    console.log(`Server started at port ${PORT}`)
})
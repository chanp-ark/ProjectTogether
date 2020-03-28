const express = require("express");
const bodyParser = require("body-parser");
const StartMongoServer = require("./configs/db");

const user = require("./routes/user");

StartMongoServer();
const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.status(400).json({ message: "API Working"})
})


app.use("/user", user)







app.listen(PORT, (req, res) => {
    console.log(`Server started at port ${PORT}`)
})
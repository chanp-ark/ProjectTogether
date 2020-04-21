const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const StartMongoServer = require("./configs/db");
require('dotenv').config();
 
const userRoute = require("./routes/user");
const groupRoute = require("./routes/group")

StartMongoServer();
const app = express();

app.use(cors())

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(400).json({ message: "API Working"})
})

app.post(
    "/signup", 
    async (req, res) => {
        const {email, password, username, skills, iAm, iLike, iAppreciate} = req.body;
        try {
            let user = await User.findOne({email})
            if (user) return res.status(400).json({ failure: "User already exists" })
            user = new User ({ 
                email: email, 
                password: password, 
                profile: {
                    username,
                    skills,
                    iAm,
                    iLike,
                    iAppreciate
                }
            })
            // *** bcrypt ***
            let salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
            await user.save(err => {
                if (err) console.error("at user save:", err.message)
            })
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload, process.env.SECRET_KEY, { expiresIn: '3h' },
                (err, token) => {
                    if (err) {
                        console.error("at jwt sign:", err)
                    } else {
                        res.status(200).json({
                            message: "User saved!",
                            token,
                            userProfile: user.profile
                        })
                    }
                }
            )

        } catch (err) {
            console.error("catch", err.message)
            res.status(500).json({message: err.message})
        }
    }
)

app.post(
    "/login",
    async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({email: email})
            if (!user) {
                return res.status(500).json({
                    failure: "User does not exist!"
                })
            } 
            const passwordMatch = await bcrypt.compare(password, user.password)
            if (!passwordMatch) return res.status(400).json({message: "Email/Password is not correct"})
            const payload = {
                user: {
                    id: user.id
                }}
            jwt.sign(
                payload, process.env.SECRET_KEY,  { expiresIn: '3h'},
                (err, token) => {
                    if (err) throw err
                    res.status(200).json({
                        token: token,
                        userProfile: user.profile
                    })
                })
        } catch(err) {
            console.error(err)
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }
)

app.use("/users", userRoute)

app.use("/groups", groupRoute)



app.listen(PORT, (req, res) => {
    console.log(`Server started at port ${PORT}`)
})
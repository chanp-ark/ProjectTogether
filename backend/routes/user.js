const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require("../models/User");
const auth = require("../middleware/auth")

// @ method: GET
// @ param: /
// @ description: see all users
router.get(
    "/",
    async (req, res) => {
        try {
            users = await User.find()
            let profile = users.map(user => user['profile'])
            res.status(200).json({profile})
        } catch {
            return res.status(500).json({
                failure: "Error in getting users"
            })
        }
    })

// if app ever goes big, add in a refresh token

// @ method: POST
// @ param: /signup
// @ description: User Sign Up
router.post(
    "/signup", 
    async (req, res) => {
        const {username, email, password} = req.body;
        try {
            let user = await User.findOne({email})
            if (user) return res.status(400).json({ failure: "User already exists" })
            user = new User ({ 
                email: email, 
                password: password, 
                profile: {
                    username 
                }
            })
            // *** bcrypt ***
            let salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
            await user.save(err => {
                if (err) console.error("at user save:", err)
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
                        })
                    }
                }
            )

        } catch (err) {
            console.error("catch", err)
            res.status(500).json({message: err})
        }
    }
)

// @method: POST
// @param: /login
// description: user log in
router.post(
    "/login",
    async (req, res) => {
        const { email, password } = req.body;
        try {
            let user = await User.findOne({email: email})
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
                        username: user.profile.username
                    })
                })
        } catch(err) {
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }
)

// @ method: GET
// @ param: /:username
// @ description: get logged in user
router.get("/profile/:id", async (req, res) => {
    try {
        User.findOne( 
            {
                'profile.username':req.params.id
            })
            .then(foundUser => res.status(200).json(foundUser.profile))
    } catch {
        return res.status(500).json({failure: "User does not exist"})
    }
})

// @ method: GET
// @ param: /:username/edit
// @ description: get logged in user

// router.get("/profile/:id/edit", auth, async (req, res) => {
//     if (req.user.id === undefined) {
//         res.json({ message: 'Unauthorized' })
//     }
//     try {
//       const user = await User.findById(req.user.id);
//       const {username, email} = user
//       res.json({
//           username: username,
//           email: email
//       });
//     } catch (err) {
//       res.status(500).send({ message: err });
//     }
//   });

// @method: PUT
// @ param: /:username/edit
// @ description: edit user info
router.put("/profile/:username/edit", auth, async(req, res) => {
    try {
        res.send({message: "PUT request"})
    } catch {
        res.send({message: "error"})
    }
})

module.exports = router;
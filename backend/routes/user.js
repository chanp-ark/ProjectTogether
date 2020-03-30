const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require("../models/User");
const auth = require("../middleware/auth")

// to see users, delete this later
    // @ method: GET
    // @ param: /
    // @ description: see all users
router.get(
    "/",
    async (req, res) => {
        try {
            let users = await User.find()
            res.status(200).json({
                users
            })
        } catch {
            return res.status(500).json({
                message: "Error in getting users"
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
            // create a variable 'user' equal to the finding one User in database
            let user = await User.findOne({email})
            // if user is found return a message, "User already exists"
            if (user) return res.status(400).json({ message: "User already exists" })
            // reassign user a new User model with username, email, and password
            user = new User ({ username, email, password })
            // *** bcrypt ***
            // generate salt and wait
            let salt = await bcrypt.genSalt(10)
            // hash password using bcrypt and wait
            user.password = await bcrypt.hash(password, salt)
            // save user 
            await user.save(err => {
                if (err) return handleError(err)
            })
            // create jwt 
                // jwt.sign(payload, secret, [options, callback])
            // create a variable called pay load with the user's id
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload, process.env.SECRET_KEY, { expiresIn: '10h' },
                (err, token) => {
                    if (err) {
                        return handleError(err)
                    } else {
                        res.status(200).json({
                            message: "User saved!",
                            username: username,
                            token
                        })
                    }
                }
            )
        } catch (err) {
            console.error(err)
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
        // destructure req.body's email and password
        const { email, password } = req.body;
        // try...catch
        try {
            // find user in db and wait
            let user = await User.findOne({email: email})
            if (!user) {
                return res.status(500).json({
                    message: "User does not exist!"
                })
            } 
            // if user is not found, return res.json with error message
            // compare password with bcrypt and wait
            const passwordMatch = await bcrypt.compare(password, user.password)
            // if compare evaluates to false, handle error
            if (!passwordMatch) return res.status(400).json({message: "Email/Password is not correct"})
            // create payload
            const payload = {
                user: {
                    id: user.id
                }
            }
            // create jwt
            jwt.sign(
                payload, process.env.SECRET_KEY,  { expiresIn: '10h'},
                (err, token) => {
                    if (err) throw err
                    res.status(200).json({
                        message: "You have successfully logged in",
                        token: token
                    })
                })
        } catch(err) {
            console.error(err.message)
            // return res.json with error message
            return res.status(500).json({
                message: "Server Error"
            })
        }
    }
)


// @ method: GET
// @ param: /:username
// @ description: get logged in user


router.get("/profile/edit", auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const {username, email} = user
      res.json({
          username: username,
          email: email
      });
    } catch (err) {
      res.send({ message: err });
    }
  });



module.exports = router;
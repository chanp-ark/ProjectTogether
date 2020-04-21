const express = require("express");
const router = express.Router();

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

// @ method: GET
// @ param: /:username
// @ description: get logged in user
router.get("/:id", async (req, res) => {
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

// @method: PUT
// @ param: /:username/edit
// @ description: edit user info
router.put("/:username", auth, async(req, res) => {

    try {
        console.log("passed from auth: ", req.user.id, req.body)
        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            "profile": req.body
        }, { returnNewDocument: true}, (err, user) => {
            if (err) {
                res.status(400).json({message: "Cannot update user"})
            } else {
                res.status(200).json({profile: user.profile})
            }
        })
        console.log("updatedUser", updatedUser)
    } catch {
        res.status(400).json({message: "error"})
    }
})

module.exports = router;
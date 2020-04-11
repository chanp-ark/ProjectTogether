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
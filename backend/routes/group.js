const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth")
const User = require("../models/User")
const Group = require("../models/Group")

// @ method: GET
// @ param: /
// @ desc: get group info

router.get("/", async(req, res) => {
    try {
        const groups = await Group.find();
        return res.status(200).json({
            message: "Success",
            groups
        })
    } catch {
        res.send({failure: "GET Groups failed"})
    }
})

// @ method: POST
// @ param: /
// @ desc: create new group

router.post("/", auth, async(req, res) => {
    try {
        const { name, skills, description, curCap, maxCap, users} = req.body;
        let group = await Group.findOne({name})
        if (group) return res.status.json({failure: "Group name already in use"})
        group = new Group({name, skills, description, curCap, maxCap, users})
        group.save(err => {
            if (err) {
                console.error(err)
            } else {
                res.status(200).json({message: `Group ${name} created!`, group})
            }
        })
        let foundUser = await User.findOneAndUpdate(
            {'profile.username': users}, 
            {$addToSet: {'profile.groups':name} },
            { returnNewDocument: true})
        console.log(group)
        console.log(foundUser)
    } catch {
        res.send({failure: "Something is wrong"})
    }
})

// @method: PUT
// @ param: /
// @ desc: add user into group
router.put("/", auth, async(req, res) => {
    try {
        console.log(req.body)
        const foundUser = await User.findOneAndUpdate(
            { 'profile.username': req.body.userId }, 
            { $addToSet: {'profile.groups':req.body.name} },
            { returnNewDocument: true})
        const foundGroup = await Group.findOneAndUpdate(
            { name: req.body.name}, 
            {   $addToSet: {users : req.body.userId},
                $inc: {curCap: 1}
            },
            { returnNewDocument: true}
        )
        console.log("foundUser: ", foundUser)
        console.log("foundGroup: ", foundGroup)
        console.log({user: foundUser.profile, group: foundGroup})

        res.status(200).json({user: foundUser.profile, group: foundGroup})
    } catch {
        res.status(500).json({failure:"PUT request failed"})

    }
})

// @method: GET
// @param: /:id
// desc: get group's info

router.get("/:id", async(req, res) => {
    const groupName = req.params.id
    try {
        let group = await Group.findOne({name: groupName})
        res.status(200).json(group)
    } catch {
        res.status(500).json({
            failure: "Cannot get group info"
        })
    }
})

module.exports = router;
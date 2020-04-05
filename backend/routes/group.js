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
        res.send({message: "Failure"})
    }
})

// @ method: POST
// @ param: /
// @ desc: create new group

router.post("/", auth, async(req, res) => {
    try {
        const { name, skills, description, curCap, maxCap, users} = req.body;
        let group = await Group.findOne({name})
        if (group) return res.status.json({message: "Group name already in use"})
        group = new Group({name, skills, description, curCap, maxCap, users})
        group.save(err => {
            if (err) {
                console.error(err)
            } else {
                res.status(200).json({message: `Group ${name} created!`})
            }
        })
    } catch {
        res.send({failure: "Something is wrong"})
    }
})

// @method: PUT
// @ param: /
// @ desc: add user into group
router.put("/", async(req, res) => {
    try {
        res.status(200).json({message:"PUT requested"})
    } catch {
        res.status(500).json({message:"PUT request failed"})

    }
})

module.exports = router;
const express = require("express");
const router = express.Router();

const Group = require("../models/Group")

// @ method: GET
// @ param: /
// @ desc: get group info

router.get("/", async(req, res) => {
    try {
        // find all groups in db
        const group = Group.find();
        // send name, skills, description, maxCap
        const { name, skills, description, maxCap } = group
        return res.status(400).json({
            message: "Success",
            name, skills, description, maxCap
        })
        
    } catch {
        res.send({message: "Failure"})
    }
})



// @ method: POST
// @ param: /groups/new
// @ desc: create new group

router.post("/new", async(req, res) => {
    try {
        const { name, skills, description, curCap, maxCap, users} = req.body;
        let group = await Group.findOne({name})
        if (group) return res.status.json({message: "Group name already in use"})
        // make new model
        group = new Group({name, skills, description, curCap, maxCap, users})
        // save into db
        group.save(err => {
            if (err) {
                console.error(err)
            } else {
                res.status(200).json({message: `Group ${name} created!`})
            }
        })
    } catch {
        res.send({message: "Something is wrong"})
    }
})

module.exports = router;
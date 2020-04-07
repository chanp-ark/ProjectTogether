const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true
   },
   skills: {
       type: String,
       required: true
   },
   description: {
       type: String,
       required: true
   },
   curCap: {
       type: Number,
       required: true
   },
   maxCap: {
       type: Number,
       required: true
   },
   users: {
       type: [String],
       required: true
   }
})

module.exports = mongoose.model("group", GroupSchema)
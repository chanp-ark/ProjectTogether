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
       type: String,
       required: true
   },
   maxCap: {
       type: String,
       required: true
   },
   users: {
       type: Array,
       required: true
   }
})

module.exports = mongoose.model("group", GroupSchema)
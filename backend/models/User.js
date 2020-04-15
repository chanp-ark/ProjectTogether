const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        username: {
            type: String, 
            required: true
        },
        skills: {
            type: String, 
            required: false
        },
        iAm: {
            type: String, 
            required: false
        },
        iLike: {
            type: String, 
            required: false
        },
        iAppreciate: {
            type: String, 
            required: false
        },
        groups: {
            type: [String], 
            required: false
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

});
// mongoose.model(modelName, schema)
    // modelName is used in collections in db
module.exports = mongoose.model("user", UserSchema)
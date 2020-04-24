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
            required: true
        },
        iAm: {
            type: String, 
            required: true
        },
        iLike: {
            type: String, 
            required: true
        },
        iAppreciate: {
            type: String, 
            required: true
        },
        groups: [{
            type: [Object],
            required: false
        }]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

});
// mongoose.model(modelName, schema)
    // modelName is used in collections in db
module.exports = mongoose.model("user", UserSchema)
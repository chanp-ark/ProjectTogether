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
        skills: String,
        iAm: String,
        iLike: String,
        iAppreciate: String,
    },
    groups: {
        type: Object
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

});
// mongoose.model(modelName, schema)
    // modelName is used in collections in db
module.exports = mongoose.model("user", UserSchema)
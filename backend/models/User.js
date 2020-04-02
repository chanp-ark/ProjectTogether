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
        iAm: String,
        iLike: String,
        iAppreciate: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
    /*
    
    *** for Profile page ***
    
    skills: String,
    hobbies: String,
    groups: String,
    
    
    */
});
// mongoose.model(modelName, schema)
    // modelName is used in collections in db
module.exports = mongoose.model("user", UserSchema)
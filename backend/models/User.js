const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
// mongoose.model(modelName, schema)
    // modelName is used in collections in db
module.exports = mongoose.model("user", UserSchema)
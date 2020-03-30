const mongoose = require('mongoose');

const StartMongoServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to DB...");
    } catch {
        
    }
};

module.exports = StartMongoServer;
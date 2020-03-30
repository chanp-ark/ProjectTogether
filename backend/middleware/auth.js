const jwt = require("jsonwebtoken");

// Format of token
    // authorization: Bearer [access_token]


module.exports = function(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        // synchronous function returns the payload decoded if valid
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded.user;
        next()
    } else {
        return res.status(401).json({ message: "Auth Error" });
    }
    
};
    
    
    

















    
    
// const auth = (req, res, next) => {
//     // get auth header value
//     const bearerHeader = req.headers['authorization'];
//     // check if bearerHeader is undefined
//     if (typeof bearerHeader !== 'undefined') {
//         // Split at the space - use split to turn array by the argument
//         const bearer = bearerHeader.split(' ');
        
//         // Get token from array
//         const bearerToken = bearer[1];
//         // Set the token
//         req.token = bearerToken;
//         // next middleware
//         next();
//     } else {
//         // Forbidden
//         res.status(500).json({
//             message: "Invalid Token"
//         })
//         // or a res json with my own message
//     }
// }



// module.exports = auth;
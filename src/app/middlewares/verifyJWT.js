const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyJWT(req, res, next){
    // Bearer token
    const authHeader = req.headers.authorization; 

    if (!authHeader) return next();

    // Lấy token từ header
    const token = authHeader.split(' ')[1];

    // Xác thực token, payload
    if (token) {
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, payload) => {
                if (err) return res.sendStatus(403);    // invalid token
    
                req.user = payload.user;
            }
        )
    }
    
    next();
    //res.sendStatus(401);
}

module.exports = verifyJWT;
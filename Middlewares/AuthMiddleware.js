const User = require("../Models/UserModel");
require('dotenv').config()
const jwt = require("jsonwebtoken");

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                res.json({status: false})
                next();
            }
            else {
                const user = await User.findById(decodedToken.id);
                if (user) {
                    res.json({status: true, user: {id: user._id, email: user.email, name: user.name }})
                }
                else {
                    res.json({status: false})
                }
                next();
            }
        })
    }
    else {
        res.json({status: false});
        next();
    }
}
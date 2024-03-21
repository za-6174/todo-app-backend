require('dotenv').config()
const UserModel = require("../Models/UserModel");
const jwt = require("jsonwebtoken")


const maxAge = 3*24*60*60;

const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_KEY, {
        expiresIn: maxAge
    })
}

const handleErrors = (err) => {
    let errors = {email: "", password: ""};
    if (err.message === "Incorrect email") {
        errors.email = "The email is not registered"
    }

    if (err.message === "Incorrect password") {
        errors.password = "The password is incorrect"
    }

    if (err.code === 11000) {
        errors.email = "Email is already registered."
        return errors;
    }

    if (err.message.includes("Users validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
}

module.exports.register = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;
        const user = await UserModel.create({name, email, password});
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge*1000
        })
        res.status(201).json({user: {id: user._id, email: user.email, name: user.name }, created: true})
    }
    catch(err) {
        const errors = handleErrors(err)
        res.json({errors, created: false})
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge*1000
        })
        res.status(200).json({user: {id: user._id, email: user.email, name: user.name }, created: true})
    }
    catch(err) {
        const errors = handleErrors(err)
        res.json({errors, created: false})
    }
}

module.exports.logout = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (token)
            res.status(202).clearCookie('jwt').send('cookie cleared')
        else
            res.status(200).json({message: "no cookie"});
    }
    catch(err) {
        res.json({created: false})
    }
}
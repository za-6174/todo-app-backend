const mongoose = require("mongoose")
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
})

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email}) 
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        else {
            throw Error("Incorrect password");
        }
    }
    else {
        throw Error("Incorrect email");
    }
}

userSchema.statics.getUserById = async function(id) {
    const user = await this.findOne({_id: id})
    return user;
}
    
module.exports = mongoose.model("Users", userSchema); 
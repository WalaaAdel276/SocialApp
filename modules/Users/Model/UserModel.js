const mongoose = require("mongoose");
const userSchema  = require("../Schema/UserSchema");


const User = mongoose.model("users",userSchema )

module.exports = User;
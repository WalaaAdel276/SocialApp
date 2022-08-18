const mongoose = require("mongoose");
const adminSchema  = require("../Schema/AdminSchema");


const Admin = mongoose.model("admins",adminSchema)

module.exports = Admin;
const { Schema } = require("mongoose");
const bcrypt = require('bcrypt');
const {encryptNumber} = require('encrypt-phone-numbers')

const adminSchema = new Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    location: String,
    role: {
        type: String,
        enum: ["superAdmin", "admin"],
    },
    verified_Account: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})


adminSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 7);
    this.phone = encryptNumber(this.phone , 5, 'X')
    next();
  });



module.exports = adminSchema 
const { Schema } = require("mongoose");
const bcrypt = require('bcrypt');
const {encryptNumber} = require ('encrypt-phone-numbers')


const userSchema = new Schema({
    userName: String,
    email: String,
    password: String,
    phone: String,
    location: String,
    role: {
        type: String,
        default: "user"
    },
    verified_Account: {
        type: Boolean,
        default: false
    },
    Block_By_User: {
        type: Boolean,
        default: false
    },
    Block_By_Admin: {
        type: Boolean,
        default: false
    },
    Block_By_SuperAdmin: {
        type: Boolean,
        default: false
    },
    Deactivate_Account: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true
})


userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 7);
    this.phone = encryptNumber(this.phone , 5, 'X')
    next();
  });



module.exports = userSchema  
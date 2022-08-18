const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");
const bcrypt = require('bcrypt');


const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid Email OR Password" })
        } else {
            const match = await bcrypt.compare(password, user.password)
            if (match) {
                if (!user.verified_Account) {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: "Email is not verified" })
                } else {
                    const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, process.env.SECRET_KEY, {
                        expiresIn: "1h"
                    })
                    const { password, ...rest } = user._doc;
                    res.status(StatusCodes.OK).json({ message: "Login Success", user: rest, token })
                }

            } else {
                res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid password" })
            }
        }

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
        console.log(error);
    }


}
module.exports= login

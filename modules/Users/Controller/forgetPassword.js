const User = require("../Model/UserModel");
const bcrypt = require('bcrypt');
const { StatusCodes } = require("http-status-codes");
const sendEmail = require("../../../Common/Services/SendEmail");
const jwt = require("jsonwebtoken");


const forgetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email })
        if (user) {
            const password = await bcrypt.hash(newPassword, 7);
            const data = await User.updateOne({ email }, { password });
            let token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, process.env.SECRET_KEY, {
                expiresIn: "1h"
            });
            
            const info = await sendEmail([email], 'Reset Password',
                `<h1>HELLO WORLD FROM NODE JS</h1>
               <a href="http://localhost:5000/resetPassword/${token}">Reset Password</a>
               `)
            if (info.messageId && data.modifiedCount) {
                res.status(StatusCodes.OK).json({ message: " Password Updated successfully", Count: data.modifiedCount });
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error Invalid Email" })
            }
        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "User Not Found" });
        }

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error });
        console.log(error);

    }
}

const resetPassword = async (req, res) => {
    const { token } = req.params;
    console.log(token);
    let decoded = jwt.verify(token, process.env.SECRET_KEY)
    console.log(decoded);
    const user = await User.findOne({ _id: decoded._id })
    console.log(user);
    if (user) {
        res.status(StatusCodes.OK).json({ message: " Password reset successfully" })
    } else {
        res.status(StatusCodes.FORBIDDEN).json({ message: "FORBIDDEN" })
    }
}

module.exports = {
    resetPassword,
    forgetPassword

}
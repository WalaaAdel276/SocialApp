const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../../Common/Services/SendEmail");
const User = require("../Model/UserModel");
const sendPdf = require("../../../Common/Services/sendPdf");



const signUp = async (req, res) => {
    const { userName, email, password, confirmPassword, phone, location, role } = req.body;

    try {

        const EmailCheck = await User.findOne({ email })
        if (EmailCheck) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Email is Already Exist" })
        } else {
            const newUser = new User({ userName, email, password, phone, location, role })
            const data = await newUser.save();

            let token = jwt.sign({ _id: data._id, email: data.email, role: data.role }, process.env.SECRET_KEY, {
                expiresIn: "1h"
            });
            sendPdf([data]);
            const info = await sendEmail([email], 'EMAIL Verification',
                `<h1>HELLO WORLD FROM NODE JS</h1>
               <a href="http://localhost:5000/userActivate/${token}">Verify</a>
               `)
            if (info.messageId) {
                res.status(StatusCodes.CREATED).json({ message: " Created Success", data })

            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error Invalid Email" })
            }
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error })

    }

}


const userActivation = async (req, res) => {
    const { token } = req.params;
    let decoded = jwt.verify(token, process.env.SECRET_KEY)
    const user = await User.findOne({ _id: decoded._id })
    if (user) {
        const updatedUser = await User.updateOne({ _id: decoded._id },
            {
                verified_Account: true
            })
        res.status(StatusCodes.OK).json({ message: "User Verified " })
    } else {
        res.status(StatusCodes.FORBIDDEN).json({ message: "FORBIDDEN" })
    }

}


module.exports = {
    userActivation,
    signUp
}
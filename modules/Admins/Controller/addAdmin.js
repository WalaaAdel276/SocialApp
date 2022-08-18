const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const sendEmail = require("../../../Common/Services/SendEmail");
const Admin = require("../Model/AdminModel");
const sendPdf = require("../../../Common/Services/sendPdf");




const addAdmin = async (req, res) => {
    const { name, email, password, phone, location, role } = req.body;

    try {
        const EmailCheck = await Admin.findOne({ email })
        if (EmailCheck) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Email is Already Exist" })
        } else {
            const newAdmin = new Admin({name, email, password, phone, location, role })
            const data = await newAdmin.save();

            let token = jwt.sign({ _id: data._id, email: data.email }, process.env.SECRET_KEY, {
                expiresIn: "1h"
            });
            sendPdf([data]);
            const info = await sendEmail([email], 'EMAIL Verification',
                `<h1>HELLO WORLD FROM NODE JS</h1>
               <a href="http://localhost:5000/adminActivate/${token}">Verify</a>
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



const adminActivation = async (req, res) => {
    const { token } = req.params;
    let decoded = jwt.verify(token, process.env.SECRET_KEY)
    const admin = await Admin.findOne({ _id: decoded._id })
    if (admin) {
        const updatedAdmin = await Admin.updateOne({ _id: decoded._id },
            {
                verified_Account: true
            })
        res.status(StatusCodes.OK).json({ message: "Admin Verified " })
    } else {
        res.status(StatusCodes.FORBIDDEN).json({ message: "FORBIDDEN" })
    }

}


module.exports = {
    adminActivation,
    addAdmin
    
}
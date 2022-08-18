const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const Admin = require("../Model/AdminModel");
const bcrypt = require('bcrypt');


const loginAdmin = async (req, res) => {
    const { email, password } = req.body
    try {
        const admin  = await Admin.findOne({ email })
        if (!admin ) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid Email OR Password" })
        } else {
            const match = await bcrypt.compare(password,admin.password)
            if (match) {
                if (!admin .verified_Account) {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: "Email is not verified" })
                } else {
                    const token = jwt.sign({ _id: admin ._id, email: admin .email, role: admin .role }, process.env.SECRET_KEY, {
                        expiresIn: "1h"
                    })
                    const { password, ...rest } = admin._doc;
                    res.status(StatusCodes.OK).json({ message: "Login Success", admin: rest, token })
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
module.exports=loginAdmin

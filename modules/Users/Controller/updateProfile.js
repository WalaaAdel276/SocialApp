const { StatusCodes } = require("http-status-codes");
const User = require("../Model/UserModel");
const jwt = require("jsonwebtoken");
const { encryptNumber } = require('encrypt-phone-numbers')

const updateProfile = async (req, res) => {
    const { id } = req.params;
    let { userName, email, phone, location } = req.body;
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            if (token) {
                var decode = jwt.verify(token, process.env.SECRET_KEY)
                if (decode._id == id && decode) {
                    const user = await User.findOne({ _id: decode._id })
                    if (user) {
                        phone = encryptNumber(phone, 5, 'X')
                        const data = await User.updateOne({ _id: id }, { userName, email, phone, location });
                        if (data.modifiedCount) {
                            res.status(StatusCodes.OK).json({ message: "updated success", Count: data.modifiedCount, id });
                        } else {
                            res.status(StatusCodes.BAD_REQUEST).json({ message: "User Not Found" });
                        }

                    } else {
                        res.status(StatusCodes.BAD_REQUEST).json({ message: "User Not Found" });
                    }

                } else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid ID" });
                }

            }
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error })
        console.log(error);
    }
}
module.exports = updateProfile
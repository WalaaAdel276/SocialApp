const User = require("../Model/UserModel");
const bcrypt = require('bcrypt');
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");


const updatePassword = async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (token) {
            var decode = jwt.verify(token, process.env.SECRET_KEY)
        }
        if (id == decode._id) {
            const user = await User.findOne({ _id: id })
            if (user) {
                const match = await bcrypt.compare(oldPassword, user.password)
                if (match) {
                    if (!user.verified_Account) {
                        res.status(StatusCodes.BAD_REQUEST).json({ message: "Email is not verified" })
                    } else {
                        const password = await bcrypt.hash(newPassword, 7);
                        const data = await User.updateOne({ _id: id }, { password });
                        if (data.modifiedCount) {
                            res.status(StatusCodes.OK).json({ message: " Password Updated successfully", Count: data.modifiedCount, id });
                        } else {
                            res.status(StatusCodes.BAD_REQUEST).json({ message: "User Not Found" });
                        }
                    }

                } else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: "Wrong Password" })
                }

            } else {
                res.status(StatusCodes.BAD_REQUEST).json({ message: "User Not Found" });
            }

        } else {
            res.status(StatusCodes.FORBIDDEN).json({ message: "FORBIDDEN" });
        }



    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error });

    }

}
module.exports = updatePassword;
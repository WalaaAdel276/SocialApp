const { StatusCodes } = require("http-status-codes");
const User = require("../Model/UserModel");
const jwt = require("jsonwebtoken");

 const deactivateAccount =  async (req, res) => {
    const { id } = req.params;

    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            if (token) {
                var decode = jwt.verify(token, process.env.SECRET_KEY)
            }
        }
        if (id == decode._id) {
            const user = await User.findOne({ _id: id })
            if (user) {
                const data = await User.updateOne({ _id: id }, { Deactivate_Account: true })
                if (data.modifiedCount) {
                    res.status(StatusCodes.OK).json({ message: "Account Deactivated ", Count: data.modifiedCount, id });
                } else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: "User Not Found" });
                }
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({ message: "User Not Found" });
            }

        } else {
            res.status(StatusCodes.FORBIDDEN).json({ message: "FORBIDDEN" })
        }

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error });
        console.log(error);

    }

}

module.exports = deactivateAccount

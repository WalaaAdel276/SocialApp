
const { StatusCodes } = require("http-status-codes");
const User = require("../Model/UserModel");
const jwt = require("jsonwebtoken");



const blockUser = async (req, res) => {
    const { email } = req.body;
    const roles = ["admin","superAdmin"]
    try {
        const emailCheck = await User.findOne({ email })
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            if (token) {
                var decode = jwt.verify(token, process.env.SECRET_KEY)
                console.log(decode.role);
            }
        }
        if (emailCheck) {
            let data;
            if (decode.role == roles[0]) {
                 data = await User.updateOne({ email }, { Block_By_Admin: true })
            } else if (decode.role == roles[1] ) {
                 data = await User.updateOne({ email }, { Block_By_SuperAdmin: true })
            } else {
                 data = await User.updateOne({ email }, { Block_By_User: true })
            }
            if (data.modifiedCount) {
                res.status(StatusCodes.OK).json({ message: "Account Blocked", Count: data.modifiedCount, id: decode._id });
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({ message: "User Not Found" });
            }

        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "User Not Found" });
        }

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error });
        console.log(error);

    }

}

module.exports = blockUser
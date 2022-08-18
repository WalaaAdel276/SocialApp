const User = require("../../Users/Model/UserModel")
const Post = require("../Model/PostModel")
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

exports.addPostHandler = async (req, res) => {
    const { title, content, createdBy } = req.body
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            if (token) {
                var decode = jwt.verify(token, process.env.SECRET_KEY)
            }
        }
        if (createdBy == decode._id) {
            const UserCheck = await User.findOne({ _id: createdBy })
            if (!UserCheck) {
                res.status(StatusCodes.BAD_REQUEST).json({ message: "User Not Found" })
            } else {
                if (UserCheck.verified_Account && !UserCheck.Block_By_Admin
                    && !UserCheck.Block_By_SuperAdmin && !UserCheck.Deactivate_Account) {
                    const newPost = new Post({ title, content, createdBy })
                    const data = await newPost.save();
                    res.status(StatusCodes.CREATED).json({ message: " Created Success", data })
                } else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: "User Not Allowed" })
                }

            }
        } else {
            res.status(StatusCodes.Fo).json({ message: "User Not Found" })
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error })
    }
}

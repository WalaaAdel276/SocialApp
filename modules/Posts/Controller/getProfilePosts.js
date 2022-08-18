const Post = require("../Model/PostModel");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");


exports.getProfilePosts = async (req, res) => {
    const { id } = req.params;
    const postArr = [];

    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            if (token) {
                var decode = jwt.verify(token, process.env.SECRET_KEY)
            }
        }
        if (id == decode._id || decode.role == "admin") {
            const data = await Post.find({ createdBy: id })
            postArr.push(data)
            res.status(StatusCodes.OK).json({ message: "All Profile Posts", AllPosts: postArr })
        } else {
            res.status(StatusCodes.FORBIDDEN).json({ message: "FORBIDDEN" });
        }


    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error })
    }
}
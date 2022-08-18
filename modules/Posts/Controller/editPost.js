const { StatusCodes } = require("http-status-codes");
const Post = require("../Model/PostModel");
const jwt = require("jsonwebtoken");

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const post = await Post.findOne({ _id: id })
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            if (token) {
                var decode = jwt.verify(token, process.env.SECRET_KEY)
            }
        }
        if (post) {
            if (post.createdBy == decode._id) {
                const data = await Post.updateOne({ _id: id }, { title, content });
                if (data.modifiedCount) {
                    res.status(StatusCodes.OK).json({ message: " Post Updated successfully", Count: data.modifiedCount, id });
                } else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: "Post Not Found" });
                }
            }
            else {
                res.status(StatusCodes.BAD_REQUEST).json({ message: "Post Not Found" });
            }
        } else {
            res.status(StatusCodes.FORBIDDEN).json({ message: "FORBIDDEN" });
        }

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error })
        console.log(error);
    }
}
module.exports = updatePost
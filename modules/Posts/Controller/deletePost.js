const { StatusCodes } = require("http-status-codes");
const Post = require("../Model/PostModel");
const jwt = require("jsonwebtoken");
const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findOne({ _id: id })
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            if (token) {
                var decode = jwt.verify(token, process.env.SECRET_KEY)
            }
        }
        if (post) {
            if (post.createdBy == decode._id || decode.role == "admin") {
                const data = await Post.deleteOne({ _id: id });
                if (data.deletedCount) {
                    res.status(StatusCodes.OK).json({ message: "Post Deleted successfully", Count: data.deletedCount, id });
                } else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: "Post Not Found" });
                }

            } else {
                res.status(StatusCodes.FORBIDDEN).json({ message: "FORBIDDEN" });
            }


        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Post Not Found" });
        }


    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error })
        console.log(error);
    }
}
module.exports = deletePost
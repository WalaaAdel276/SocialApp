
const { StatusCodes } = require("http-status-codes");
const Post = require("../../Posts/Model/PostModel");
const ReportedPost = require("../Model/ReportedPostsModel");


exports.ReviewReportedPost = async (req, res) => {
    const { id } = req.params
    try {
        const reportedPost = await ReportedPost.findOne({ _id: id }).populate("ReportedPost")
        console.log(reportedPost);
        if (!reportedPost) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Post Not Reported" })
        } else {
            if (reportedPost.ReportedPost.Number_Of_Reports >= 10) {
                const updatePost = await Post.updateOne({ _id:reportedPost.ReportedPost._id },
                    { Block_Post: true });
                if (updatePost.modifiedCount) {
                    res.status(StatusCodes.CREATED).json({ message: "Post Blocked Successfully", Count: updatePost.modifiedCount, PostId:reportedPost.ReportedPost._id});
                } else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: "Post Not Found" });
                }

            } else {
                res.status(StatusCodes.OK).json({ message: "Reports did not reach the minimum" })
            }

        }

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error })
        console.log(error);
    }
}
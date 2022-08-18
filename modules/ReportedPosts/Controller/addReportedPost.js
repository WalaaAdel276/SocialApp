const User = require("../../Users/Model/UserModel")
const { StatusCodes } = require("http-status-codes");
const Post = require("../../Posts/Model/PostModel");
const ReportedPost = require("../Model/ReportedPostsModel");


exports.addReportedPost = async (req, res) => {
    const { reportComment, ReportCreator } = req.body
    const { postId} = req.params 
    try {
        const UserCheck = await User.findOne({ _id: ReportCreator })
        const PostCheck = await Post.findOne({ _id: postId})
        if (!UserCheck) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "User Not Found" })
            if (!PostCheck) {
                res.status(StatusCodes.BAD_REQUEST).json({ message: "Post Not Found" })
            }

        }
        else {
            if (UserCheck.verified_Account && !UserCheck.Block_By_Admin
                && !UserCheck.Block_By_SuperAdmin && !UserCheck.Deactivate_Account) {
                const newReportedPost = new ReportedPost({ reportComment, ReportCreator, ReportedPost: postId})
                const data = await newReportedPost.save();
                let Number_Of_Reports = ++PostCheck.Number_Of_Reports;
                const updatePost = await Post.updateOne({ _id: postId}, { Reported_Post: true, Number_Of_Reports });
                if (updatePost.modifiedCount) {
                    res.status(StatusCodes.CREATED).json({ message: " Reported Added Successfully", Count: updatePost.modifiedCount, data });
                } else {
                    res.status(StatusCodes.BAD_REQUEST).json({ message: "Post Not Found" });
                }

            } else {
                res.status(StatusCodes.BAD_REQUEST).json({ message: "User Not Allowed" })
            }

        }

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error })
        console.log(error);
    }
}
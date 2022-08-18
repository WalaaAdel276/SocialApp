const mongoose = require("mongoose");
const ReportedPostsSchema = require("../Schema/ReportedPostsSchema");


const ReportedPost = mongoose.model("reportedPosts",ReportedPostsSchema)

module.exports =  ReportedPost;
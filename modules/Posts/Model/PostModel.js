const mongoose = require("mongoose");
const postSchema = require("../Schema/PostSchema");


const Post = mongoose.model("posts",postSchema)

module.exports = Post;
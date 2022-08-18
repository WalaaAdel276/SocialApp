const { DELETE_POST, GET_ALL_PROFILE_POSTS, GET_ALL_POSTS } = require("../../../modules/Posts/PostEndPoints");
const { REVIEW_REPORTED_POSTS } = require("../../../modules/ReportedPosts/ReportedEndPoints");
const { SIGN_UP_USER, BLOCK_USER, GET_ALL_USERS } = require("../../../modules/Users/UserEndPoints");




module.exports =[
    SIGN_UP_USER,
    BLOCK_USER,
    DELETE_POST,
    GET_ALL_PROFILE_POSTS,
    GET_ALL_POSTS,
    REVIEW_REPORTED_POSTS,
    GET_ALL_USERS
]
const { GET_ALL_ADMINS,ADD_ADMIN, DELETE_ADMIN, UPDATE_ADMIN } = require("../../../modules/Admins/AdminEndPoints");
const { GET_ALL_POSTS } = require("../../../modules/Posts/PostEndPoints");
const { REVIEW_REPORTED_POSTS } = require("../../../modules/ReportedPosts/ReportedEndPoints");
const { BLOCK_USER, GET_ALL_USERS } = require("../../../modules/Users/UserEndPoints");


module.exports = [
    GET_ALL_POSTS,
    REVIEW_REPORTED_POSTS,
    ADD_ADMIN,
    DELETE_ADMIN,
    GET_ALL_ADMINS,
    BLOCK_USER,
    UPDATE_ADMIN ,
    GET_ALL_USERS
]
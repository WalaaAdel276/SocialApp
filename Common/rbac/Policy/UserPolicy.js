const { SIGN_UP_USER, SIGN_IN_USER, UPDATE_PROFILE,
    UPDATE_PASSWORD, FORGET_PASSWORD, DEACTIVATE_ACCOUNT } = require("../../../modules/Users/UserEndPoints");


const { CREATE_POST, EDIT_POST, GET_ALL_PROFILE_POSTS, DELETE_POST } = require("../../../modules/Posts/PostEndPoints");
const { REPORTED_POST } = require("../../../modules/ReportedPosts/ReportedEndPoints");

module.exports = [
    SIGN_UP_USER,
    SIGN_IN_USER,
    UPDATE_PROFILE,
    UPDATE_PASSWORD,
    FORGET_PASSWORD,
    DEACTIVATE_ACCOUNT,
    CREATE_POST,
    EDIT_POST,
    GET_ALL_PROFILE_POSTS,
    DELETE_POST,
    REPORTED_POST
]
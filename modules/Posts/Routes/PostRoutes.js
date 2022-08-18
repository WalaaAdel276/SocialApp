const { addPostHandler } = require('../Controller/addPost');
const { addPostSchema, getAllPostsSchema, deletePostSchema, editPostSchema, getProfilePostsSchema } = require('../Joi/PostValidation');
const isAuthorized = require('../../../Common/MiddleWare/isAuthorized');
const { CREATE_POST, GET_ALL_POSTS, DELETE_POST, EDIT_POST, GET_ALL_PROFILE_POSTS } = require('../PostEndPoints');
const ValidateRequest = require('../../../Common/MiddleWare/ValidateRequest');
const { getAllPosts } = require('../Controller/getAllPosts');
const deletePost = require('../Controller/deletePost');
const updatePost = require('../Controller/editPost');
const { getProfilePosts } = require('../Controller/getProfilePosts');

const router = require('express').Router();

router.post("/posts", ValidateRequest(addPostSchema), isAuthorized(CREATE_POST),addPostHandler )
router.get("/posts",ValidateRequest(getAllPostsSchema), isAuthorized(GET_ALL_POSTS),getAllPosts);
router.get("/profilePosts/:id",ValidateRequest(getProfilePostsSchema), isAuthorized(GET_ALL_PROFILE_POSTS ),getProfilePosts);
router.delete("/posts/:id", ValidateRequest(deletePostSchema), isAuthorized(DELETE_POST), deletePost)
router.put("/posts/:id", ValidateRequest( editPostSchema), isAuthorized(EDIT_POST), updatePost)

module.exports =  router;
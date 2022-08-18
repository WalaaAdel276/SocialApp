const router = require('express').Router();
const isAuthorized = require('../../../Common/MiddleWare/isAuthorized');
const ValidateRequest = require('../../../Common/MiddleWare/ValidateRequest');
const { addReportedPost } = require('../Controller/addReportedPost');
const { ReviewReportedPost } = require('../Controller/ReviewReported');
const { ReportedPostSchema, ReviewReportedSchema } = require('../Joi/ReportedPostsValidation');
const { REPORTED_POST, REVIEW_REPORTED_POSTS } = require('../ReportedEndPoints');
router.post("/reportPost/:postId", ValidateRequest(ReportedPostSchema), isAuthorized(REPORTED_POST), addReportedPost)
router.put("/reviewReportedPost/:id", ValidateRequest(ReviewReportedSchema), isAuthorized(REVIEW_REPORTED_POSTS), ReviewReportedPost)
module.exports = router;
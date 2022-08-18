
const isAuthorized = require('../../../Common/MiddleWare/isAuthorized');
const ValidateRequest = require('../../../Common/MiddleWare/ValidateRequest');
const blockUser = require('../Controller/blockUser');

const { resetPassword, forgetPassword } = require('../Controller/forgetPassword');
const login = require('../Controller/Login');
const { signUp, userActivation } = require('../Controller/signUp');
const updatePassword = require('../Controller/updatePassword');
const updateProfile = require('../Controller/updateProfile');
const deactivateAccount =require("../Controller/deactivateAccount")
const { SignUpSchema, loginSchema, updateProfileSchema, updatePasswordSchema, blockUserSchema, deactivateAccountSchema, forgetPasswordSchema, getAllUsersSchema } = require('../Joi/UserValidation');
const { UPDATE_PROFILE, UPDATE_PASSWORD, BLOCK_USER, DEACTIVATE_ACCOUNT, FORGET_PASSWORD, GET_ALL_USERS } = require('../UserEndPoints');
const { getAllUser } = require('../Controller/getAllUser');
const router = require('express').Router();

router.get("/users", ValidateRequest(getAllUsersSchema), isAuthorized(GET_ALL_USERS),getAllUser )
router.post("/signup", ValidateRequest(SignUpSchema), signUp)
router.get("/userActivate/:token", userActivation)
router.get("/resetPassword/:token", resetPassword)
router.post("/login", ValidateRequest(loginSchema), login)
router.put("/users/:id", ValidateRequest(updateProfileSchema), isAuthorized(UPDATE_PROFILE), updateProfile)
router.put("/updatePassword/:id", ValidateRequest(updatePasswordSchema), isAuthorized(UPDATE_PASSWORD), updatePassword)
router.put("/blockUser", ValidateRequest(blockUserSchema), isAuthorized(BLOCK_USER), blockUser)
router.put("/deactivateAccount/:id", ValidateRequest(deactivateAccountSchema), isAuthorized(DEACTIVATE_ACCOUNT),deactivateAccount)
router.put("/forgetPassword", ValidateRequest(forgetPasswordSchema), isAuthorized(FORGET_PASSWORD),forgetPassword)






module.exports = router;
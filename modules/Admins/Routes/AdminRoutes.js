const router = require('express').Router();
const { addAdmin, adminActivation } = require('../Controller/addAdmin');
const ValidateRequest = require('../../../Common/MiddleWare/ValidateRequest');
const { addAdminSchema,loginAdminSchema, updateAdminSchema,deleteAdminSchema, getAllAdminSchema } = require('../Joi/AdminValidation');
const loginAdmin = require('../Controller/loginAdmin');
const updateAdmin = require('../Controller/updateAdmin');
const { UPDATE_ADMIN, DELETE_ADMIN, GET_ALL_ADMINS, ADD_ADMIN } = require('../AdminEndPoints');
const isAuthorized = require('../../../Common/MiddleWare/isAuthorized');
const deleteAdmin = require('../Controller/deleteAdmin');
const { getAllAdmins } = require('../Controller/getAllAdmins');

router.post("/admins", ValidateRequest(addAdminSchema),isAuthorized( ADD_ADMIN),addAdmin)
router.get("/adminActivate/:token",adminActivation);
router.get("/admins",ValidateRequest(getAllAdminSchema), isAuthorized(GET_ALL_ADMINS),getAllAdmins);
router.post("/loginAdmin",ValidateRequest(loginAdminSchema),loginAdmin)
router.put("/admins/:id", ValidateRequest(updateAdminSchema), isAuthorized(UPDATE_ADMIN), updateAdmin)
router.delete("/admins/:id", ValidateRequest(deleteAdminSchema), isAuthorized(DELETE_ADMIN), deleteAdmin)




module.exports =  router;
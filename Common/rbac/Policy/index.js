const AdminPolicy  = require("./AdminPolicy")
const UserPolicy  = require("./UserPolicy")
const SuperAdminPolicy  = require("./SuperAdminPolicy")
const roles = require("../../Enum/roles")


const opt = {
    [roles.ADMIN]:{
        can:AdminPolicy 
    },
    [roles.USER]:{
        can:UserPolicy
    },
    [roles.SUPER_ADMIN]:{
        can:SuperAdminPolicy
    }
}


module.exports = opt;
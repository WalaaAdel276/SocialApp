const RBAC = require("easy-rbac");
const opt = require("./rbac/Policy");
const rbac = RBAC.create(opt)

module.exports = rbac;
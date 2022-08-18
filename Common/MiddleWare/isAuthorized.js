
const { StatusCodes } = require("http-status-codes");

var jwt = require('jsonwebtoken');
const User = require("../../modules/Users/Model/UserModel");
const Admin = require("../../modules/Admins/Model/AdminModel");
const rbac = require("../rbac");



module.exports = (endPoint) => {
    return async (req, res, next) => {
        let data;
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            if (token) {
                try {
                    var decode = jwt.verify(token, process.env.SECRET_KEY)
                    const role = decode.role;
                    if (role == "user") {
                        data = await User.findOne({ _id: decode._id })
                    }
                    else if (role == "admin" || role == "superAdmin") {
                        data = await Admin.findOne({ _id: decode._id })
                    } else {
                        res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" })
                    }

                    if (data) {
                        const isAllowed = await rbac.can(data.role, endPoint)
                        if (isAllowed) {
                            req.data = data;
                            next();
                        } else {
                            res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" })
                        }

                    } else {
                        res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" })
                    }
                } catch (error) {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
                }
            } else {
                res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" })
            }
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "UNAUTHORIZED" })
        }
    }

}
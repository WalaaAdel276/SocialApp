const Admin = require("../Model/AdminModel");
const { StatusCodes } = require("http-status-codes");
const paginate = require("../../../Common/Services/paginationService");
const findServices = require("../../../Common/Services/findServices");


exports.getAllAdmins = async (req, res) => {
    let { page, size,search} = req.query
    try {
    const { skip, limit } = paginate(page, size)
    const total = await Admin.count();
    const totalPage = Math.ceil(total / limit);

    const data = await findServices(Admin,skip,limit,search,["name", "email","location"])
     res.status(StatusCodes.OK).json({ message: "Success", skip, limit, totalPage, total, data })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
    }

}





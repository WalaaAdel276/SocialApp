const { StatusCodes } = require("http-status-codes");
const Admin = require("../Model/AdminModel");
const deleteAdmin = async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findOne({ _id: id })
        if (admin) {
            const data = await Admin.deleteOne({ _id: id });
            if (data.deletedCount) {
                res.status(StatusCodes.OK).json({ message: " Admin Deleted successfully", Count: data.deletedCount, id });
            } else {
                res.status(StatusCodes.BAD_REQUEST).json({ message: "Admin Not Found" });
            }

        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Admin Not Found" });
        }


    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error })
        console.log(error);
    }
}
module.exports = deleteAdmin
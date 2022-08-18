const { StatusCodes } = require("http-status-codes");
const Admin = require("../Model/AdminModel");
const { encryptNumber } = require('encrypt-phone-numbers')

const updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, location } = req.body;
    try {
        const admin = await Admin.findOne({ _id: id })
        if (admin) {
            if (phone) {
                phone = encryptNumber(phone, 5, 'X')
            }
            const data = await Admin.updateOne({ _id: id }, { name, email, phone, location });
            if (data.modifiedCount) {
                res.status(StatusCodes.OK).json({ message: " Admin Updated successfully", Count: data.modifiedCount, id });
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
module.exports = updateAdmin
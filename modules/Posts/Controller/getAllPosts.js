const Post = require("../Model/PostModel");
const { StatusCodes } = require("http-status-codes");
const paginate = require("../../../Common/Services/paginationService");
const findServices = require("../../../Common/Services/findServices");


exports.getAllPosts = async (req, res) => {
    let { page, size, search } = req.query
    try {
        const { skip, limit } = paginate(page, size)
        const total = await Post.count();
        const totalPage = Math.ceil(total / limit);
        const data = await findServices(Post, skip, limit, search, ["title", "content"])
        res.status(StatusCodes.OK).json({ message: "Success", skip, limit, totalPage, total, data })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error", error })
        console.log(error);
    }

}
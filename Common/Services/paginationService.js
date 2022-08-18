const paginate = (page, size) => {

    if (!page) {
        page = 1;

    }
    if (!size) {
        size = 10;

    }
    const skip = (page - 1) * size;


    return { skip, limit: size };

}

module.exports = paginate;
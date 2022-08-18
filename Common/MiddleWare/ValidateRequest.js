const { StatusCodes } = require("http-status-codes");
module.exports = (schema) => {
  return (req, res, next) => {
    const validationArr = [];
    ["headers", "params", "query", "body", "file"].forEach((key) => {
      if (schema[key]) {
        const validation = schema[key].validate(req[key]);
        if (validation.error) {
          validationArr.push(validation.error.details[0].message.split('"').join(""))
        }
      }
    });
    if (validationArr.length) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "Error Validation",
        error: validationArr.join()
      })
    } else {
      next();
    }


  }

}

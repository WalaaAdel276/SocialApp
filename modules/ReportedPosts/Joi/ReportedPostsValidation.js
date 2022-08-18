const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
    ReportedPostSchema: {
        body: Joi.object().required().keys({
            reportComment: Joi.string().required().messages({
                'string.base': `"reportComment" should be a type of 'text'`,
                'string.empty': `"reportComment" cannot be an empty field`,
                'any.required': `"reportComment" is a required field`
            }),
            ReportCreator: Joi.objectId().required().messages({
                'string.empty': `"ReportCreator" cannot be an empty field`,
                'any.required': `"ReportCreator" is a required field`
            }),
        }),
        validate: {
            headers: {
                token: Joi.string().required()
            },
            params: {
                ReportedPost: Joi.objectId().required()
            }
        }

    },
    ReviewReportedSchema: {
        validate: {
            headers: {
                token: Joi.string().required()
            },
            params: {
                id: Joi.objectId().required()
            }
        }

    }
}
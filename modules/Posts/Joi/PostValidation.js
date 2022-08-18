const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
    addPostSchema: {
        body: Joi.object().required().keys({
            title: Joi.string().required().messages({
                'string.base': `"Title" should be a type of 'text'`,
                'string.empty': `"Title" cannot be an empty field`,
                'any.required': `"Title" is a required field`
            }),
            content: Joi.string().required().messages({
                'string.base': `"Content" should be a type of 'text'`,
                'string.empty': `"Content" cannot be an empty field`,
                'any.required': `"Content" is a required field`
            }),
            createdBy: Joi.objectId().required().messages({
                'string.base': `"createdBy" should be a type of 'text'`,
                'string.empty': `"createdBy" cannot be an empty field`,
                'any.required': `"createdBy" is a required field`
            }),
        }),
        validate: {
            headers: {
                token: Joi.string().required()
            }
        }

    },
    getAllPostsSchema: {
        validate: {
            headers: {
                token: Joi.string().required()
            },
            query: {
                page: Joi.number().optional().min(1),
                size: Joi.number().optional().min(1),
                search: Joi.string().optional()
            }

        }
    },
    deletePostSchema: {
        validate: {
            headers: {
                token: Joi.string().required()
            }, params: {
                id: Joi.objectId().required()
            },

        },


    },
    editPostSchema: {
        body: Joi.object().required().keys({
            title: Joi.string().required().messages({
                'string.base': `"Title" should be a type of 'text'`,
                'string.empty': `"Title" cannot be an empty field`,
                'any.required': `"Title" is a required field`
            }),
            content: Joi.string().required().messages({
                'string.base': `"Content" should be a type of 'text'`,
                'string.empty': `"Content" cannot be an empty field`,
                'any.required': `"Content" is a required field`
            }),

        }),
        validate: {
            headers: {
                token: Joi.string().required()
            }, params: {
                id: Joi.objectId().required()
            }
        }

    },
    getProfilePostsSchema: {
        validate: {
            headers: {
                token: Joi.string().required()
            },
            params: {
                id: Joi.objectId().required()
            }

        }
    },
}



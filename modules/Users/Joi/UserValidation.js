const Joi = require("joi")
Joi.objectId = require('joi-objectid')(Joi)


module.exports = {
    SignUpSchema: {
        body: Joi.object().required().keys({
            userName: Joi.string().required().messages({
                'string.base': `"Name" should be a type of 'text'`,
                'string.empty': `"Name" cannot be an empty field`,
                'any.required': `"Name" is a required field`
            }),
            email: Joi.string().required().email().messages({
                'string.base': `"Email" should be a type of 'Email'`,
                'string.empty': `"Email" cannot be an empty field`,
                'any.required': `"Email" is a required field`
            }),
            password: Joi.string().trim().required().messages({
                'string.base': `"Password" should be a type of 'text'`,
                'string.empty': `"Password" cannot be an empty field`,
                'any.required': `"Password" is a required field`
            }),
            confirmPassword: Joi.string().trim().valid(Joi.ref('password')).required().messages({ 'any.only': '{{#label}} does not match' }),
            phone: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
                'string.empty': `"Password" cannot be an empty field`,
                'any.required': `"Password" is a required field`
            }),
            location: Joi.string().required().messages({
                'string.base': `"Location" should be a type of 'text'`,
                'string.empty': `"Location" cannot be an empty field`,
                'any.required': `"Location" is a required field`
            }),
            role: Joi.string().optional()


        })

    },
    loginSchema: {
        body: Joi.object().required().keys({
            email: Joi.string().required().email().messages({
                'string.base': `"Email" should be a type of 'Email'`,
                'string.empty': `"Email" cannot be an empty field`,
                'any.required': `"Email" is a required field`
            }),
            password: Joi.string().trim().required().messages({
                'string.base': `"Password" should be a type of 'text'`,
                'string.empty': `"Password" cannot be an empty field`,
                'any.required': `"Password" is a required field`
            }),

        })

    },
    updateProfileSchema: {
        body: Joi.object().required().keys({
            userName: Joi.string().required().messages({
                'string.base': `"Name" should be a type of 'text'`,
                'string.empty': `"Name" cannot be an empty field`,
                'any.required': `"Name" is a required field`
            }),
            email: Joi.string().required().email().messages({
                'string.base': `"Email" should be a type of 'Email'`,
                'string.empty': `"Email" cannot be an empty field`,
                'any.required': `"Email" is a required field`
            }),
            phone: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
                'string.empty': `"Password" cannot be an empty field`,
                'any.required': `"Password" is a required field`
            }),
            location: Joi.string().required().messages({
                'string.base': `"Location" should be a type of 'text'`,
                'string.empty': `"Location" cannot be an empty field`,
                'any.required': `"Location" is a required field`
            }),

        }),
        validate: {
            headers: {
                token: Joi.string().required()
            }
            ,
            params: {
                id: Joi.objectId().required()
            }
        }

    },
    updatePasswordSchema: {
        body: Joi.object().required().keys({
            oldPassword: Joi.string().trim().required().messages({
                'string.base': `"Password" should be a type of 'text'`,
                'string.empty': `"Password" cannot be an empty field`,
                'any.required': `"Password" is a required field`
            }),
            newPassword: Joi.string().trim().required().messages({
                'string.base': `"Password" should be a type of 'text'`,
                'string.empty': `"Password" cannot be an empty field`,
                'any.required': `"Password" is a required field`
            }),
            confirmNewPassword: Joi.string().trim().valid(Joi.ref('newPassword')).required().messages({ 'any.only': '{{#label}} does not match' }),

        }),
        validate: {
            headers: {
                token: Joi.string().required()
            },
            params: {
                id: Joi.objectId().required()
            }
        }
    },
    blockUserSchema: {
        body: Joi.object().required().keys({
            email: Joi.string().required().email().messages({
                'string.base': `"Email" should be a type of 'Email'`,
                'string.empty': `"Email" cannot be an empty field`,
                'any.required': `"Email" is a required field`
            }),

        }),
        validate: {
            headers: {
                token: Joi.string().required()
            }
        }

    },
    forgetPasswordSchema: {
        body: Joi.object().required().keys({
            email: Joi.string().required().email().messages({
                'string.base': `"Email" should be a type of 'Email'`,
                'string.empty': `"Email" cannot be an empty field`,
                'any.required': `"Email" is a required field`
            }),
            newPassword: Joi.string().trim().required().messages({
                'string.base': `"Password" should be a type of 'text'`,
                'string.empty': `"Password" cannot be an empty field`,
                'any.required': `"Password" is a required field`
            }),
            confirmNewPassword: Joi.string().trim().valid(Joi.ref('newPassword')).required().messages({ 'any.only': '{{#label}} does not match' }),

        })

    },
    deactivateAccountSchema: {

        validate: {
            headers: {
                token: Joi.string().required()
            },
            params: {
                id: Joi.objectId().required()
            }
        }

    },
    getAllUsersSchema: {
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
    }
}

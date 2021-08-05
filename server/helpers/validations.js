import Joi from "joi";

// Sign up validation
const signUpValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(4).required(),
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
    });
    const result = schema.validate(data);
    if (result.error) {
        return result.error.message.replace(/"/g,"")
    }
    return result.error
};

// Sign in validation
const signInValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required(),
    }).unknown();
    const result = schema.validate(data);
    if (result.error) {
        return result.error.message.replace(/"/g,"")
    }
    return result.error
};

export { signUpValidation, signInValidation };

import Joi from "joi";
import { resError } from "../../common/joi-validator/index.js";
import _apiparam from "./authApiParams.js";

let authLogin = (req, res, next) => {
const schema = Joi.object(
    {
        [_apiparam.LOGIN_PARAM.EMAIL]: Joi.string().strict().trim().min(1).max(100).required(),

        [_apiparam.LOGIN_PARAM.PASSWORD]: Joi.string().strict().trim().min(1).max(200).required(),
    }
);
let body = req.body;
    let { error } = schema.validate(body);
    if (error) 
    {
        next(resError(error, "Invalid data in request json."));
    } 
    else
    {
        next();
    }
};

let authSignup = (req, res, next) => {
    const schema = Joi.object(
        {
            [_apiparam.SIGNUP_PARAM.USERNAME]: Joi.string().strict().trim().min(1).max(100).required(),
    
            [_apiparam.SIGNUP_PARAM.EMAIL]: Joi.string().strict().trim().min(1).max(200).required(),
            
            [_apiparam.SIGNUP_PARAM.PASSWORD]: Joi.string().strict().trim().min(1).required(),

            [_apiparam.SIGNUP_PARAM.ROLE]: Joi.string().strict().trim().min(1).allow("1","2").required(),

        }
    );
    let body = req.body; 
    let { error } = schema.validate(body);
    if (error)
    {
        next(resError(error, "Invalid data in request json."));
    } 
    else 
    {
        next();
    }
};

export default {
    authLogin,
    authSignup
}
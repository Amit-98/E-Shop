import Joi from "joi";
import { resError } from "../../common/joi-validator/index.js";
import _apiparam from "./adminApiParams.js";

let getStore = (req, res, next) => {
    const schema = Joi.object(
        {
            [_apiparam.GET_STORE.u_id]: Joi.number().required(),
        }
    );
    let body = req.query;
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


let storeApprove = (req, res, next) => {
    const schema = Joi.object(
        {
            [_apiparam.GET_STORE.u_id]: Joi.number().required(),

            [_apiparam.GET_STORE.store_id]: Joi.number().required(),

            [_apiparam.GET_STORE.approve]: Joi.number().required(),
        }
    );
    let body = req.query;
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
    getStore,
    storeApprove
}
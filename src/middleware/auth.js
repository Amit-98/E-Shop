import _queryBuilder from "../version-1/Auth/authQueryBuilder.js";
import _commonMethods from "../common/methods/commonMethods.js";

const fileName = "auth.js"

let authMiddleware = (req, res, next) =>
{
    try
    {
        if (!(req.headers.apikey) || !(req.headers.token))
        {
            next(new Error("apikey and token are required", res));
        }
        else
        {
            try
            {
                _queryBuilder.authMiddleware(req, (err, _result) =>
                {
                    if (_result != null && _result != undefined && _result != "")
                    {
                        next();
                    }
                    else
                    {
                        next(new Error("Authentication failed, please try again", res));
                    }
                });
            }
            catch(err)
            {  
                _commonMethods.saveErrorLog(fileName,authMiddleware.name, err.message, req);
                next(err); 
            }
        }
    }
    catch (err)
    {
        _commonMethods.saveErrorLog(fileName,authMiddleware.name, err.message, req);
        next(err);
    }
}

export default {
    authMiddleware
};
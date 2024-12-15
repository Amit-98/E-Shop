import async from "async";
import _queryBuilder from "./authQueryBuilder.js";
import _commonMethods from "../../common/methods/commonMethods.js";
import _apiParams from "./authApiParams.js";
const fileName = _apiParams.FILENAME.CONTROLLER;

let authSignup = (req, res, next) => {
    try
    {
        async.waterfall([
            function(callback)
            {
                try
                {
                    dfj;
                    _queryBuilder.authCheckEmail(req, (err, _result) =>
                    {
                        if(err)
                        {
                            return next(new Error(err));
                        }
                        try
                        {
                            if(_result!=null && _result!="")
                            {
                                res.s = 1;
                                res.m = "Email already exist";
                                res.r = {};
                                next();
                            }
                            else
                            {
                                callback(null, _result);
                            }
                        }
                        catch(err)
                        {
                            _commonMethods.saveErrorLog(fileName,authSignup.name,err.message,req);
                            next(err);
                        }
                    });
                }
                catch(err)
                {
                    _commonMethods.saveErrorLog(fileName,authSignup.name,err.message,req);
                    next(err);
                }
            },
            function(result, callback)
            {
                try
                {
                    _queryBuilder.authSignup(req, (err, _result) =>
                    {
                        if(err)
                        {
                            return next(new Error(err));
                        }
                        try
                        {
                            if(_result.insertId!=0)
                            {
                                callback(null, _result);
                            }
                            else
                            {
                                res.s = 404;
                                res.m = "Record not found";
                                res.r = {};
                                next();
                            }
                        }
                        catch(err)
                        {
                            _commonMethods.saveErrorLog(fileName,authSignup.name,err.message,req);
                            next(err);
                        }
                    });
                }
                catch(err)
                {
                    _commonMethods.saveErrorLog(fileName,authSignup.name,err.message,req);
                    next(err);
                }
            },
            function(result, callback)
            {
                try
                {
                    if(result)
                    {
                        req.body.user_id = result.insertId;
                        
                        // if(role === 2)
                        // {
                        //     _queryBuilder.admin_access_save(req, (err, _result) =>{
                        //         if(err)
                        //         {
                        //             return next(new Error(err));
                        //         }
                        //         try
                        //         {
                        //             if(!_result)
                        //             {
                        //                 res.s = 404;
                        //                 res.m = "Record not found";
                        //                 res.r = {};
                        //                 next();
                        //             }
                        //         }
                        //         catch(err)
                        //         {
                        //             _commonMethods.saveErrorLog(fileName,authSignup.name,err.message,req);
                        //             next(err);
                        //         }
                        //     });
                        // }
                        _queryBuilder.authSignupToken(req, (err, _result) =>
                        {
                            if(err)
                            {
                                return next(new Error(err));
                            }
                            try
                            {
                                if(_result.insertedId!=0)
                                {
                                    _result.user_id = result.insertId;
                                    callback(null, _result);
                                }
                                else
                                {
                                    res.s = 404;
                                    res.m = "Record not found";
                                    res.r = {};
                                    next();
                                }
                            }
                            catch(err)
                            {
                                _commonMethods.saveErrorLog(fileName,authSignup.name,err.message,req);
                                next(err);
                            }
                        });
                    }
                }
                catch(err)
                {
                    _commonMethods.saveErrorLog(fileName,authSignup.name,err.message,req);
                    next(err);
                }
            },

            function(result, callback)
            {
                let role = parseInt(req.body.ROLE);
                req.body.ROLE = role;
                _queryBuilder.authRole(req,(err, _result)=>{
                    if(err)
                    {
                        return next(new Error(err));
                    }
                    try
                    {
                        if(_result.insertedId!=0)
                        {
                            _result.user_id = result.user_id;
                            callback(null, _result);
                        }
                        else
                        {
                            res.s = 404;
                            res.m = "Record not found";
                            res.r = {};
                            next();
                        }
                    }
                    catch(err)
                    {
                        _commonMethods.saveErrorLog(fileName,authSignup.name,err.message,req);
                        next(err);
                    }                    
                }); 
            },  
            function(result, callback)
            {
                if(result)
                {
                    req.body.user_id = result.user_id;
                    _queryBuilder.authSuccess(req, (err, _result) =>
                    {
                        if(err)
                        {
                            return next(new Error(err));
                        }
                        try
                        {
                            if(_result!=null && _result!="")
                            {
                                callback(null, _result);
                            }
                            else
                            {
                                res.s = 404;
                                res.m = "Record not found";
                                res.r = {};
                                next();
                            }
                        }
                        catch(err)
                        {
                            _commonMethods.saveErrorLog(fileName,authSignup.name,err.message,req);
                            next(err);
                        }
                    });
                }
                else
                {
                    res.s = 404;
                    res.m = "Record not found";
                    res.r = {};
                    next();
                }
            }
        ],
        function(err, _finalResult)
        {
            if(err)
            {
                return next(new Error(err));
            }
            else
            {
                if (_finalResult)
                {
                    res.s = 1;
                    res.m = "Signup Successfully";
                    res.r = _finalResult;
                    next();
                } 
                else
                {
                    res.s = 404;
                    res.m = "Record not found";
                    res.r = {};
                    next();
                }
            }
        });
    }
    catch (err)
    {
        _commonMethods.saveErrorLog(fileName,authSignup.name,err.message,req);
        next(err);
    }
};

let authLogin = (req, res, next) => {
    try 
    {
        async.waterfall([
            function(callback)
            {
                try
                {
                    _queryBuilder.authCheckEmail(req, (err, _result) =>{
                        if(err)
                        {
                            return next(new Error(err));
                        }
                        try
                        {
                            if(_result)
                            {
                               let pass_cehck = _commonMethods.check_password(_result.PASSWORD, req.body.PASSWORD);
                               if(pass_cehck)
                               {
                                    callback(null, _result)
                               }
                               else
                               {
                                    res.s = 400;
                                    res.m = "Please enter valid crendential";
                                    res.r = {};
                                    next();
                               }
                            }
                            else
                            {
                                res.s = 400;
                                res.m = "Please enter valid crendential";
                                res.r = {};
                                next();
                            }
                        }
                        catch(err)
                        {
                            _commonMethods.saveErrorLog(fileName,authLogin.name,err.message,req);
                            next(err);
                        }
                    });
                }
                catch(err)
                {
                    _commonMethods.saveErrorLog(fileName,authLogin.name,err.message,req);
                    next(err);
                }
            },
            function(result, callback)
            {
                try
                {
                    req.body.user_id = result.USER_ID;
                    _queryBuilder.authSuccess(req, (err, _result) =>{
                        if(err)
                        {
                            return next(new Error(err));
                        }
                        try
                        {
                            if(_result)
                            {
                                callback(null, _result);
                            }
                            else
                            {
                                res.s = 404;
                                res.m = "Rocord not found";
                                res.r = {};
                                next();
                            }
                        }
                        catch(err)
                        {
                            _commonMethods.saveErrorLog(fileName,authLogin.name,err.message,req);
                            next(err);
                        }
                    });
                }
                catch(err)
                {
                    _commonMethods.saveErrorLog(fileName,authLogin.name,err.message,req);
                    next(err);
                }
            },
        ],
        function(err, _finalResult)
        {
            if(err)
            {
                return next(new Error(err));
            }
            else
            {
                if (_finalResult) 
                {
                    res.s = 1;
                    res.m = "Login successfully";
                    res.r = _finalResult;
                    next();
                } 
                else
                {
                    res.s = 404;
                    res.m = "Record not found";
                    res.r = {};
                    next();
                }
            }
        });
    }
    catch (err) 
    {
        _commonMethods.saveErrorLog(fileName,authLogin.name,err.message,req);
        next(err);
    }
};

export default {
    authSignup,
    authLogin
}
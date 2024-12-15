import async from "async";
import _queryBuilder from "./adminQueryBuilder.js";
import _commonMethods from "../../common/methods/commonMethods.js";
import _apiParams from "./adminApiParams.js";
import _apiParam from "./adminApiParams.js";
const fileName = _apiParam.FILENAME.CONTROLLER;

let getStoreDetails = (req, res, next) =>
{
    try
    {
        async.waterfall([
            function(callback)
            {
                try
                {
                    _queryBuilder.getStoreDetails(req, (err, _result) =>
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
                            _commonMethods.saveErrorLog(fileName,getStoreDetails.name,err.message,req);
                            next(err);
                        }
                    });
                }
                catch(err)
                {
                    _commonMethods.saveErrorLog(fileName,getStoreDetails.name,err.message,req);
                    next(err);
                }
            },
            function(_result, callback)
            {
                try
                {
                    if(_result.is_admin_approval == 1)
                    {
                        let test = [
                            {
                                store:1,
                            },
                            {
                                store:2,
                            },
                            {
                                store:3,
                            }
                        ]
                        _result.store_details = test;
                        callback(null, _result);
                    }
                    else
                    {
                        _result.store_details = [];
                        callback(null, _result);
                    }
                }
                catch(err)
                {
                    _commonMethods.saveErrorLog(fileName,getStoreDetails.name,err.message,req);
                    next(err);
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
                if(_finalResult!=null && _finalResult!="")
                {
                    res.s = 1;
                    res.m = "Success";
                    res.r = _finalResult;
                    next();
                }
                else
                {
                    res.s = 404;
                    res.m = "Record not found.";
                    res.r = {};
                    next();
                }
            }
        })
    }
    catch(err)
    {
        _commonMethods.saveErrorLog(fileName,getStoreDetails.name,err.message,req);
        next(err);
    }
};

let storeApprove = (req, res, next) =>
    {
        try
        {
            async.waterfall([
                function(callback)
                {
                    try
                    {
                        _queryBuilder.storeApprove(req, (err, _result) =>
                        {
                            if(err)
                            {
                                return next(new Error(err));
                            }
                            try
                            {
                                if(_result.affectedRows > 0)
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
                                _commonMethods.saveErrorLog(fileName,getStoreDetails.name,err.message,req);
                                next(err);
                            }
                        });
                    }
                    catch(err)
                    {
                        _commonMethods.saveErrorLog(fileName,getStoreDetails.name,err.message,req);
                        next(err);
                    }
                },
                function(_result, callback)
                {
                    try
                    {
                        _queryBuilder.getStoreDetails(req, (err, _result) =>
                        {
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
                                    res.m = "Record not found";
                                    res.r = {};
                                    next();
                                }
                            }
                            catch(err)
                            {
                                _commonMethods.saveErrorLog(fileName,getStoreDetails.name,err.message,req);
                                next(err);
                            }
                        });
                    }
                    catch(err)
                    {
                        _commonMethods.saveErrorLog(fileName,getStoreDetails.name,err.message,req);
                        next(err);
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
                    if(_finalResult!=null && _finalResult!="")
                    {
                        res.s = 1;
                        res.m = "Success";
                        res.r = _finalResult;
                        next();
                    }
                    else
                    {
                        res.s = 404;
                        res.m = "Record not found.";
                        res.r = {};
                        next();
                    }
                }
            })
        }
        catch(err)
        {
            _commonMethods.saveErrorLog(fileName,getStoreDetails.name,err.message,req);
            next(err);
        }
};


export default {
    getStoreDetails,
    storeApprove
}
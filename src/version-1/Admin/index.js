import r from "express";
const route = r();
import _adminValidator from "./adminReqValidator.js";
import _adminController from  "./adminController.js";
 
 route.get(
    "/getstore",
    _adminValidator.getStore,
    _adminController.getStoreDetails
 );

 route.get(
    "/store-approve",
    _adminValidator.storeApprove,
    _adminController.storeApprove
 );
 
 export default route;
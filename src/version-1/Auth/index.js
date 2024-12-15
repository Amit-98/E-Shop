import r from "express";
const route = r();
import _authValidator from "./authReqValidator.js";
import _authController from  "./authController.js";

route.post(
   "/login",
   _authValidator.authLogin,
   _authController.authLogin
);

route.post(
   "/signup",
   _authValidator.authSignup,
   _authController.authSignup
);

export default route;
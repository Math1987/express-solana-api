"use strict";
exports.__esModule = true;
var express_1 = require("express");
var user_controller_1 = require("../controller/user.controller");
var route = (0, express_1.Router)();
/**
 * need a signature of a message and a publicKey to attest that the user is the owner of the account solana
 * if correct, send back a token, save it on db with associated values like address
 */
route.post('/connect', user_controller_1.connect);
/**
 * read the authorization token in header and verify if this is a valid token in db
 * if yes, continue the routes, else sens codeStatus 401
 */
//@ts-ignore
route.use(user_controller_1.verifyAuthorization);
//@ts-ignore
route.get('/get', user_controller_1.get);
//@ts-ignore
route.post('/update', user_controller_1.update);
//@ts-ignore
route.post('/remove', user_controller_1.remove);
exports["default"] = route;

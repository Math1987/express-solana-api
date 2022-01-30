"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var user_controller_1 = require("../controller/user.controller");
var user_controller_2 = require("./../controller/user.controller");
var express_session_1 = __importDefault(require("express-session"));
var route = (0, express_1.Router)();
route.use((0, express_session_1["default"])({
    secret: "YOURAPISECRE",
    saveUninitialized: false,
    resave: false
}));
route.use(user_controller_2.useSession);
route.get('/createMessage', user_controller_1.createMessage);
route.post('/signMessage', user_controller_1.signMessage);
//create a midewear to automaticly add the datas of the user feching in DB if isAuth = true in cookies
route.get('/get', user_controller_1.get);
route.post('/update', user_controller_1.update);
route.post('/remove', user_controller_1.remove);
exports["default"] = route;

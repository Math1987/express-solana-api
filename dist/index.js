"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var index_data_1 = require("./datas/index.data");
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var environment_1 = __importDefault(require("./environment"));
var express_1 = __importDefault(require("express"));
var user_route_1 = __importDefault(require("./routes/user.route"));
var message_route_1 = __importDefault(require("./routes/message.route"));
(0, index_data_1.init)();
var app = (0, express_1["default"])();
var corsOptions = {
    origin: environment_1["default"].clientURL
};
app.use((0, cors_1["default"])());
app.use(body_parser_1["default"].json());
app.use(body_parser_1["default"].urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.status(200).send('Welcom to my Solana API.');
});
app.use(message_route_1["default"]);
app.use("/user", user_route_1["default"]);
if (environment_1["default"].mode === "dev") {
    app.listen(17000);
}
exports["default"] = app;

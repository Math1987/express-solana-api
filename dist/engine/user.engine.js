"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.removeUser = exports.udpateUser = exports.getUserFromToken = exports.connect = void 0;
var user_data_1 = require("../datas/user.data");
var solana_engine_1 = require("./solana.engine");
var message_engine_1 = require("./message.engine");
var jwt_config_1 = require("../config/jwt.config");
var message_data_1 = require("./../datas/message.data");
/**
 * connect by reading a signed message by the user
 *
 * WARNING !! the nonce security is enabled but connection can be done without nonce actualy
 *
 *
 * @param address
 * @param signedMessage
 * @returns
 */
var connect = function (address, signedMessage) { return __awaiter(void 0, void 0, void 0, function () {
    var messages, verified, _i, messages_1, o, m, messageSample, token, user, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 10, , 11]);
                return [4 /*yield*/, (0, message_data_1.readByAddress)(address)];
            case 1:
                messages = _a.sent();
                verified = false;
                for (_i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                    o = messages_1[_i];
                    m = o.message.replace(/\\n/g, '\n');
                    verified = (0, solana_engine_1.verifyMessage)(address, signedMessage, m);
                    if (verified) {
                        break;
                    }
                }
                if (!!verified) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, message_engine_1.getMessageSample)()];
            case 2:
                messageSample = _a.sent();
                return [4 /*yield*/, (0, solana_engine_1.verifyMessage)(address, signedMessage, messageSample)];
            case 3:
                verified = _a.sent();
                _a.label = 4;
            case 4:
                if (!verified) return [3 /*break*/, 8];
                token = (0, jwt_config_1.createToken)({ address: address });
                return [4 /*yield*/, (0, user_data_1.readOneByAddress)(address)];
            case 5:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, user_data_1.create)({ address: address })];
            case 6:
                user = _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/, {
                    user: user,
                    token: token
                }];
            case 8: throw Error("Fail verifying message.");
            case 9: return [3 /*break*/, 11];
            case 10:
                e_1 = _a.sent();
                throw Error("Fail connecting message.");
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.connect = connect;
var getUserFromToken = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var datas, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, jwt_config_1.readToken)(token)];
            case 1:
                datas = _a.sent();
                return [4 /*yield*/, (0, user_data_1.readOneByAddress)(datas.address)];
            case 2:
                user = _a.sent();
                return [2 /*return*/, user];
        }
    });
}); };
exports.getUserFromToken = getUserFromToken;
var udpateUser = function (user, messageSignature, datas) { return __awaiter(void 0, void 0, void 0, function () {
    var message, verified, newUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, message_engine_1.getMessageSample)(1)];
            case 1:
                message = _a.sent();
                return [4 /*yield*/, (0, solana_engine_1.verifyMessage)(user.address, messageSignature, message)];
            case 2:
                verified = _a.sent();
                if (!verified) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, user_data_1.updateOne)(user === null || user === void 0 ? void 0 : user._id, datas)];
            case 3:
                newUser = _a.sent();
                return [2 /*return*/, newUser];
            case 4: return [2 /*return*/, false];
        }
    });
}); };
exports.udpateUser = udpateUser;
var removeUser = function (user, messageSignature) { return __awaiter(void 0, void 0, void 0, function () {
    var message, verified;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, message_engine_1.getMessageSample)(2)];
            case 1:
                message = _a.sent();
                return [4 /*yield*/, (0, solana_engine_1.verifyMessage)(user.address, messageSignature, message)];
            case 2:
                verified = _a.sent();
                if (!verified) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, user_data_1.removeOne)(user._id)];
            case 3:
                _a.sent();
                return [2 /*return*/, true];
            case 4: return [2 /*return*/, false];
        }
    });
}); };
exports.removeUser = removeUser;

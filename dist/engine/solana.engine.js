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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.readAndVerifySimpleTransferTransaction = exports.readAddressFromTransaction = exports.readSimpleTransferTransaction = exports.connect = exports.connection = void 0;
var web3_js_1 = require("@solana/web3.js");
var environment_1 = __importDefault(require("../environment"));
var connect = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Connect on solana cluster', environment_1["default"].solana.cluster);
                return [4 /*yield*/, new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)(environment_1["default"].solana.cluster))];
            case 1: return [2 /*return*/, exports.connection = _a.sent()];
        }
    });
}); };
exports.connect = connect;
/**
 * Read and decode a simple transfer transaction
 * @param signature string
 * @returns an object containing basic needed infos as ammount, paer, receiver and time
 */
var readSimpleTransferTransaction = function (signature) { return __awaiter(void 0, void 0, void 0, function () {
    var transac;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, exports.connection.getTransaction(signature)];
            case 1:
                transac = _c.sent();
                return [2 /*return*/, {
                        ammount: (((_a = transac === null || transac === void 0 ? void 0 : transac.meta) === null || _a === void 0 ? void 0 : _a.postBalances[1]) - ((_b = transac === null || transac === void 0 ? void 0 : transac.meta) === null || _b === void 0 ? void 0 : _b.preBalances[1])) / web3_js_1.LAMPORTS_PER_SOL,
                        payer: transac === null || transac === void 0 ? void 0 : transac.transaction.message.accountKeys[0].toString(),
                        receiver: transac === null || transac === void 0 ? void 0 : transac.transaction.message.accountKeys[1].toString(),
                        time: transac === null || transac === void 0 ? void 0 : transac.blockTime
                    }];
        }
    });
}); };
exports.readSimpleTransferTransaction = readSimpleTransferTransaction;
var readAddressFromTransaction = function (signature, time) {
    if (time === void 0) { time = environment_1["default"].solana.transactions["default"].time; }
    return __awaiter(void 0, void 0, void 0, function () {
        var transac;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.connection.getTransaction(signature)];
                case 1:
                    transac = _a.sent();
                    if ((Math.floor((Date.now() / 1000) - (transac === null || transac === void 0 ? void 0 : transac.blockTime))) <= time) {
                        return [2 /*return*/, transac === null || transac === void 0 ? void 0 : transac.transaction.message.accountKeys[0].toString()];
                    }
                    else {
                        throw Error('The transaction is not valid.');
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.readAddressFromTransaction = readAddressFromTransaction;
/**
 * Verify if the transaction respect the conditions of ammount, time and addresses
 * By default, the transaction shoul re
 * @param transaction SimpleTransferTransaction
 * @returns
 */
var readAndVerifySimpleTransferTransaction = function (signature, ammount, receiver, time) {
    if (ammount === void 0) { ammount = environment_1["default"].solana.transactions["default"].ammount; }
    if (receiver === void 0) { receiver = environment_1["default"].solana.transactions["default"].receiver; }
    if (time === void 0) { time = environment_1["default"].solana.transactions["default"].time; }
    return __awaiter(void 0, void 0, void 0, function () {
        var transac;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, exports.readSimpleTransferTransaction)(signature)];
                case 1:
                    transac = _a.sent();
                    if (transac.ammount === ammount &&
                        transac.receiver === receiver &&
                        (Math.floor((Date.now() / 1000) - transac.time)) <= time) {
                        return [2 /*return*/, transac];
                    }
                    else {
                        throw Error('The transaction is not valid.');
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.readAndVerifySimpleTransferTransaction = readAndVerifySimpleTransferTransaction;

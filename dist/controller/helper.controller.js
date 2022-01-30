"use strict";
exports.__esModule = true;
exports.preparBodyForSend = exports.isMongoId = exports.isPseudo = exports.isSolanaTransactionSignature = exports.isSolanaAddress = exports.gotBody = void 0;
// import { PublicKey, Transaction } from "@solana/web3.js" ;
var mongodb_1 = require("mongodb");
/**
 * NOTE : THOSES HELPERS SHOULD BE UPGRATED !
 */
var gotBody = function (object) {
    return (typeof object === "object" && object.body) ? true : false;
};
exports.gotBody = gotBody;
//WAIT UPDATE FOR MORE PRECISIONS
var isSolanaAddress = function (value) {
    return (typeof value === "string" && value.length >= 32 && value.length <= 44) ? true : false;
};
exports.isSolanaAddress = isSolanaAddress;
//WAIT UPDATE FOR MORE PRECISIONS
var isSolanaTransactionSignature = function (value) {
    return (typeof value === "string" && value.length >= 64 && value.length <= 512) ? true : false;
};
exports.isSolanaTransactionSignature = isSolanaTransactionSignature;
var isPseudo = function (value) {
    return (typeof value === "string" && value.length <= 56) ? true : false;
};
exports.isPseudo = isPseudo;
var isMongoId = function (value) {
    return mongodb_1.ObjectId.isValid(value);
};
exports.isMongoId = isMongoId;
var preparBodyForSend = function (object) {
    if (object['_id'] && object['_id'] instanceof mongodb_1.ObjectId) {
        object['_id'] = object['_id'].toString();
    }
    return object;
};
exports.preparBodyForSend = preparBodyForSend;

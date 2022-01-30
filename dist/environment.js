"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var clientURL = ['http://localhost:4200', 'http://localhost:17000'];
var environment = {
    mode: "dev",
    db: "mongodb://localhost:27017/mydbtest",
    port: 17000,
    clientURL: __spreadArray([], clientURL, true),
    solana: {
        cluster: "devnet",
        address: "FfYeVASAm2nDzcC5ckorecT1u8ybFwrCZnMi8sXrtf3P",
        transactions: {
            "default": {
                ammount: 0.01,
                receiver: "FfYeVASAm2nDzcC5ckorecT1u8ybFwrCZnMi8sXrtf3P",
                time: 30000
            }
        }
    }
};
if (process.env.MODE === "prod") {
    environment.clientURL = ["http://mywebsite.com", "https://mywebsite.com"];
    environment.mode = "prod";
    environment.db = "mongodb+srv://User:Password@cluster.any.mongodb.net/mydb?retryWrites=true&w=majority";
    environment.solana.cluster = "mainnet-beta";
}
if (process.env.CLIENT_URL) {
    environment.clientURL = JSON.parse(process.env.CLIENT_URL);
}
exports["default"] = environment;

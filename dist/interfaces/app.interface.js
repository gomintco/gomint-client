"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = exports.KeyType = void 0;
var KeyType;
(function (KeyType) {
    KeyType["ED25519"] = "ed25519";
    KeyType["ECDSA"] = "ecdsa";
})(KeyType || (exports.KeyType = KeyType = {}));
var Network;
(function (Network) {
    Network["MAINNET"] = "mainnet";
    Network["TESTNET"] = "testnet";
})(Network || (exports.Network = Network = {}));

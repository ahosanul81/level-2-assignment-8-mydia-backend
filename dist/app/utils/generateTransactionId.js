"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTransactionId = void 0;
const generateTransactionId = () => {
    return ("TXN" + "_" + Date.now().toString(36) + Math.random().toString(36).substr(2));
};
exports.generateTransactionId = generateTransactionId;

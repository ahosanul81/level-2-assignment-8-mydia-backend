"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyParser = void 0;
const bodyParser = (req, res, next) => {
    try {
        req.body = JSON.parse(req.body.data);
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.bodyParser = bodyParser;

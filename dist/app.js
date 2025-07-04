"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./app/modules/user/user.route"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const globalErrorHandle_1 = require("./app/errorHandle/globalErrorHandle");
const auth_router_1 = __importDefault(require("./app/modules/auth/auth.router"));
const category_route_1 = __importDefault(require("./app/modules/category/category.route"));
const idea_route_1 = __importDefault(require("./app/modules/idea/idea.route"));
const comment_route_1 = __importDefault(require("./app/modules/comment/comment.route"));
const vote_route_1 = __importDefault(require("./app/modules/vote/vote.route"));
const payment_route_1 = __importDefault(require("./app/modules/payment/payment.route"));
// import paymentRouter from "./app/modules/payment/payment.route";
const app = (0, express_1.default)();
// middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("Mydia server is running");
});
app.use("/api/v1/users", user_route_1.default);
app.use("/api/v1/auth", auth_router_1.default);
app.use("/api/v1/categories", category_route_1.default);
app.use("/api/v1/ideas", idea_route_1.default);
app.use("/api/v1/comments", comment_route_1.default);
app.use("/api/v1/votes", vote_route_1.default);
app.use("/api/v1/payment", payment_route_1.default);
app.use(globalErrorHandle_1.globalErrorHandle);
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: "API not found",
        errorSources: [
            { path: req.originalUrl, message: "Your requested path not found" },
        ],
    });
});
exports.default = app;

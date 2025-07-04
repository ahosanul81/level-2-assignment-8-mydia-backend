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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const payment_service_1 = require("./payment.service");
const config_1 = __importDefault(require("../../../config"));
const paymentPgae = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ideaId, memberId } = req.params;
    const result = yield payment_service_1.paymentService.paymentPage(ideaId, memberId, req.body);
    //   res.redirect(result);
    res.status(200).json({ url: result === null || result === void 0 ? void 0 : result.GatewayPageURL });
}));
const paymentValidate = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { val_id } = req.params;
    const result = yield payment_service_1.paymentService.paymentValidation(val_id);
    //   res.redirect(result);
    res.status(200).json({ payment: "success" });
}));
const paymentSuccess = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const { val_id } = req.body;
    // console.log(val_id);
    const response = yield fetch(`${config_1.default.base_url}/payment/validate/${val_id}`);
    const validation = yield response.json();
    if (validation.payment === "success") {
        const updatePaymentInfoIntoDB = yield payment_service_1.paymentService.paymentSuccess(req.body);
        res.redirect(`${config_1.default.base_url_front_end}/payment/payment-success?status=success&message=Payment successful`);
        res.status(200).json(validation);
    }
    // res.status(200).json({ data: req.body });
}));
const paymentFail = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ data: req.body });
}));
const paymentCancel = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ data: req.body });
}));
const getAllPaymentCompleted = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.paymentService.getAllPaymentCompletedIntoDB();
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Completed payment fetched successfully",
        data: result,
    });
}));
exports.paymentController = {
    paymentPgae,
    paymentValidate,
    paymentFail,
    paymentCancel,
    paymentSuccess,
    getAllPaymentCompleted,
};

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
exports.paymentService = void 0;
const client_1 = require("@prisma/client");
const generateTransactionId_1 = require("../../utils/generateTransactionId");
const prisma_1 = require("../../utils/prisma");
const idea_utils_1 = require("../idea/idea.utils");
const AppError_1 = require("../../utils/AppError");
const config_1 = __importDefault(require("../../../config"));
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = "ideah68337b25e9f9a";
const store_passwd = "ideah68337b25e9f9a@ssl";
const is_live = false; //true for live, false for sandbox
const paymentPage = (ideaId, memberId, paymentIngo) => __awaiter(void 0, void 0, void 0, function* () {
    const idea = yield (0, idea_utils_1.isExistIdea)(ideaId);
    const { title, problemStatement, isPaid, price, categoryId } = idea;
    const category = yield prisma_1.prisma.category.findUnique({
        where: { id: categoryId },
        select: {
            categoryName: true,
        },
    });
    const member = yield prisma_1.prisma.member.findUnique({
        where: { id: memberId },
        select: {
            id: true,
            name: true,
            email: true,
            address: true,
            contactNumber: true,
        },
    });
    const data = {
        total_amount: idea.isPaid && price,
        currency: "BDT",
        tran_id: (0, generateTransactionId_1.generateTransactionId)(),
        success_url: `${config_1.default.base_url}/payment/success`,
        fail_url: `${config_1.default.base_url}/payment/fail`,
        cancel_url: `${config_1.default.base_url}/payment/cancel`,
        ipn_url: `${config_1.default.base_url}/ssl-payment-notification`,
        shipping_method: "Courier",
        product_name: title,
        product_category: (category === null || category === void 0 ? void 0 : category.categoryName) || "General",
        product_profile: "general",
        cus_name: (member === null || member === void 0 ? void 0 : member.name) || "Test Customer",
        cus_email: (member === null || member === void 0 ? void 0 : member.email) || "test@example.com",
        cus_add1: (member === null || member === void 0 ? void 0 : member.address) || "Customer Address",
        cus_add2: "Dhaka", // ✅ Required
        cus_city: "Dhaka",
        cus_state: "Dhaka", // ✅ Required
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: (member === null || member === void 0 ? void 0 : member.contactNumber) || "01711111111",
        cus_fax: "01711111111", // ✅ Required
        value_a: member === null || member === void 0 ? void 0 : member.name,
        value_b: member === null || member === void 0 ? void 0 : member.email,
        value_c: member === null || member === void 0 ? void 0 : member.id,
        value_d: ideaId,
        ship_name: "Redx",
        ship_add1: "Dhaka", // ✅ Required
        ship_add2: "Dhaka", // ✅ Required
        ship_city: "Dhaka", // ✅ Required
        ship_state: "Dhaka", // ✅ Required
        ship_postcode: "1000", // ✅ Required
        ship_country: "Bangladesh", // ✅ Required
        multi_card_name: "mastercard", // Optional, but good for card support
    };
    // console.log(data);
    const sslcommerz = new SSLCommerzPayment(store_id, store_passwd, is_live); //true for live default false for sandbox
    const sslData = yield sslcommerz.init(data);
    // console.log(sslData);
    return sslData;
});
const paymentValidation = (val_id) => __awaiter(void 0, void 0, void 0, function* () {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const validate = yield sslcz.validate({ val_id });
    return validate;
});
const paymentSuccess = (paymentInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const memberId = paymentInfo.value_c;
    const ideaId = paymentInfo.value_d;
    // console.log(paymentInfo);
    // Ensure the user exists
    const memberExists = yield prisma_1.prisma.member.findUnique({
        where: { id: memberId },
    });
    if (!memberExists) {
        throw new Error("Invalid memberId: user does not exist");
    }
    const data = {
        memberId,
        ideaId,
        status: client_1.PaymentStatus.paid,
        paymentGatewayData: paymentInfo,
    };
    const result = yield prisma_1.prisma.payment.create({ data });
    return result;
});
const getAllPaymentCompletedIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.payment.findMany({
        include: {
            idea: {
                select: {
                    id: true,
                    title: true,
                    category: {
                        select: {
                            id: true,
                            categoryName: true,
                        },
                    },
                },
            },
            member: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
    if (!result) {
        throw new AppError_1.AppError(404, "No payment found");
    }
    const trimmedResult = result === null || result === void 0 ? void 0 : result.map((payment) => {
        const { amount, bank_tran_id } = payment.paymentGatewayData;
        return Object.assign(Object.assign({}, payment), { paymentGatewayData: {
                amount,
                bank_tran_id,
            } });
    });
    return trimmedResult;
});
exports.paymentService = {
    paymentPage,
    paymentValidation,
    paymentSuccess,
    getAllPaymentCompletedIntoDB,
};

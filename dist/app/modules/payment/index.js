"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = "<your_store_id>";
const store_passwd = "<your_store_password>";
const is_live = false; //true for live, false for sandbox
const express_1 = __importDefault(require("express"));
const app = express_1.default.Router();
//sslcommerz init
app.get("/init", (req, res) => {
    const data = {
        total_amount: 100,
        currency: "BDT",
        tran_id: "REF123", // use unique tran_id for each api call
        success_url: "http://localhost:3000/api/v1/payment/success",
        fail_url: "http://localhost:3000/api/v1/payment/fail",
        cancel_url: "http://localhost:3000/api/v1/payment/cancel",
        ipn_url: "http://localhost:3000/api/v1/payment/ipn",
        shipping_method: "Courier",
        product_name: "Computer.",
        product_category: "Electronic",
        product_profile: "general",
        cus_name: "Customer Name",
        cus_email: "customer@example.com",
        cus_add1: "Dhaka",
        cus_add2: "Dhaka",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: "01711111111",
        cus_fax: "01711111111",
        ship_name: "Customer Name",
        ship_add1: "Dhaka",
        ship_add2: "Dhaka",
        ship_city: "Dhaka",
        ship_state: "Dhaka",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then((apiResponse) => {
        // Redirect the user to payment gateway
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.status(200).json(GatewayPageURL);
    });
});
app.get("/success", (req, res) => {
    const data = {
        val_id: "ADGAHHGDAKJ456454", //that you go from sslcommerz response
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.validate(data).then((data) => {
        //process the response that got from sslcommerz
        // https://developer.sslcommerz.com/doc/v4/#order-validation-api
        return data;
    });
});

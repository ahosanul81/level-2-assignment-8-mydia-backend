import { PaymentStatus } from "@prisma/client";

import { generateTransactionId } from "../../utils/generateTransactionId";
import { prisma } from "../../utils/prisma";
import { isExistIdea } from "../idea/idea.utils";
import { AppError } from "../../utils/AppError";
import config from "../../../config";

const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = "ideah68337b25e9f9a";
const store_passwd = "ideah68337b25e9f9a@ssl";
const is_live = false; //true for live, false for sandbox

const paymentPage = async (
  ideaId: string,
  memberId: string,
  paymentIngo: any
) => {
  const idea = await isExistIdea(ideaId);
  const { title, problemStatement, isPaid, price, categoryId } = idea;
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    select: {
      categoryName: true,
    },
  });
  const member = await prisma.member.findUnique({
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
    tran_id: generateTransactionId(),

    success_url: `${config.base_url}/payment/success`,
    fail_url: `${config.base_url}/payment/fail`,
    cancel_url: `${config.base_url}/payment/cancel`,
    ipn_url: `${config.base_url}/ssl-payment-notification`,

    shipping_method: "Courier",
    product_name: title,
    product_category: category?.categoryName || "General",
    product_profile: "general",

    cus_name: member?.name || "Test Customer",
    cus_email: member?.email || "test@example.com",
    cus_add1: member?.address || "Customer Address",
    cus_add2: "Dhaka", // ✅ Required
    cus_city: "Dhaka",
    cus_state: "Dhaka", // ✅ Required
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: member?.contactNumber || "01711111111",
    cus_fax: "01711111111", // ✅ Required
    value_a: member?.name,
    value_b: member?.email,
    value_c: member?.id,
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
  const sslData = await sslcommerz.init(data);
  // console.log(sslData);

  return sslData;
};
const paymentValidation = async (val_id: string) => {
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  const validate = await sslcz.validate({ val_id });
  return validate;
};

const paymentSuccess = async (paymentInfo: any) => {
  const memberId = paymentInfo.value_c;
  const ideaId = paymentInfo.value_d;
  // console.log(paymentInfo);
  // Ensure the user exists
  const memberExists = await prisma.member.findUnique({
    where: { id: memberId },
  });

  if (!memberExists) {
    throw new Error("Invalid memberId: user does not exist");
  }

  const data = {
    memberId,
    ideaId,
    status: PaymentStatus.paid,
    paymentGatewayData: paymentInfo,
  };

  const result = await prisma.payment.create({ data });
  return result;
};
const getAllPaymentCompletedIntoDB = async () => {
  const result = await prisma.payment.findMany({
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
    throw new AppError(404, "No payment found");
  }
  const trimmedResult = result?.map((payment) => {
    const { amount, bank_tran_id } = payment.paymentGatewayData as {
      amount: string;
      bank_tran_id: string;
    };
    return {
      ...payment,
      paymentGatewayData: {
        amount,
        bank_tran_id,
      },
    };
  });

  return trimmedResult;
};

const getPaymentStatusFromDB = async (ideaId: string, memberId: string) => {
  const result = await prisma.payment.findMany({
    where: { ideaId, memberId },
    select: {
      id: true,
      ideaId: true,
      memberId: true,
      status: true,
    },
  });
  return result;
};

export const paymentService = {
  paymentPage,
  paymentValidation,
  paymentSuccess,
  getAllPaymentCompletedIntoDB,
  getPaymentStatusFromDB,
};

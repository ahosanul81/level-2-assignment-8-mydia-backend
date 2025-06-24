import { catchAsync } from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import config from "../../../config";

const paymentPgae = catchAsync(async (req, res) => {
  const { ideaId, memberId } = req.params;
  const result = await paymentService.paymentPage(ideaId, memberId, req.body);
  //   res.redirect(result);
  res.status(200).json({ url: result?.GatewayPageURL });
});
const paymentValidate = catchAsync(async (req, res) => {
  const { val_id } = req.params;

  const result = await paymentService.paymentValidation(val_id);
  //   res.redirect(result);

  res.status(200).json({ payment: "success" });
});

const paymentSuccess = catchAsync(async (req, res) => {
  // console.log(req.body);
  const { val_id } = req.body;
  // console.log(val_id);

  const response = await fetch(
    `http://localhost:5000/api/v1/payment/validate/${val_id}`
  );
  const validation = await response.json();
  if (validation.payment === "success") {
    const updatePaymentInfoIntoDB = await paymentService.paymentSuccess(
      req.body
    );
    res.redirect(
      `http://localhost:3000/payment/payment-success?status=success&message=Payment successful`
    );
    res.status(200).json(validation);
  }

  // res.status(200).json({ data: req.body });
});

const paymentFail = catchAsync(async (req, res) => {
  res.status(200).json({ data: req.body });
});
const paymentCancel = catchAsync(async (req, res) => {
  res.status(200).json({ data: req.body });
});

const getAllPaymentCompleted = catchAsync(async (req, res) => {
  const result = await paymentService.getAllPaymentCompletedIntoDB();

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Completed payment fetched successfully",
    data: result,
  });
});
export const paymentController = {
  paymentPgae,
  paymentValidate,
  paymentFail,
  paymentCancel,
  paymentSuccess,
  getAllPaymentCompleted,
};

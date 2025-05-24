import { catchAsync } from "../../utils/catchAsync";
import { categoryService } from "./category.service";

const createCategory = catchAsync(async (req, res) => {
  const result = await categoryService.createCategoryIntoDB(req.body);

  res.status(200).json({
    statusCode: 200,
    message: "Member created successfully",
    data: result,
  });
});
export const categoryController = { createCategory };

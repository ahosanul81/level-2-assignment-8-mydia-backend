import { catchAsync } from "../../utils/catchAsync";
import { categoryService } from "./category.service";

const getAllCategory = catchAsync(async (req, res) => {
  const result = await categoryService.getAllCategoryFromDB();

  res.status(200).json({
    statusCode: 200,
    message: "Category fetched successfully",
    data: result,
  });
});
const createCategory = catchAsync(async (req, res) => {
  const result = await categoryService.createCategoryIntoDB(req.body);

  res.status(200).json({
    statusCode: 200,
    message: "Category created successfully",
    data: result,
  });
});
export const categoryController = { getAllCategory, createCategory };

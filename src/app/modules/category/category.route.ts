import express from "express";
import { categoryController } from "./category.controller";

const categoryRouter = express.Router();

categoryRouter.post("/create-category", categoryController.createCategory);

export default categoryRouter;

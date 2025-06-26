import { IdeaStatus } from "@prisma/client";
import { IFile } from "../../interface/fileType";
import { catchAsync } from "../../utils/catchAsync";
import { TIdea, TQueryFilters } from "./idea.interface";
import { ideaService } from "./idea.service";

const getAllIdea = catchAsync(async (req, res) => {
  const result = await ideaService.getAllIdeaFromDB(req.query as TQueryFilters);

  res.status(200).json({
    statusCode: 200,
    message: "fetched all idea successfully",
    meta: result.meta,
    data: result.result,
  });
});
const getIdeaById = catchAsync(async (req, res) => {
  const result = await ideaService.getIdeaByIdFromDB(req.params.ideaId);

  res.status(200).json({
    statusCode: 200,
    message: "fetched  idea by id successfully",
    data: result,
  });
});
const addIdea = catchAsync(async (req, res) => {
  const files = req.files;
  const result = await ideaService.addIdeaIntoDB(files as IFile[], req.body);

  res.status(200).json({
    statusCode: 200,
    message: "Idea added successfully",
    data: result,
  });
});

const updateIdea = catchAsync(async (req, res) => {
  const files = req.files;
  const result = await ideaService.updateIdeaIntoDB(
    req.params.ideaId,
    files as IFile[],
    req.body as TIdea
  );

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Idea updated successfully",
    data: result,
  });
});
const deleteIdea = catchAsync(async (req, res) => {
  const result = await ideaService.deleteIdeaFromDB(req.params.ideaId);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Idea deleted successfully",
    data: result,
  });
});
const updateIdeaStatus = catchAsync(async (req, res) => {
  const result = await ideaService.updateIdeaStatusIntoDB(
    req.params.ideaId,
    req.body
  );

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Update idea status successfully",
    data: result,
  });
});
const getMyIdea = catchAsync(async (req, res) => {
  const result = await ideaService.getMyIdeaFromDB(req.params.email);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "My idea fetched successfully",
    data: result,
  });
});
const getAllStatusIdea = catchAsync(async (req, res) => {
  const result = await ideaService.getAllStatusIdeaFromDB(
    req.params.status as IdeaStatus
  );

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "idea fetched successfully",
    data: result,
  });
});

export const ideaController = {
  getAllIdea,
  getIdeaById,
  addIdea,
  updateIdea,
  deleteIdea,
  updateIdeaStatus,
  getMyIdea,
  getAllStatusIdea,
};

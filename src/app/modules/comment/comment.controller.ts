import { catchAsync } from "../../utils/catchAsync";
import { commentService } from "./comment.service";

const addComment = catchAsync(async (req, res) => {
  const result = await commentService.addCommentIntoDB(
    req.params.ideaId,
    req.body
  );

  res.status(200).json({
    statusCode: 200,
    message: "comment added successfully",
    data: result,
  });
});
const addReply = catchAsync(async (req, res) => {
  const result = await commentService.addReplyIntoDB(
    req.params.ideaId,
    req.body
  );

  res.status(200).json({
    statusCode: 200,
    message: "Reply added successfully",
    data: result,
  });
});
const deleteComment = catchAsync(async (req, res) => {
  const result = await commentService.deleteCommentIntoDB(req.params.commentId);

  res.status(200).json({
    statusCode: 200,
    message: "Comment deleted successfully",
    data: result,
  });
});
const updateComment = catchAsync(async (req, res) => {
  const result = await commentService.updateCommentIntoDB(
    req.params.commentId,
    req.body
  );

  res.status(200).json({
    statusCode: 200,
    message: "Comment updated successfully",
    data: result,
  });
});
const commentCount = catchAsync(async (req, res) => {
  const result = await commentService.commentCountFromDB(req.params.ideaId);

  res.status(200).json({
    statusCode: 200,
    message: "Comment updated successfully",
    data: result,
  });
});

export const commentController = {
  addComment,
  addReply,
  deleteComment,
  updateComment,
  commentCount,
};

import { decode } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { voteService } from "./vote.service";
import { TJwtPayload } from "../../interface/jwtPayload";

const upVote = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const user = token && decode(token);

  const result = await voteService.upVoteIntoDB(
    req.params.ideaId,
    user as TJwtPayload,
    req.body
  );

  res.status(200).json({
    statusCode: 200,
    message: "Up vote  successfully",
    data: result,
  });
});
const downVote = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const user = token && decode(token);
  const result = await voteService.downVoteIntoDB(
    req.params.ideaId,
    user as TJwtPayload,
    req.body
  );

  res.status(200).json({
    statusCode: 200,
    message: "Down vote  successfully",
    data: result,
  });
});
const voteCount = catchAsync(async (req, res) => {
  const result = await voteService.voteCountFromDB(req.params.ideaId);

  res.status(200).json({
    statusCode: 200,
    message: " vote count successfully",
    data: result,
  });
});

export const voteController = { upVote, downVote, voteCount };

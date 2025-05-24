import { catchAsync } from "../../utils/catchAsync";
import { voteService } from "./vote.service";

const upVote = catchAsync(async (req, res) => {
  const result = await voteService.upVoteIntoDB(req.params.ideaId, req.body);

  res.status(200).json({
    statusCode: 200,
    message: "Up vote  successfully",
    data: result,
  });
});
const downVote = catchAsync(async (req, res) => {
  const result = await voteService.downVoteIntoDB(req.params.ideaId, req.body);

  res.status(200).json({
    statusCode: 200,
    message: "Down vote  successfully",
    data: result,
  });
});

export const voteController = { upVote, downVote };

import {
  getPostLikes,
  likePost,
  unlikePost,
} from "@/controllers/post.controller";
import { Router } from "express";

const likeRouter = Router();

likeRouter.get("/:postId/", async (req, res) => {
  const result = await getPostLikes(req.params.postId);
  if (result) res.json(result.rows);
});

likeRouter.post("/:postId/:userId", async (req, res) => {
  const { postId, userId } = req.params;
  const result = await likePost(userId, postId);
  if (result) res.json(result.rows[0]);
});

likeRouter.delete("/:postId/:userId", async (req, res) => {
  const { postId, userId } = req.params;
  const result = await unlikePost(userId, postId);
  if (result) res.json(result.rows[0]);
});

export { likeRouter };

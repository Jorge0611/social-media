import {
  createPost,
  deletePost,
  getPostById,
  getPostLikes,
  getPosts,
  likePost,
  unlikePost,
  updatePost,
} from "@/controllers/post.controller";
import { Router } from "express";

const postRouter = Router();

postRouter.get("/:id", async (req, res) => {
  const result = await getPosts(req.params.id);
  res.json(result.rows);
});

postRouter.get("/:postId/:userId", async (req, res) => {
  const { postId, userId } = req.params;
  const result = await getPostById(userId, postId);
  res.json(result.rows[0]);
});

postRouter.post("/", async (req, res) => {
  const result = await createPost(req.body);
  if (result) res.json(result.rows[0]);
});

postRouter.put("/:id", async (req, res) => {
  const result = await updatePost(req.body);
  if (result) res.json(result.rows[0]);
});

postRouter.delete("/:id", async (req, res) => {
  const result = await deletePost(req.params.id);
  if (result) res.json(result.rows[0]);
});

export { postRouter };

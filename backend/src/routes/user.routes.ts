import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  User,
} from "@/controllers/user.controller";
import { TypedRequest } from "@/utils/global-types";
import { Router } from "express";

const router = Router();

router.get("/", async (_req, res) => {
  const result = await getUsers();
  res.json(result.rows);
});

router.get("/:id", async (req, res) => {
  const result = await getUserById(req.params.id);
  res.json(result.rows[0]);
});

router.post("/", async (req: TypedRequest<User>, res) => {
  const result = await createUser(req.body);
  if (result) res.json(result.rows[0]);
});

router.put("/:id", async (req: TypedRequest<User>, res) => {
  const result = await updateUser(req.body);
  if (result) res.json(result.rows[0]);
});

router.delete("/:id", async (req, res) => {
  const result = await deleteUser(req.params.id);
  if (result) res.json(result.rows[0]);
});

export default router;

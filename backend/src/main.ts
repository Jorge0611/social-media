import "module-alias/register";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

// Importing routes
import { likeRouter } from "@/routes/like.routes";
import { postRouter } from "@/routes/post.routes";
import { userRouter } from "@/routes/user.routes";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

// Setup Middleware
const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

// Setup Routes

app.get("/status", (_req, res) => {
  res.send("Running");
});

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/like", likeRouter);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

import "module-alias/register";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

// Importing routes
import userRoutes from "@/routes/user.routes";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config();

// Setup Middleware
const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

// Setup Routes

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.use("/user", userRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

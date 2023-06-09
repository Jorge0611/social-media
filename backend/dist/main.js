"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
// Importing routes
const like_routes_1 = require("@/routes/like.routes");
const post_routes_1 = require("@/routes/post.routes");
const user_routes_1 = require("@/routes/user.routes");
// Load environment variables from .env file, where API keys and passwords are configured
dotenv_1.default.config();
// Setup Middleware
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("combined"));
app.use(express_1.default.json());
// Setup Routes
app.get("/status", (_req, res) => {
    res.send("Running");
});
app.use("/user", user_routes_1.userRouter);
app.use("/post", post_routes_1.postRouter);
app.use("/like", like_routes_1.likeRouter);
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const post_controller_1 = require("@/controllers/post.controller");
const express_1 = require("express");
const postRouter = (0, express_1.Router)();
exports.postRouter = postRouter;
postRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, post_controller_1.getPosts)(req.params.id);
    res.json(result.rows);
}));
postRouter.get("/:postId/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, userId } = req.params;
    const result = yield (0, post_controller_1.getPostById)(userId, postId);
    res.json(result.rows[0]);
}));
postRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, post_controller_1.createPost)(req.body);
    if (result)
        res.json(result.rows[0]);
}));
postRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, post_controller_1.updatePost)(req.body);
    if (result)
        res.json(result.rows[0]);
}));
postRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, post_controller_1.deletePost)(req.params.id);
    if (result)
        res.json(result.rows[0]);
}));

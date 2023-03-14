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
exports.likeRouter = void 0;
const post_controller_1 = require("@/controllers/post.controller");
const express_1 = require("express");
const likeRouter = (0, express_1.Router)();
exports.likeRouter = likeRouter;
likeRouter.get("/:postId/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, post_controller_1.getPostLikes)(req.params.postId);
    if (result)
        res.json(result.rows);
}));
likeRouter.post("/:postId/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, userId } = req.params;
    const result = yield (0, post_controller_1.likePost)(userId, postId);
    if (result)
        res.json(result.rows[0]);
}));
likeRouter.delete("/:postId/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, userId } = req.params;
    const result = yield (0, post_controller_1.unlikePost)(userId, postId);
    if (result)
        res.json(result.rows[0]);
}));

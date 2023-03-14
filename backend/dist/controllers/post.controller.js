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
exports.getPostLikes = exports.unlikePost = exports.likePost = exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getPosts = void 0;
const db_1 = require("@/libs/db");
// We use the userId to get the posts from the user's feed,
// and filter out the posts that are from blocked users.
function getPosts(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const posts = yield (0, db_1.runQuery)("SELECT * FROM fn_get_post($1)", [userId]);
        return posts;
    });
}
exports.getPosts = getPosts;
function getPostById(userId, postId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, db_1.runQuery)("SELECT * FROM fn_get_post($1) WHERE id = $2 ", [
            userId,
            postId,
        ]);
    });
}
exports.getPostById = getPostById;
function createPost(post) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
    INSERT INTO main.posts (caption, author_id)
    VALUES ($1, $2)
    RETURNING *
  `;
        const params = [post.caption, post.author_id];
        if (params)
            return yield (0, db_1.runQuery)(query, params);
    });
}
exports.createPost = createPost;
function updatePost(post) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
    UPDATE main.posts
    SET caption = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING *
  `;
        const params = [post.caption, post.id];
        if (params)
            return yield (0, db_1.runQuery)(query, params);
    });
}
exports.updatePost = updatePost;
function deletePost(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
    UPDATE main.posts
    SET deleted_at = NOW()
    WHERE id = $1
    RETURNING *
  `;
        return yield (0, db_1.runQuery)(query, [postId]);
    });
}
exports.deletePost = deletePost;
function likePost(userId, postId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
    INSERT INTO main.likes (user_id, post_id)
    VALUES ($1, $2)
    RETURNING *
  `;
        return yield (0, db_1.runQuery)(query, [userId, postId]);
    });
}
exports.likePost = likePost;
function unlikePost(userId, postId) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
    DELETE FROM main.likes
    WHERE user_id = $1 AND post_id = $2
    RETURNING *
  `;
        return yield (0, db_1.runQuery)(query, [userId, postId]);
    });
}
exports.unlikePost = unlikePost;
function getPostLikes(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, db_1.runQuery)("SELECT * FROM main.likes");
    });
}
exports.getPostLikes = getPostLikes;

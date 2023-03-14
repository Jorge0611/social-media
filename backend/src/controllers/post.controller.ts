import { runQuery } from "@/libs/db";

export type Post = {
  id?: number;
  caption: string;
  author_id: number;
  likes?: number | string;
  is_liked?: boolean;
  media_url?: string[];
  created_at?: Date;
  deleted_at?: Date;
};

// We use the userId to get the posts from the user's feed,
// and filter out the posts that are from blocked users.

export async function getPosts(userId: string) {
  const posts = await runQuery<Post>("SELECT * FROM fn_get_post($1)", [userId]);
  return posts;
}

export async function getPostById(userId: string, postId: string) {
  return await runQuery<Post>("SELECT * FROM fn_get_post($1) WHERE id = $2 ", [
    userId,
    postId,
  ]);
}

export async function createPost(post: Post) {
  const query = `
    INSERT INTO main.posts (caption, author_id)
    VALUES ($1, $2)
    RETURNING *
  `;
  const params = [post.caption, post.author_id];

  if (params) return await runQuery<Post>(query, params);
}

export async function updatePost(post: Post) {
  const query = `
    UPDATE main.posts
    SET caption = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING *
  `;

  const params = [post.caption, post.id];

  if (params) return await runQuery<Post>(query, params);
}

export async function deletePost(postId: string) {
  const query = `
    UPDATE main.posts
    SET deleted_at = NOW()
    WHERE id = $1
    RETURNING *
  `;
  return await runQuery<Post>(query, [postId]);
}

// Likes

export type Like = {
  user_id?: number;
  post_id?: number;
};

export async function likePost(userId: string, postId: string) {
  const query = `
    INSERT INTO main.likes (user_id, post_id)
    VALUES ($1, $2)
    RETURNING *
  `;
  return await runQuery<Like>(query, [userId, postId]);
}

export async function unlikePost(userId: string, postId: string) {
  const query = `
    DELETE FROM main.likes
    WHERE user_id = $1 AND post_id = $2
    RETURNING *
  `;
  return await runQuery<Like>(query, [userId, postId]);
}

export async function getPostLikes(postId: string) {
  return await runQuery<Like>("SELECT * FROM main.likes");
}

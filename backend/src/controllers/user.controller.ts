import { runQuery } from "@/libs/db";

export type User = {
  id?: number;
  username: string;
  full_name: string;
  description?: string;
  email: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};

export async function getUsers() {
  return await runQuery<User>("SELECT * FROM main.users");
}

export async function getUserById(id: string) {
  return await runQuery<User>("SELECT * FROM main.users WHERE id = $1", [id]);
}

export async function getUserByColumn(column: keyof User, value: string) {
  const query = "SELECT * FROM main.users WHERE $1 = $2";
  return await runQuery<User>(query, [column, value]);
}

export async function createUser(user: User) {
  const query = `
    INSERT INTO main.users (username, full_name, description, email, password)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const params = [
    user.username,
    user.full_name,
    user.description,
    user.email,
    user.password,
  ];

  if (params) return await runQuery<User>(query, params);
}

export async function updateUser(user: User) {
  const query = `
    UPDATE main.users
    SET username = $1, full_name = $2, description = $3, email = $4, password = $5, updated_at = NOW()
    WHERE id = $6
    RETURNING *
  `;

  const params = [
    user.username,
    user.full_name,
    user.description,
    user.email,
    user.password,
    user.id,
  ];

  if (params) return await runQuery<User>(query, params);
}

export async function deleteUser(id: string) {
  const query = `
    UPDATE main.users
    SET deleted_at = NOW()
    WHERE id = $1
    RETURNING *
  `;

  return await runQuery<User>(query, [id]);
}

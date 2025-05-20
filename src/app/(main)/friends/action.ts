"use server";

import { pool } from "@/db";
import { User } from "@/db/user";
import { RowDataPacket } from "mysql2";

export interface FriendType extends RowDataPacket {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
}

export async function addFriend(
  userA: number,
  userB: number
): Promise<boolean> {
  const conn = await pool.getConnection();
  try {
    const res = await conn.execute(
      `INSERT INTO friends (user_a, user_b) VALUES (?, ?)`,
      [userA, userB]
    );
    return true;
  } catch (err: any) {
    if (err.code === "ER_DUP_ENTRY") {
      console.log("Friendship already exists.");
      return false;
    } else {
      throw err;
    }
  } finally {
    conn.release();
  }
}

export async function getAllFriends(): Promise<any[]> {
  const [rows] = await pool.execute("SELECT * FROM friends");
  return rows as any[];
}
export async function getFriends(id: number): Promise<FriendType[]> {
  const [rows] = await pool.execute<FriendType[]>(
    `
    SELECT 
      u.id,
      u.email,
      u.first_name,
      u.last_name
    FROM friends f
    JOIN user u 
      ON u.id = CASE 
        WHEN f.user_a = ? THEN f.user_b
        ELSE f.user_a
      END
    WHERE f.user_a = ? OR f.user_b = ?
    `,
    [id, id, id]
  );

  return rows;
}

export async function searchForUser(query: string): Promise<User[]> {
  const wildcardQuery = `%${query}%`;
  console.log("Q: ", wildcardQuery);
  const [rows] = await pool.execute(
    `
      SELECT id, email, first_name, last_name
      FROM user
      WHERE first_name LIKE ? OR last_name LIKE ?
      `,
    [wildcardQuery, wildcardQuery]
  );
  return rows as User[];
}

export async function removeFriend(
  userId1: number,
  userId2: number
): Promise<void> {
  try {
    await pool.execute(
      `
    DELETE FROM friends 
    WHERE (user_a = ? AND user_b = ?) 
       OR (user_a = ? AND user_b = ?)
    `,
      [userId1, userId2, userId2, userId1]
    );
  } catch (error) {
    console.error(error);
  }
}

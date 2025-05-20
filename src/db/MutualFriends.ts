import { pool } from "@/db/index";
import type { RowDataPacket } from "mysql2";

interface MutualFriendRow extends RowDataPacket {
  id: number;
  first_name: string;
  last_name: string;
  mutualCount: number;
  avatar_url: string | null;
}

export interface Friend {
  id: string;
  name: string;
  mutualCourses: number;
  avatarUrl?: string;
}

export async function getMutualFriends(userId: number): Promise<Friend[]> {
  const [rows] = await pool.query<MutualFriendRow[]>(
    `
      SELECT
        u.id,
        u.first_name,
        u.last_name,
        COUNT(*) AS mutualCount,
        NULL       AS avatar_url
      FROM \`user_course\` AS uc1
      JOIN \`user_course\` AS uc2
        ON uc1.\`course_code\` = uc2.\`course_code\`
       AND uc2.\`user_id\` = ?
      JOIN \`user\` AS u
        ON u.id = uc1.\`user_id\`
      WHERE uc1.\`user_id\` != ?
      GROUP BY u.id, u.first_name, u.last_name
      ORDER BY mutualCount DESC
    `,
    [userId, userId]
  );

  return rows.map(r => ({
    id: String(r.id),
    name: `${r.first_name} ${r.last_name}`,
    mutualCourses: r.mutualCount,
    avatarUrl: r.avatar_url ?? undefined,
  }));
}

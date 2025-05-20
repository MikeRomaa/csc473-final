import { pool } from "@/db/index";
import type { RowDataPacket } from "mysql2";

export interface CourseRow extends RowDataPacket {
  code: string;
  title: string;
}

export async function getMyCourses(userId: number): Promise<CourseRow[]> {
  const [rows] = await pool.query<CourseRow[]>(
    `
      SELECT
        c.code,
        c.title
      FROM \`course\` AS c
      JOIN \`user_course\` AS uc
        ON uc.\`course_code\` = c.\`code\`
      WHERE uc.\`user_id\` = ?
    `,
    [userId]
  );
  return rows;
}

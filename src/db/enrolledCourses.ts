import { pool } from "@/db/index";
import type { RowDataPacket } from "mysql2";


export interface CourseRow extends RowDataPacket {
  id: number;
  code: string;
  title: string;
}

export async function getMyCourses(userId: number): Promise<CourseRow[]> {
  const [rows] = await pool.query<CourseRow[]>(
    `SELECT c.id, c.code, c.title
       FROM course c
       JOIN enrolled_course e ON e.course_id = c.id
      WHERE e.user_id = ?`,
    [userId]
  );
  return rows;
  }
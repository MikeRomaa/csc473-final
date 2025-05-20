import { pool } from "@/db/index";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export interface ResourceRow extends RowDataPacket {
  id: number;
  course_code: string;
  resource: Buffer;
}

export async function getResourcesByCourse(courseCode: string): Promise<number[]> {
  const [rows] = await pool.query<ResourceRow[]>(
    `SELECT id
       FROM resources
      WHERE course_code = ?`,
    [courseCode]
  );
  return rows.map(r => r.id);
}

export async function getResourceById(
  id: number
): Promise<Buffer | null> {
  const [rows] = await pool.query<ResourceRow[]>(
    `SELECT resource
       FROM resources
      WHERE id = ?`,
    [id]
  );
  if (!rows.length) return null;
  return rows[0].resource;
}

export async function addResource(
  courseCode: string,
  data: Buffer
): Promise<number> {
  const [res] = await pool.execute<ResultSetHeader>(
    `INSERT INTO resources (course_code, resource)
      VALUES (?, ?)`,
    [courseCode, data]
  );
  return res.insertId;
}

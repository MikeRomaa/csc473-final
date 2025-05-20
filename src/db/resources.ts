import { pool } from "@/db/index";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export interface ResourceRow extends RowDataPacket {
  id: number;
  course_id: number;
  resource: Buffer;
}

/** fetch all resource‐IDs for a given course */
export async function getResourcesByCourse(courseId: number): Promise<number[]> {
  const [rows] = await pool.query<ResourceRow[]>(
    `SELECT id FROM resources WHERE course_id = ?`,
    [courseId]
  );
  return rows.map(r => r.id);
}

/** fetch the blob for one resource */
export async function getResourceById(
  id: number
): Promise<Buffer | null> {
  const [rows] = await pool.query<ResourceRow[]>(
    `SELECT resource FROM resources WHERE id = ?`,
    [id]
  );
  if (!rows.length) return null;
  return rows[0].resource;
}

/** insert one new file blob and return its new ID */
export async function addResource(
  courseId: number,
  data: Buffer
): Promise<number> {
  const [res] = await pool.execute<ResultSetHeader>(
    `INSERT INTO resources (course_id, resource) VALUES (?, ?)`,
    [courseId, data]
  );
  return res.insertId;
}

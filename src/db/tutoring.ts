import type { RowDataPacket } from "mysql2";

import { pool } from "@/db";

interface TutoringCourseRow extends RowDataPacket {
    code: string;
    title: string;
}

export type TutoringCourse = Pick<TutoringCourseRow, "code" | "title">;

export async function getTutoringByUser(user_id: number): Promise<TutoringCourse[]> {
    const [results] = await pool.execute<TutoringCourseRow[]>(
        `SELECT
            course.code AS code,
            course.title AS title
        FROM
            user_course
        JOIN
            user
        ON
            user_course.user_id = user.id
        JOIN
            course
        ON
            user_course.course_code = course.code
        WHERE
            user_course.user_id = :user_id AND
            tutoring = TRUE`,
        { user_id },
    );

    return results;
}

export async function setTutoring(user_id: number, code: string, tutoring: boolean): Promise<void> {
    await pool.execute(
        `UPDATE
            user_course
        SET
            tutoring = :tutoring
        WHERE
            user_id = :user_id AND
            course_code = :code`,
        { user_id, code, tutoring },
    );
}

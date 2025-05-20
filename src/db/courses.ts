import type { RowDataPacket } from "mysql2";

import { pool } from "@/db";

interface CourseRow extends RowDataPacket {
    code: string;
    title: string;
    description: string;

    enrolled: boolean;
    total_enrolled: number;
    friends_enrolled: number;
}

export type Course = Pick<
    CourseRow,
    "code" | "title" | "description" | "enrolled" | "total_enrolled" | "friends_enrolled"
>;

export async function searchCourses(query: string, user_id: number | null): Promise<Course[]> {
    const [results] = await pool.execute<CourseRow[]>(
        `SELECT
            code,
            title,
            description,
            (enrolled.user_id IS NOT NULL) AS enrolled,
            COUNT(user_course.user_id) AS total_enrolled,
            COUNT(friends.user_a) as friends_enrolled
        FROM
            course
        LEFT JOIN
            user_course
        ON
            course.code = user_course.course_code
        LEFT JOIN
            user_course AS enrolled
        ON
            user_course.user_id = :user_id
        LEFT JOIN
            friends
        ON
            (friends.user_a != :user_id AND user_course.user_id = friends.user_a) OR
            (friends.user_b != :user_id AND user_course.user_id = friends.user_b)
        WHERE
            (
                UPPER(course.code) LIKE CONCAT('%', UPPER(:query), '%') OR
                UPPER(course.title) LIKE CONCAT('%', UPPER(:query), '%')
            )
        GROUP BY
            enrolled.user_id,
            course.code,
            friends.user_a
        LIMIT 12`,
        { query, user_id },
    );

    return results;
}

interface EnrolledRow extends RowDataPacket {
    name: string;
}

export async function getEnrolled(code: string): Promise<string[]> {
    const [results] = await pool.execute<EnrolledRow[]>(
        `SELECT
            CONCAT(user.first_name, ' ', user.last_name) AS name
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
            user_course.course_code = :code`,
        { code },
    );

    return results.map(({ name }) => name);
}

export async function enroll(user_id: number, code: string): Promise<void> {
    await pool.execute(
        `INSERT INTO
            user_course (user_id, course_code)
        VALUES
            (:user_id, :code)`,
        { user_id, code },
    );
}

export async function unenroll(user_id: number, code: string): Promise<void> {
    await pool.execute(
        `DELETE FROM
            user_course
        WHERE
            user_id = :user_id AND
            course_code = :code`,
        { user_id, code },
    );
}

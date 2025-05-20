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

export async function searchCourses(query: string, user_id: number | null) {
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
            course.id = user_course.course_id
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
                UPPER(code) LIKE CONCAT('%', :query, '%') OR
                UPPER(title) LIKE CONCAT('%', :query, '%')
            ) AND
            (
                :user_id IS NULL OR
                friends.user_a = :user_id OR
                friends.user_b = :user_id
            )
        GROUP BY
            enrolled.user_id,
            course.id,
            friends.user_a
        LIMIT 10`,
        { query: query.toUpperCase(), user_id },
    );

    return results;
}

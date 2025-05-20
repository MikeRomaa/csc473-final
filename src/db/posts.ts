import { pool } from "@/db/index";

export interface Reply {
  id: string;
  name: string;
  content: string;
}

export interface Post {
  id: number;
  authorName: string;
  courseCode: string;
  post: string;
  created_at: Date;
  replies: Reply[];
}

export async function getFeed(): Promise<Post[]> {
  const [rows] = await pool.query<any[]>(
    `SELECT
       p.id,
       CONCAT(u.first_name,' ',u.last_name) AS authorName,
       c.code AS courseCode,
       p.post,
       p.created_at,
       COALESCE(p.replies, JSON_ARRAY()) AS repliesJson
     FROM posts p
     JOIN user u ON u.id = p.user_id
     JOIN course c ON c.id = p.course_id
     ORDER BY p.created_at DESC`
  );

  return rows.map(r => {
    let raw = r.repliesJson;
    let text: string;

    if (Buffer.isBuffer(raw)) {
      text = raw.toString("utf8");
    } else if (typeof raw === "string") {
      text = raw;
    } else {
      return {
        id: r.id,
        authorName: r.authorName,
        courseCode: r.courseCode,
        post: r.post,
        created_at: r.created_at,
        replies: raw as Reply[],    
      };
    }

    if (!text) text = "[]";

    let replies: Reply[];
    try {
      replies = JSON.parse(text) as Reply[];
    } catch {
      replies = [];
    }

    return {
      id: r.id,
      authorName: r.authorName,
      courseCode: r.courseCode,
      post: r.post,
      created_at: r.created_at,
      replies,
    };
  });
}

export async function createPost(userId: number, courseId: number, text: string) {
  await pool.execute(
    `INSERT INTO posts (user_id, course_id, post) VALUES (?, ?, ?)`,
    [userId, courseId, text]
  );
}

export async function addReply(postId: number, reply: Reply) {
  await pool.execute(
    `UPDATE posts
       SET replies = JSON_ARRAY_APPEND(
                       COALESCE(replies, JSON_ARRAY()),
                       '$',
                       JSON_OBJECT('id', ?, 'name', ?, 'content', ?)
                    )
     WHERE id = ?`,
    [reply.id, reply.name, reply.content, postId]
  );
}

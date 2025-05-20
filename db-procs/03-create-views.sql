CREATE OR REPLACE VIEW posts_with_authors AS
SELECT
  p.id,
  p.post,
  p.created_at,
  p.replies,
  u.first_name,
  u.last_name
FROM posts AS p
JOIN `user` AS u
  ON p.user_id = u.id;

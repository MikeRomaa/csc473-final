"use server";

import { createPost , addReply } from "@/db/posts";
import { getCurrentUser } from "@/lib/cookies";

export async function createPostAction(formData: FormData) {
  "use server";
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const text       = String(formData.get("text")       ?? "");
  const courseCode = String(formData.get("courseCode") ?? "");

  if (!courseCode) throw new Error("Missing courseCode");
  await createPost(user.id, courseCode, text);
}

export async function addReplyAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not signed in");

  const postId = Number(formData.get("postId"));
  const content = (formData.get("content") as string) || "";
  const reply = {
    id: `${postId}-${Date.now()}`,
    name: `${user.first_name} ${user.last_name}`,
    content,
  };
  await addReply(postId, reply);
}

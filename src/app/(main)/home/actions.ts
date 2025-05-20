"use server";

import { getCurrentUser } from "@/lib/cookies";
import { createPost, addReply } from "@/db/posts";

export async function createPostAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not signed in");

  const text = (formData.get("text") as string) || "";
  const courseId = Number(formData.get("courseId"));
  await createPost(user.id, courseId, text);
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

"use server";

import { getCurrentUser } from "@/lib/cookies";
import { addResource }     from "@/db/resources";

export async function uploadResourceAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not signed in");

  const courseId = Number(formData.get("courseId"));
  const file     = formData.get("file") as File;

  if (!courseId || !file) {
    throw new Error("Missing courseId or file");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer      = Buffer.from(arrayBuffer);

  await addResource(courseId, buffer);
}

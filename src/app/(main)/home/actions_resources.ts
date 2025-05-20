"use server";

import { getCurrentUser } from "@/lib/cookies";
import { addResource }    from "@/db/resources";

export async function uploadResourceAction(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not signed in");

  const courseCode = formData.get("courseCode");
  const file       = formData.get("file");

  if (typeof courseCode !== "string" || !file || !(file instanceof File)) {
    throw new Error("Missing or invalid courseCode or file");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer      = Buffer.from(arrayBuffer);

  await addResource(courseCode, buffer);
}

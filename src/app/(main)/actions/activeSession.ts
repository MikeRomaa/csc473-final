"use server";

import { cookies } from "next/headers";

export async function checkForCurrentSession(): Promise<boolean> {
  const session = (await cookies()).get("session")?.value;
  return session !== undefined;
}

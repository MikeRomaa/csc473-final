"use server";

import { cookies } from "next/headers";

export async function signOut() {
  (await cookies()).set({
    name: "session",
    value: "",
    maxAge: 0,
    path: "/",
  });
}

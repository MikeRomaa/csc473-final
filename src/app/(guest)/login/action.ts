"use server";

import { cookies } from "next/headers";

import { encryptCookie } from "@/lib/cookies";
import { signInSchema } from "./schema";
import { FormStatus, validateFormData } from "@/utils/form";
import { getUser, User } from "@/db/user";

export type State = FormStatus<User>;

export async function login(formData: FormData): Promise<State> {
  const { data, errors } = validateFormData(signInSchema, formData);

  if (errors) {
    return errors;
  }

  const { email, password } = data;

  const user = await getUser(email, password);

  if (!user) {
    return { formError: "Failed to authenticate user." };
  }

  console.log("Log in successful", user);

  (await cookies()).set({
    name: "session",
    value: encryptCookie(user),
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return { data: user };
}

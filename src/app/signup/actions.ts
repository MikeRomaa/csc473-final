"use server";

import { cookies } from "next/headers";
import { encryptCookie } from "@/utils/cookies";
import { createUser, User } from "@/db/user";
import { FormStatus, validateFormData } from "@/utils/form";
import { registerSchema } from "./schema";

export type State = FormStatus<User>;

export async function register(formData: FormData): Promise<State> {
  const { data, errors } = validateFormData(registerSchema, formData);

  if (errors) {
    console.error("ERROR(s): ", errors);
    return errors;
  }

  const { first_name, last_name, email, password } = data;

  if (!email.includes("@citymail.cuny.edu")) {
    console.log("---------- 123 here");
    return {
      formError: "Must be from the '@citymail.cuny.edu' domain.",
    };
  }

  const id = await createUser(email, password, first_name, last_name);
  if (!id) {
    return { fieldErrors: { email: "Email already registered." } };
  }

  const user: User = { id, first_name, last_name, email };

  (await cookies()).set({
    name: "session",
    value: encryptCookie(user),
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return { data: user };
}

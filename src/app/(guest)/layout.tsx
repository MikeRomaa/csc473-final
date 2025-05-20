"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/cookies";
import type { ReactNode } from "react";
import Navbar from "../components/navbar";

export default async function GuestLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  if (user) {
    redirect("/home");
  }

  return <div>{children}</div>;
}

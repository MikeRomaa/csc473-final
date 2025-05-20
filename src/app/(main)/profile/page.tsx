"use server";

import { redirect } from "next/navigation";

import { getEnrolledByUser } from "@/db/courses";
import { getTutoringByUser } from "@/db/tutoring";
import { getCurrentUser } from "@/lib/cookies";
import Profile from "./components/Profile";

export default async function Page() {
    const user = await getCurrentUser();
    if (!user) {
        return redirect("/login");
    }

    const enrolled = await getEnrolledByUser(user.id);
    const tutoring = await getTutoringByUser(user.id);

    return (
        <div className="relative">
            <Profile user={user} enrolled={enrolled} tutoring={tutoring} />
        </div>
    );
}

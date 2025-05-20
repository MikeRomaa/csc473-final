import { getEnrolledByUser } from "@/db/courses";
import { getCurrentUser } from "@/lib/cookies";

export async function GET(): Promise<Response> {
    const user = await getCurrentUser();
    if (!user) {
        return new Response("Must be authenticated to use this endpoint", { status: 401 });
    }

    const result = await getEnrolledByUser(user.id);

    return Response.json(result);
}

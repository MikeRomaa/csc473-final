import type { NextRequest } from "next/server";

import { searchCourses } from "@/db/courses";
import { getCurrentUser } from "@/utils/cookies";

export async function GET(request: NextRequest): Promise<Response> {
    const query = request.nextUrl.searchParams.get("query");
    const user = await getCurrentUser();

    const result = await searchCourses(query ?? "", user?.id ?? null);

    return Response.json(result);
}

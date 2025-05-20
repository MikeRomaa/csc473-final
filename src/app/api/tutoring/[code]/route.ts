import type { NextRequest } from "next/server";

import { setTutoring } from "@/db/tutoring";
import { getCurrentUser } from "@/lib/cookies";

type Parameters = Promise<{ code: string }>;

export async function POST(_: NextRequest, { params }: { params: Parameters }): Promise<Response> {
    const user = await getCurrentUser();
    if (!user) {
        return new Response("Must be authenticated to use this endpoint", { status: 401 });
    }

    const { code } = await params;
    await setTutoring(user.id, code, true);

    return new Response(null, { status: 200 });
}

export async function DELETE(_: NextRequest, { params }: { params: Parameters }): Promise<Response> {
    const user = await getCurrentUser();
    if (!user) {
        return new Response("Must be authenticated to use this endpoint", { status: 401 });
    }

    const { code } = await params;
    await setTutoring(user.id, code, false);

    return new Response(null, { status: 200 });
}

import type { NextRequest } from "next/server";

import { enroll, getEnrolled, unenroll } from "@/db/courses";
import { getCurrentUser } from "@/lib/cookies";

type Parameters = Promise<{ code: string }>;

export async function GET(_: NextRequest, { params }: { params: Parameters }): Promise<Response> {
    const { code } = await params;

    return Response.json({ enrolled: await getEnrolled(code) });
}

export async function POST(_: NextRequest, { params }: { params: Parameters }): Promise<Response> {
    const user = await getCurrentUser();
    if (!user) {
        return new Response("Must be authenticated to use this endpoint", { status: 401 });
    }

    const { code } = await params;
    await enroll(user.id, code);

    return new Response(null, { status: 200 });
}

export async function DELETE(_: NextRequest, { params }: { params: Parameters }): Promise<Response> {
    const user = await getCurrentUser();
    if (!user) {
        return new Response("Must be authenticated to use this endpoint", { status: 401 });
    }

    const { code } = await params;
    await unenroll(user.id, code);

    return new Response(null, { status: 200 });
}

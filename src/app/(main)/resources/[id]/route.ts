import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getResourceById } from "@/db/resources";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id: idParam } = await params;

    const id = Number(idParam);
    if (Number.isNaN(id)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const blob = await getResourceById(id);
    if (!blob) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return new NextResponse(blob, {
        headers: {
            "Content-Type": "application/octet-stream",
            "Content-Disposition": `attachment; filename="resource-${id}"`,
        },
    });
}

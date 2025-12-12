import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const sessionId = cookieStore.get("user_session")?.value;

        if (!sessionId) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const { profileImage } = await request.json();

        // Update user profile photo
        const updatedUser = await prisma.user.update({
            where: { id: sessionId },
            data: {
                profileImage: profileImage,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error uploading photo:", error);
        return NextResponse.json({ error: "Failed to upload photo" }, { status: 500 });
    }
}

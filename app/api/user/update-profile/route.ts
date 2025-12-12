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

        const { name, email, phone } = await request.json();

        // Update user profile
        const updatedUser = await prisma.user.update({
            where: { id: sessionId },
            data: {
                name: name || null,
                email: email,
                phone: phone || null,
            },
        });

        return NextResponse.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}

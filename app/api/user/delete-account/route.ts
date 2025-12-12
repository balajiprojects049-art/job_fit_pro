import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/app/lib/prisma";

export async function DELETE() {
    try {
        const cookieStore = await cookies();
        const sessionId = cookieStore.get("user_session")?.value;

        if (!sessionId) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        // Delete all user's resumes first (cascade)
        await prisma.resumeLog.deleteMany({
            where: { userId: sessionId }
        });

        // Delete user
        await prisma.user.delete({
            where: { id: sessionId }
        });

        // Clear session cookie
        const response = NextResponse.json({ success: true });
        response.cookies.delete("user_session");

        return response;
    } catch (error) {
        console.error("Error deleting account:", error);
        return NextResponse.json({ error: "Failed to delete account" }, { status: 500 });
    }
}

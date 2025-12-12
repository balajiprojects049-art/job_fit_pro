import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionId = cookieStore.get("user_session")?.value;

        if (!sessionId) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        // Fetch all user data
        const user = await prisma.user.findUnique({
            where: { id: sessionId },
            include: {
                ResumeLog: true,
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Remove password from export
        const { password, ...userDataWithoutPassword } = user;

        // Create exportable data
        const exportData = {
            exportDate: new Date().toISOString(),
            user: userDataWithoutPassword,
            totalResumes: user.ResumeLog.length,
        };

        return new NextResponse(JSON.stringify(exportData, null, 2), {
            headers: {
                'Content-Type': 'application/json',
                'Content-Disposition': `attachment; filename="jobfit-pro-data-${new Date().toISOString().split('T')[0]}.json"`,
            },
        });
    } catch (error) {
        console.error("Error exporting data:", error);
        return NextResponse.json({ error: "Failed to export data" }, { status: 500 });
    }
}

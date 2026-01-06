import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        // Get resume ID from URL params
        const searchParams = request.nextUrl.searchParams;
        const resumeId = searchParams.get("id");
        const filename = searchParams.get("filename") || "resume.docx";

        if (!resumeId) {
            return NextResponse.json(
                { error: "Resume ID is required" },
                { status: 400 }
            );
        }

        // Verify user is authenticated
        const userId = await getUserId();
        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Fetch the resume from database
        const resume = await prisma.resumeLog.findUnique({
            where: { id: resumeId }
        });

        if (!resume) {
            return NextResponse.json(
                { error: "Resume not found" },
                { status: 404 }
            );
        }

        // Verify the resume belongs to this user
        if (resume.userId !== userId) {
            return NextResponse.json(
                { error: "Unauthorized - This resume doesn't belong to you" },
                { status: 403 }
            );
        }

        // Check if fileData exists
        if (!resume.fileData) {
            return NextResponse.json(
                { error: "Resume file data not found" },
                { status: 404 }
            );
        }

        // Convert base64 to buffer
        const buffer = Buffer.from(resume.fileData, "base64");

        // Return the file as a download
        return new NextResponse(buffer, {
            headers: {
                "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Content-Length": buffer.length.toString(),
            },
        });

    } catch (error: any) {
        console.error("Error downloading resume:", error);
        return NextResponse.json(
            { error: "Failed to download resume", details: error.message },
            { status: 500 }
        );
    }
}

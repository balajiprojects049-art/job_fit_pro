import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        // Check admin authentication
        const cookieStore = cookies();
        const adminAuth = cookieStore.get("admin_auth");

        if (!adminAuth) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { userId, plan } = await request.json();

        if (!userId || !plan) {
            return NextResponse.json(
                { error: "User ID and plan are required" },
                { status: 400 }
            );
        }

        // Valid plans
        if (!["FREE", "PRO"].includes(plan)) {
            return NextResponse.json(
                { error: "Invalid plan. Must be FREE or PRO" },
                { status: 400 }
            );
        }

        // Update user with plan and full access
        const monthlyLimit = plan === "PRO" ? 999999 : 5; // PRO = unlimited, FREE = 5

        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                plan: plan,
                hasFullAccess: true,
                creditsUsed: 0, // Reset credits when granting plan
                dailyResumeCount: 0 // Reset daily count
            }
        });

        return NextResponse.json({
            success: true,
            message: `${plan} plan access granted successfully`,
            user: {
                id: user.id,
                email: user.email,
                plan: user.plan,
                hasFullAccess: user.hasFullAccess
            }
        });

    } catch (error: any) {
        console.error("Grant plan error:", error);
        return NextResponse.json(
            { error: "Failed to grant plan access", details: error.message },
            { status: 500 }
        );
    }
}

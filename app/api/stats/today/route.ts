import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getUserId } from "@/app/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        // Get today's date range (midnight to now)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Count total resumes generated today (system-wide - no auth required)
        const todayCount = await prisma.resumeLog.count({
            where: {
                createdAt: {
                    gte: today,
                    lt: tomorrow
                },
                status: "SUCCESS"
            }
        });

        // Try to get user-specific stats if authenticated (optional)
        let userId: string | null = null;
        try {
            userId = await getUserId();
        } catch (error) {
            // User not authenticated - that's okay, we'll just return system stats
        }

        let userStats = {
            userTodayCount: 0,
            userDailyCount: 0,
            userTotalCredits: 0,
            lastResumeDate: null as Date | null,
            isAuthenticated: false
        };

        if (userId) {
            // Count resumes for current user today
            const userTodayCount = await prisma.resumeLog.count({
                where: {
                    userId: userId,
                    createdAt: {
                        gte: today,
                        lt: tomorrow
                    },
                    status: "SUCCESS"
                }
            });

            // Get user's daily limit info
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: {
                    dailyResumeCount: true,
                    lastResumeDate: true,
                    creditsUsed: true
                }
            });

            userStats = {
                userTodayCount: userTodayCount,
                userDailyCount: user?.dailyResumeCount || 0,
                userTotalCredits: user?.creditsUsed || 0,
                lastResumeDate: user?.lastResumeDate || null,
                isAuthenticated: true
            };
        }

        return NextResponse.json({
            success: true,
            stats: {
                totalTodayCount: todayCount,
                userTodayCount: userStats.userTodayCount,
                userDailyCount: userStats.userDailyCount,
                userTotalCredits: userStats.userTotalCredits,
                lastResumeDate: userStats.lastResumeDate,
                date: today.toISOString().split('T')[0],
                isAuthenticated: userStats.isAuthenticated
            }
        });

    } catch (error: any) {
        console.error("Stats Error:", error);
        return NextResponse.json({
            error: "Failed to fetch stats",
            message: error.message
        }, { status: 500 });
    }
}

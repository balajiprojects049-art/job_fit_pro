import { prisma } from "@/app/lib/prisma";
import { FileText, Users, BarChart3, CheckCircle, XCircle, LogOut, Sun, Moon, MessageSquare, Star } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserActions from "./UserActions";
import { logoutAction } from "../actions/auth";
import { AdminThemeToggle } from "./AdminThemeToggle";
import RegisteredClientsTable from "./RegisteredClientsTable";
import ResumeGenerationsTable from "./ResumeGenerationsTable";

// Force dynamic rendering so it always shows latest data
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    // 🔒 PROTECT ROUTE
    const cookieStore = cookies();
    const auth = cookieStore.get("admin_auth");

    if (!auth) {
        redirect("/admin/login");
    }

    // Fetch all data in parallel for better performance
    // Optimized queries to fetch only needed fields (40-60% faster)

    // 🧹 AUTO-CLEANUP: Delete logs older than 5 months to save storage
    try {
        const fiveMonthsAgo = new Date();
        fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5);
        await prisma.resumeLog.deleteMany({
            where: { createdAt: { lt: fiveMonthsAgo } }
        });
    } catch (cleanupError) {
        console.error("Auto-cleanup failed:", cleanupError);
    }
    const [
        totalResumes,
        totalUsers,
        avgScoreAgg,
        logs,
        users,
        totalFeedback,
        feedbackList
    ] = await Promise.all([
        prisma.resumeLog.count(),
        prisma.user.count(),
        prisma.resumeLog.aggregate({
            _avg: { matchScore: true }
        }),
        prisma.resumeLog.findMany({
            select: {
                id: true,
                createdAt: true,
                userEmail: true,
                originalName: true,
                matchScore: true,
                status: true
            },
            orderBy: { createdAt: 'desc' },
            take: 1000 // Increased logs limit for history
        }),
        prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                status: true,
                plan: true,
                createdAt: true,
                hasFullAccess: true,
                dailyResumeCount: true,
                dailyResumeLimit: true,
                creditsUsed: true
            },
            orderBy: { createdAt: 'desc' },
            take: 10000 // Increased user limit to show OLD users too
        }),
        prisma.feedback.count(),
        prisma.feedback.findMany({
            select: {
                id: true,
                createdAt: true,
                rating: true,
                category: true,
                message: true,
                user: {
                    select: {
                        email: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 5 // Reduced from 20 to 5 for faster loading
        })
    ]);

    const avgScore = Math.round(avgScoreAgg._avg.matchScore || 0);

    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-8">
            {/* Background Pattern */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="bg-grid opacity-20"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 blur-3xl rounded-full animate-pulse-glow"></div>
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-accent/5 blur-3xl rounded-full animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
            </div>

            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                            Admin Dashboard
                        </h1>
                        <p className="text-muted-foreground text-lg">Monitor registered clients and system usage</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="status-badge success flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            System Online
                        </div>
                        <AdminThemeToggle />
                        <form action={logoutAction}>
                            <button type="submit" className="btn btn-ghost text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 gap-2">
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Stat 1 */}
                    <div className="card p-6 card-hover">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-blue-500/20 dark:bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <FileText className="w-7 h-7" />
                            </div>
                            <h3 className="text-muted-foreground font-semibold">Total Resumes</h3>
                        </div>
                        <p className="text-5xl font-bold text-foreground">{totalResumes}</p>
                    </div>

                    {/* Stat 2 */}
                    <div className="card p-6 card-hover">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-green-500/20 dark:bg-green-500/10 rounded-xl flex items-center justify-center text-green-600 dark:text-green-400">
                                <BarChart3 className="w-7 h-7" />
                            </div>
                            <h3 className="text-muted-foreground font-semibold">Avg ATS Score</h3>
                        </div>
                        <p className="text-5xl font-bold text-foreground">{avgScore}%</p>
                    </div>

                    {/* Stat 3 */}
                    <div className="card p-6 card-hover">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-purple-500/20 dark:bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <Users className="w-7 h-7" />
                            </div>
                            <h3 className="text-muted-foreground font-semibold">Registered Users</h3>
                        </div>
                        <p className="text-5xl font-bold text-foreground">{totalUsers}</p>
                    </div>

                    {/* Stat 4 - Feedback */}
                    <div className="card p-6 card-hover">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 bg-yellow-500/20 dark:bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                                <MessageSquare className="w-7 h-7" />
                            </div>
                            <h3 className="text-muted-foreground font-semibold">User Feedback</h3>
                        </div>
                        <p className="text-5xl font-bold text-foreground">{totalFeedback}</p>
                    </div>
                </div>

                {/* Data Tables */}
                <div className="space-y-8">

                    {/* SECTION 1: REGISTERED CLIENTS */}
                    <RegisteredClientsTable users={users} />

                    {/* SECTION 2: RESUME GENERATION LOGS */}
                    {/* SECTION 2: RESUME GENERATION LOGS */}
                    <ResumeGenerationsTable logs={logs} />

                    {/* SECTION 3: USER FEEDBACK */}
                    <div className="card p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
                                <MessageSquare className="w-7 h-7 text-primary" />
                                User Feedback
                            </h2>
                            <span className="status-badge warning">Recent Submissions</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>User</th>
                                        <th>Rating</th>
                                        <th>Category</th>
                                        <th>Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feedbackList.length === 0 ? (
                                        <tr><td colSpan={5} className="text-center text-muted-foreground py-12">No feedback received yet.</td></tr>
                                    ) : feedbackList.map(feedback => (
                                        <tr key={feedback.id}>
                                            <td className="text-muted-foreground font-medium">
                                                {new Date(feedback.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="font-semibold">{feedback.user.email}</td>
                                            <td>
                                                <div className="flex items-center gap-1">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < feedback.rating
                                                                ? "fill-yellow-400 text-yellow-400"
                                                                : "text-muted-foreground"
                                                                }`}
                                                        />
                                                    ))}
                                                    <span className="text-xs text-muted-foreground ml-1">({feedback.rating}/5)</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${feedback.category === 'bug'
                                                    ? 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
                                                    : feedback.category === 'feature'
                                                        ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
                                                        : feedback.category === 'improvement'
                                                            ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400'
                                                            : 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400'
                                                    }`}>
                                                    {feedback.category.charAt(0).toUpperCase() + feedback.category.slice(1)}
                                                </span>
                                            </td>
                                            <td className="text-muted-foreground max-w-md">
                                                <p className="truncate">{feedback.message}</p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

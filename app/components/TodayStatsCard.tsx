"use client";

import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Calendar, Zap } from "lucide-react";

interface StatsData {
    totalTodayCount: number;
    userTodayCount: number;
    userDailyCount: number;
    userTotalCredits: number;
    lastResumeDate: string;
    date: string;
}

export default function TodayStatsCard() {
    const [stats, setStats] = useState<StatsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
        // Refresh every 30 seconds
        const interval = setInterval(fetchStats, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch("/api/stats/today");
            if (response.ok) {
                const data = await response.json();
                setStats(data.stats);
            }
        } catch (error) {
            console.error("Failed to fetch stats:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="card p-6 animate-pulse">
                <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-muted rounded w-3/4"></div>
            </div>
        );
    }

    if (!stats) return null;

    const DAILY_LIMIT = 50; // Match the limit in your route.ts
    const percentUsed = (stats.userTodayCount / DAILY_LIMIT) * 100;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* User Today Count */}
            <div className="card p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Today
                    </span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">
                        {stats.userTodayCount}
                    </span>
                    <span className="text-sm text-muted-foreground">/ {DAILY_LIMIT}</span>
                </div>
                <div className="mt-2 w-full bg-muted rounded-full h-1.5">
                    <div
                        className="bg-blue-600 h-1.5 rounded-full transition-all"
                        style={{ width: `${Math.min(percentUsed, 100)}%` }}
                    />
                </div>
            </div>

            {/* System Total Today */}
            <div className="card p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        System
                    </span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">
                        {stats.totalTodayCount}
                    </span>
                    <span className="text-sm text-muted-foreground">total</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                    All users combined
                </p>
            </div>

            {/* Total Credits Used */}
            <div className="card p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Total Credits
                    </span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">
                        {stats.userTotalCredits}
                    </span>
                    <span className="text-sm text-muted-foreground">used</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                    All time total
                </p>
            </div>

            {/* Remaining Today */}
            <div className="card p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Remaining
                    </span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">
                        {Math.max(0, DAILY_LIMIT - stats.userTodayCount)}
                    </span>
                    <span className="text-sm text-muted-foreground">left</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                    Resets at midnight
                </p>
            </div>
        </div>
    );
}

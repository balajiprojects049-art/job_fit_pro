"use client";

import Link from "next/link";
import { Zap, Calendar, TrendingUp } from "lucide-react";

interface SubscriptionStatsProps {
    plan: string;
    creditsUsed: number;
    maxCredits: number;
    daysLeft: number;
    dailyUsed: number;
    dailyLimit: number;
}

export default function SubscriptionStats({
    plan,
    creditsUsed,
    maxCredits,
    daysLeft,
    dailyUsed,
    dailyLimit
}: SubscriptionStatsProps) {
    const monthlyPercent = Math.min((creditsUsed / maxCredits) * 100, 100);
    const dailyPercent = Math.min((dailyUsed / dailyLimit) * 100, 100);
    const daysPercent = Math.min((daysLeft / 30) * 100, 100);

    return (
        <div className="md:col-span-1 space-y-4">
            {/* PLAN CARD */}
            <div className="card p-6 relative overflow-hidden group border-primary/20 bg-gradient-to-br from-card to-muted/50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-primary/20 transition-all duration-500" />

                <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="p-2 bg-primary/20 rounded-lg">
                        <Zap className="w-5 h-5 text-primary fill-current" />
                    </div>
                    <div>
                        <h3 className="font-bold text-foreground text-lg tracking-wide">{plan} PLAN</h3>
                        <p className="text-xs text-muted-foreground font-medium">Active Subscription</p>
                    </div>
                </div>

                {/* DAILY LIMIT BAR */}
                <div className="mb-4 relative z-10">
                    <div className="flex justify-between items-center text-xs mb-2">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-blue-500" />
                            <span className="text-muted-foreground font-medium">Daily Limit</span>
                        </div>
                        <span className={`font-bold ${dailyUsed >= dailyLimit ? 'text-red-600 dark:text-red-400' : 'text-foreground'}`}>
                            {dailyUsed} / {dailyLimit}
                        </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden border border-border">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${dailyUsed >= dailyLimit
                                    ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse'
                                    : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                                }`}
                            style={{ width: `${dailyPercent}%` }}
                        />
                    </div>
                    {dailyUsed >= dailyLimit && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1 font-medium">
                            🔴 Daily limit reached! Resets tomorrow.
                        </p>
                    )}
                </div>

                {/* MONTHLY LIMIT BAR */}
                <div className="mb-4 relative z-10">
                    <div className="flex justify-between items-center text-xs mb-2">
                        <div className="flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-primary" />
                            <span className="text-muted-foreground font-medium">Monthly Limit</span>
                        </div>
                        <span className={`font-bold ${creditsUsed >= maxCredits ? 'text-red-600 dark:text-red-400' : 'text-foreground'}`}>
                            {creditsUsed} / {maxCredits}
                        </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden border border-border">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(var(--primary),0.5)] ${creditsUsed >= maxCredits
                                    ? 'bg-gradient-to-r from-red-500 to-orange-500 animate-pulse'
                                    : 'bg-gradient-to-r from-primary to-accent'
                                }`}
                            style={{ width: `${monthlyPercent}%` }}
                        />
                    </div>
                    {creditsUsed >= maxCredits && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1 font-medium">
                            🔴 Monthly limit reached! {plan === "FREE" && "Upgrade to PRO for more."}
                        </p>
                    )}
                </div>

                {/* DAYS LEFT BAR */}
                <div className="relative z-10">
                    <div className="flex justify-between text-xs text-muted-foreground mb-2">
                        <span>Time Remaining</span>
                        <span className="text-foreground font-bold">{daysLeft} Days</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden border border-border">
                        <div
                            className="h-full bg-secondary rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${daysPercent}%` }}
                        />
                    </div>
                </div>
            </div>


            {plan === "FREE" && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-status-blocked/10 to-orange-500/10 border border-status-blocked/20 text-center">
                    <p className="text-xs text-foreground mb-2 font-medium">Need more power?</p>
                    <Link
                        href="/dashboard/upgrade"
                        className="btn w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-orange-500/20"
                    >
                        Upgrade to PRO 🚀
                    </Link>
                </div>
            )}
        </div>
    );
}

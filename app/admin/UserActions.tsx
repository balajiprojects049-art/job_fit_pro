"use client";

import { useState } from "react";
import { Check, X, Loader2, Gift, Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ToastProvider";
import { useConfirmDialog } from "@/components/ConfirmDialog";

export default function UserActions({
    userId,
    status,
    plan,
    hasFullAccess,
    creditsUsed
}: {
    userId: string;
    status: string;
    plan: string;
    hasFullAccess: boolean;
    creditsUsed?: number;
}) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { showToast } = useToast();
    const { showConfirm } = useConfirmDialog();

    const handleAction = async (action: "APPROVE" | "REJECT") => {
        showConfirm(`Are you sure you want to ${action.toLowerCase()} this user?`, async () => {
            setLoading(true);
            try {
                await fetch("/api/admin/approve-user", {
                    method: "POST",
                    body: JSON.stringify({ userId, action }),
                    headers: { "Content-Type": "application/json" }
                });
                showToast(`User ${action.toLowerCase()}d successfully`, "success");
                router.refresh();
            } catch (e) {
                showToast("Failed to update user", "error");
            } finally {
                setLoading(false);
            }
        });
    };

    const handleGrantPlan = async (planType: "FREE" | "PRO") => {
        showConfirm(`Grant ${planType} plan access to this user?`, async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/admin/grant-plan", {
                    method: "POST",
                    body: JSON.stringify({ userId, plan: planType }),
                    headers: { "Content-Type": "application/json" }
                });

                if (response.ok) {
                    showToast(`${planType} plan access granted successfully!`, "success");
                    router.refresh();
                } else {
                    const data = await response.json();
                    showToast(data.error || "Failed to grant plan access", "error");
                }
            } catch (e) {
                showToast("Failed to grant plan access", "error");
            } finally {
                setLoading(false);
            }
        });
    };

    // If user is rejected
    if (status === "REJECTED") {
        return <span className="status-badge error">REJECTED</span>;
    }

    // If user is pending approval
    if (status === "PENDING") {
        return (
            <div className="flex gap-2">
                <button
                    onClick={() => handleAction("APPROVE")}
                    disabled={loading}
                    className="p-2 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-500/30 transition disabled:opacity-50 border border-green-200 dark:border-green-500/20"
                    title="Approve User"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                </button>
                <button
                    onClick={() => handleAction("REJECT")}
                    disabled={loading}
                    className="p-2 bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-500/30 transition disabled:opacity-50 border border-red-200 dark:border-red-500/20"
                    title="Reject User"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                </button>
            </div>
        );
    }

    // If user is approved/active but no plan assigned yet
    if ((status === "APPROVED" || status === "ACTIVE") && !hasFullAccess) {
        return (
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <button
                        onClick={() => handleGrantPlan("FREE")}
                        disabled={loading}
                        className="flex items-center gap-1 px-3 py-2 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-500/30 transition disabled:opacity-50 border border-blue-200 dark:border-blue-500/20 text-xs font-semibold"
                        title="Grant FREE Plan (5 resumes/month)"
                    >
                        {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Gift className="w-3 h-3" />}
                        <span>FREE Plan</span>
                    </button>
                    <button
                        onClick={() => handleGrantPlan("PRO")}
                        disabled={loading}
                        className="flex items-center gap-1 px-3 py-2 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-500/30 transition disabled:opacity-50 border border-yellow-200 dark:border-yellow-500/20 text-xs font-semibold"
                        title="Grant PRO Plan (Unlimited resumes)"
                    >
                        {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Crown className="w-3 h-3" />}
                        <span>PRO Plan</span>
                    </button>
                </div>
                <span className="text-xs text-muted-foreground">⏳ Awaiting plan assignment</span>
            </div>
        );
    }

    // If user has full access
    if (hasFullAccess) {
        const isFREE = plan === "FREE";
        const limitReached = creditsUsed !== undefined && creditsUsed >= 5;

        return (
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                    <span className={`status-badge ${plan === "PRO" ? "warning" : "success"}`}>
                        {plan === "PRO" ? "⭐ PRO" : "🎁 FREE"} PLAN
                    </span>
                    <span className="text-xs text-muted-foreground">✓ Full Access</span>
                    {isFREE && creditsUsed !== undefined && (
                        <span className={`text-xs font-medium ${limitReached ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'}`}>
                            {creditsUsed}/5 used {limitReached && '🔴'}
                        </span>
                    )}
                </div>

                {/* Show Upgrade to PRO button for FREE users */}
                {isFREE && (
                    <button
                        onClick={() => handleGrantPlan("PRO")}
                        disabled={loading}
                        className={`flex items-center justify-center gap-1 px-3 py-2 rounded-lg transition disabled:opacity-50 text-xs font-semibold ${limitReached
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 animate-pulse'
                            : 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-500/30 border border-yellow-200 dark:border-yellow-500/20'
                            }`}
                        title="Upgrade user to PRO Plan"
                    >
                        {loading ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                            <>
                                <Crown className="w-3 h-3" />
                                <span>{limitReached ? '🚀 UPGRADE TO PRO' : 'Upgrade to PRO'}</span>
                            </>
                        )}
                    </button>
                )}
            </div>
        );
    }

    // Fallback
    return <span className="status-badge">Unknown Status</span>;
}

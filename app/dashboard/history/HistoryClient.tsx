"use client";

import { useState, useMemo } from "react";
import { FileText, Download, Clock, CheckCircle, AlertCircle, Calendar, Filter, X } from "lucide-react";

interface ResumeLog {
    id: string;
    jobTitle: string | null;
    companyName: string | null;
    matchScore: number | null;
    createdAt: Date;
    originalName: string | null;
    userEmail: string | null;
}

interface HistoryClientProps {
    history: ResumeLog[];
}

export default function HistoryClient({ history }: HistoryClientProps) {
    const [filterScore, setFilterScore] = useState<"all" | "high" | "medium" | "low">("all");
    const [searchQuery, setSearchQuery] = useState("");

    // Get date label for grouping
    const getDateLabel = (date: Date) => {
        const resumeDate = new Date(date);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        resumeDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        yesterday.setHours(0, 0, 0, 0);

        if (resumeDate.getTime() === today.getTime()) {
            return "Today";
        } else if (resumeDate.getTime() === yesterday.getTime()) {
            return "Yesterday";
        } else {
            return resumeDate.toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        }
    };

    // Filter history
    const filteredHistory = useMemo(() => {
        return history.filter(item => {
            // Search filter
            const matchesSearch = searchQuery === "" ||
                item.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.originalName?.toLowerCase().includes(searchQuery.toLowerCase());

            // Score filter
            const score = item.matchScore || 0;
            const matchesScore = filterScore === "all" ||
                (filterScore === "high" && score >= 90) ||
                (filterScore === "medium" && score >= 75 && score < 90) ||
                (filterScore === "low" && score < 75);

            return matchesSearch && matchesScore;
        });
    }, [history, searchQuery, filterScore]);

    // Group by date
    const groupedHistory = useMemo(() => {
        const groups: { [key: string]: ResumeLog[] } = {};

        filteredHistory.forEach(item => {
            const label = getDateLabel(new Date(item.createdAt));
            if (!groups[label]) {
                groups[label] = [];
            }
            groups[label].push(item);
        });

        return groups;
    }, [filteredHistory]);

    const getScoreBadge = (score: number | null) => {
        if (!score) return "status-badge";
        if (score >= 90) return "status-badge success";
        if (score >= 75) return "status-badge warning";
        return "status-badge error";
    };

    return (
        <div className="p-6 space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">History</h1>
                    <p className="text-muted-foreground text-lg">Track all your resume generation activity</p>
                </div>
                <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-bold">
                    Total Activities: {history.length}
                </div>
            </div>

            {/* Filters */}
            <div className="card p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Search */}
                    <div className="md:col-span-12 relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by company, role, or filename..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="form-input pl-12 pr-10 w-full"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded transition-colors"
                            >
                                <X className="w-4 h-4 text-muted-foreground" />
                            </button>
                        )}
                    </div>

                    {/* 🔒 SCORE FILTER - HIDDEN (Since ATS scores are not shown) */}
                    {/* <div className="md:col-span-4 flex items-center gap-2">
                        <Filter className="w-4 h-4 text-muted-foreground hidden md:block" />
                        <select
                            value={filterScore}
                            onChange={(e) => setFilterScore(e.target.value as any)}
                            className="form-input w-full cursor-pointer"
                        >
                            <option value="all">All Scores</option>
                            <option value="high">⭐ High (90+)</option>
                            <option value="medium">📊 Medium (75-89)</option>
                            <option value="low">📉 Low (&lt;75)</option>
                        </select>
                    </div> */}
                </div>

                {/* Active Filters */}
                {(searchQuery || filterScore !== "all") && (
                    <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                            Showing <span className="font-bold text-foreground">{filteredHistory.length}</span> of {history.length} activities
                        </span>
                        {filterScore !== "all" && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded text-xs font-medium">
                                Score: {filterScore}
                                <button onClick={() => setFilterScore("all")}>
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Grouped History */}
            {Object.keys(groupedHistory).length === 0 ? (
                <div className="card p-12 text-center">
                    <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2">No activity found</h3>
                    <p className="text-muted-foreground">
                        {searchQuery || filterScore !== "all"
                            ? "Try adjusting your filters"
                            : "Your resume generation history will appear here"}
                    </p>
                </div>
            ) : (
                <div className="space-y-8">
                    {Object.entries(groupedHistory).map(([dateLabel, dateItems]) => (
                        <div key={dateLabel}>
                            {/* Date Header */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg border-l-4 border-primary">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    <h2 className="text-lg font-bold text-foreground">{dateLabel}</h2>
                                    <span className="text-sm text-muted-foreground">({dateItems.length})</span>
                                </div>
                                <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
                            </div>

                            {/* Activity Cards */}
                            <div className="space-y-3">
                                {dateItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="card p-6 hover:shadow-lg transition-shadow border-l-4 border-l-green-500"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-start gap-4 flex-1">
                                                {/* Icon */}
                                                <div className="p-3 bg-green-100 dark:bg-green-500/20 rounded-xl">
                                                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-lg font-bold text-foreground">Resume Generated</h3>
                                                        <FileText className="w-4 h-4 text-muted-foreground" />
                                                    </div>

                                                    <p className="text-sm text-muted-foreground mb-3">
                                                        Created tailored resume for{" "}
                                                        <span className="font-semibold text-foreground">
                                                            {item.jobTitle || "Unknown Position"}
                                                        </span>
                                                        {" at "}
                                                        <span className="font-semibold text-primary">
                                                            {item.companyName || "Unknown Company"}
                                                        </span>
                                                    </p>

                                                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            <span>
                                                                {new Date(item.createdAt).toLocaleTimeString('en-US', {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })}
                                                            </span>
                                                        </div>
                                                        {item.originalName && (
                                                            <div className="flex items-center gap-1">
                                                                <Download className="w-3 h-3" />
                                                                <span className="font-mono">{item.originalName}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 🔒 ATS SCORE BADGE - HIDDEN (Not needed by user) */}
                                            {/* {item.matchScore && (
                                                <div className="flex-shrink-0">
                                                    <span className={getScoreBadge(item.matchScore)}>
                                                        {item.matchScore}% Match
                                                    </span>
                                                </div>
                                            )} */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

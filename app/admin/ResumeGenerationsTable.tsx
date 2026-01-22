"use client";

import { useState, useMemo, useEffect } from "react";
import { FileText, CheckCircle, XCircle, Search, X, Filter } from "lucide-react";

interface ResumeLog {
    id: string;
    createdAt: Date;
    userEmail: string | null;
    originalName: string | null;
    matchScore: number | null;
    status: string;
}

interface ResumeGenerationsTableProps {
    logs: ResumeLog[];
}

export default function ResumeGenerationsTable({ logs: initialLogs }: ResumeGenerationsTableProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("ALL");
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 10;

    // Filter logs based on search and filters
    const filteredLogs = useMemo(() => {
        let filtered = initialLogs;

        // Apply search filter (Email, File Name)
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(log =>
                (log.userEmail?.toLowerCase() || "").includes(query) ||
                (log.originalName?.toLowerCase() || "").includes(query)
            );
        }

        // Apply status filter
        if (statusFilter !== "ALL") {
            filtered = filtered.filter(log => log.status === statusFilter);
        }

        return filtered;
    }, [initialLogs, searchQuery, statusFilter]);

    // Reset to page 1 whenever filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusFilter]);

    // Pagination
    const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedLogs = filteredLogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="card overflow-hidden">
            <div className="p-6 border-b border-border bg-muted/30">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <FileText className="w-6 h-6 text-accent" />
                        Resume Generations
                    </h2>
                    <span className="status-badge success">Real-time Activity</span>
                </div>

                {/* Search Bar and Filters */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                    {/* Search Input */}
                    <div className="md:col-span-8 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by email or file name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="form-input pl-12 pr-10 w-full"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-lg transition-colors"
                            >
                                <X className="w-4 h-4 text-muted-foreground" />
                            </button>
                        )}
                    </div>

                    {/* Status Filter */}
                    <div className="md:col-span-4 flex items-center gap-2">
                        <Filter className="w-4 h-4 text-muted-foreground hidden md:block" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="form-input w-full cursor-pointer"
                        >
                            <option value="ALL">All Status</option>
                            <option value="SUCCESS">✅ Success</option>
                            <option value="FAILED">❌ Failed</option>
                        </select>
                    </div>
                </div>

                {/* Results count */}
                {(searchQuery || statusFilter !== "ALL") && (
                    <div className="mt-3 flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">
                            Found <span className="font-bold text-foreground">{filteredLogs.length}</span> records
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setStatusFilter("ALL");
                            }}
                            className="text-xs text-primary hover:underline font-medium ml-2"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Date & Time</th>
                            <th>User / Email</th>
                            <th>File Name</th>
                            <th>Match Score</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedLogs.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center text-muted-foreground py-12">
                                    No records found.
                                </td>
                            </tr>
                        ) : paginatedLogs.map((log) => (
                            <tr key={log.id}>
                                <td className="text-muted-foreground font-medium">
                                    {new Date(log.createdAt).toLocaleString()}
                                </td>
                                <td className="font-semibold">
                                    {log.userEmail || "Anonymous"}
                                </td>
                                <td className="text-muted-foreground">{log.originalName}</td>
                                <td>
                                    <span className={`status-badge ${(log.matchScore || 0) >= 90 ? 'success' :
                                        (log.matchScore || 0) >= 75 ? 'warning' :
                                            'error'
                                        }`}>
                                        {log.matchScore || 0}%
                                    </span>
                                </td>
                                <td>
                                    {log.status === 'SUCCESS' ? (
                                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-semibold">
                                            <CheckCircle className="w-4 h-4" /> Success
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-semibold">
                                            <XCircle className="w-4 h-4" /> Failed
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION CONTROLS */}
            {totalPages > 1 && (
                <div className="p-4 border-t border-border flex items-center justify-between bg-muted/10">
                    <p className="text-sm text-muted-foreground">
                        Showing <span className="font-bold">{startIndex + 1}</span> to <span className="font-bold">{Math.min(startIndex + ITEMS_PER_PAGE, filteredLogs.length)}</span> of {filteredLogs.length} records
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="btn btn-ghost text-sm disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <div className="flex items-center gap-1">
                            <span className="text-sm font-medium px-2">
                                Page {currentPage} of {totalPages}
                            </span>
                        </div>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="btn btn-ghost text-sm disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

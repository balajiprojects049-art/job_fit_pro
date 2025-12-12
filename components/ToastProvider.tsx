"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CheckCircle, XCircle, Info, AlertCircle, X } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (message: string, type: ToastType = "info") => {
        const id = Math.random().toString(36).substring(7);
        const newToast: Toast = { id, message, type };

        setToasts((prev) => [...prev, newToast]);

        // Auto-remove after 4 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 4000);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const getIcon = (type: ToastType) => {
        switch (type) {
            case "success":
                return <CheckCircle className="w-5 h-5" />;
            case "error":
                return <XCircle className="w-5 h-5" />;
            case "warning":
                return <AlertCircle className="w-5 h-5" />;
            default:
                return <Info className="w-5 h-5" />;
        }
    };

    const getStyles = (type: ToastType) => {
        switch (type) {
            case "success":
                return "bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-300";
            case "error":
                return "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-300";
            case "warning":
                return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 text-yellow-800 dark:text-yellow-300";
            default:
                return "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-800 dark:text-blue-300";
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border-2 shadow-xl backdrop-blur-sm animate-slide-in-right max-w-md ${getStyles(toast.type)}`}
                    >
                        <div className="flex-shrink-0">
                            {getIcon(toast.type)}
                        </div>
                        <p className="flex-1 text-sm font-semibold">
                            {toast.message}
                        </p>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="flex-shrink-0 p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within ToastProvider");
    }
    return context;
}

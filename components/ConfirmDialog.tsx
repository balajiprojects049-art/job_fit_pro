"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { AlertCircle, X } from "lucide-react";

interface ConfirmDialogContextType {
    showConfirm: (message: string, onConfirm: () => void) => void;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextType | undefined>(undefined);

export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [onConfirmCallback, setOnConfirmCallback] = useState<(() => void) | null>(null);

    const showConfirm = (msg: string, callback: () => void) => {
        setMessage(msg);
        setOnConfirmCallback(() => callback);
        setIsOpen(true);
    };

    const handleConfirm = () => {
        if (onConfirmCallback) {
            onConfirmCallback();
        }
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <ConfirmDialogContext.Provider value={{ showConfirm }}>
            {children}

            {/* Confirm Dialog Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={handleCancel}
                    ></div>

                    {/* Dialog */}
                    <div className="relative bg-card border-2 border-border rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-scale-in">
                        {/* Header */}
                        <div className="p-6 border-b border-border">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-yellow-500/20 rounded-xl">
                                    <AlertCircle className="w-6 h-6 text-yellow-500" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground">Confirm Action</h3>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="p-6">
                            <p className="text-muted-foreground">{message}</p>
                        </div>

                        {/* Actions */}
                        <div className="p-6 border-t border-border flex gap-3 justify-end">
                            <button
                                onClick={handleCancel}
                                className="px-6 py-2.5 rounded-xl font-semibold text-muted-foreground hover:bg-muted transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold shadow-lg transition-all"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ConfirmDialogContext.Provider>
    );
}

export function useConfirmDialog() {
    const context = useContext(ConfirmDialogContext);
    if (!context) {
        throw new Error("useConfirmDialog must be used within ConfirmDialogProvider");
    }
    return context;
}

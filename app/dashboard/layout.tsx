import { Sidebar } from "@/components/dashboard/Sidebar";
import { ToastProvider } from "@/components/ToastProvider";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ToastProvider>
            <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
                {/* Background Elements */}
                <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div className="bg-grid opacity-30"></div>
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 blur-3xl rounded-full animate-pulse-glow"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 blur-3xl rounded-full animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
                </div>

                <Sidebar />

                <main className="relative z-10 ml-64 transition-all duration-300">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </ToastProvider>
    );
}

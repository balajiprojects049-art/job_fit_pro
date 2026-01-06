import { loginAction } from "@/app/actions/auth";
import { Lock, ArrowRight, Shield, Zap, Award } from "lucide-react";

const securityQuotes = [
    "Secure access to powerful insights",
    "Managing excellence, one user at a time",
    "Your control center for success"
];

export default function AdminLogin() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="bg-grid opacity-30"></div>

                {/* Large Gradient Orbs */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-primary/30 to-accent/30 blur-3xl rounded-full animate-pulse-glow"></div>
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-tl from-accent/30 to-primary/30 blur-3xl rounded-full animate-pulse-glow" style={{ animationDelay: "1.5s" }}></div>

                {/* Floating Particles Effect */}
                <div className="absolute top-20 left-1/4 w-2 h-2 bg-primary rounded-full animate-float opacity-40"></div>
                <div className="absolute top-40 right-1/3 w-3 h-3 bg-accent rounded-full animate-float opacity-30" style={{ animationDelay: "0.5s" }}></div>
                <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-primary rounded-full animate-float opacity-40" style={{ animationDelay: "1s" }}></div>
                <div className="absolute bottom-20 right-1/4 w-3 h-3 bg-accent rounded-full animate-float opacity-30" style={{ animationDelay: "1.5s" }}></div>
            </div>

            {/* Main Content Container */}
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center z-10">

                {/* Left Side - Branding & Info */}
                <div className="hidden lg:block space-y-8 animate-fade-in">
                    <div className="space-y-6">
                        {/* Logo */}
                        {/* Logo */}
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 animate-bounce-slow">
                                <span className="font-bold text-white text-3xl">R</span>
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-foreground">ResumeLab</h1>
                                <p className="text-primary font-semibold">Admin Portal</p>
                            </div>
                        </div>

                        {/* Quote Carousel */}
                        <div className="space-y-4 p-6 rounded-2xl bg-muted/50 border border-border backdrop-blur-sm">
                            <div className="flex items-start gap-3">
                                <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-xl font-semibold text-foreground mb-2">
                                        "{securityQuotes[0]}"
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Administrator Access Portal
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20">
                                <Zap className="w-4 h-4" />
                                <span className="text-sm font-semibold">Real-time Monitoring</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full border border-accent/20">
                                <Award className="w-4 h-4" />
                                <span className="text-sm font-semibold">User Management</span>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center p-4 rounded-xl bg-card border border-border">
                                <p className="text-3xl font-bold text-primary">99.9%</p>
                                <p className="text-xs text-muted-foreground mt-1">Uptime</p>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-card border border-border">
                                <p className="text-3xl font-bold text-accent">24/7</p>
                                <p className="text-xs text-muted-foreground mt-1">Access</p>
                            </div>
                            <div className="text-center p-4 rounded-xl bg-card border border-border">
                                <p className="text-3xl font-bold text-foreground">∞</p>
                                <p className="text-xs text-muted-foreground mt-1">Control</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <div className="glass-card p-8 md:p-10 shadow-2xl">
                        {/* Top Branding - Always Visible */}
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/40 animate-bounce-slow">
                                <span className="font-bold text-white text-2xl">R</span>
                            </div>
                            <div className="text-center lg:text-left">
                                <h1 className="text-2xl md:text-3xl font-bold text-foreground">ResumeLab</h1>
                                <p className="text-sm text-primary font-semibold">Admin Portal</p>
                            </div>
                        </div>

                        {/* Form Header */}
                        <div className="mb-8 text-center">
                            <div className="inline-flex items-center justify-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <Lock className="w-6 h-6 text-primary" />
                                </div>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Welcome Back</h2>
                            <p className="text-muted-foreground text-sm md:text-base">
                                Enter your credentials to access the admin dashboard
                            </p>
                        </div>

                        {/* Login Form */}
                        <form action={loginAction} className="space-y-6">
                            <div>
                                <label className="form-label flex items-center gap-2">
                                    <Lock className="w-4 h-4" />
                                    Admin Password
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    className="form-input text-lg"
                                    placeholder="••••••••"
                                    required
                                    autoFocus
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-full py-4 text-base shadow-2xl gap-2 group"
                            >
                                <span>Access Dashboard</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        {/* Security Notice */}
                        <div className="mt-8 pt-6 border-t border-border">
                            <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50">
                                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-semibold text-foreground mb-1">
                                        Secure Access
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        All login attempts are monitored and logged for security purposes.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Quote */}
                        <p className="text-center text-xs text-muted-foreground mt-6 italic">
                            "Excellence in management begins with secure access"
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>System Status: Online</span>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Shield, Zap, Award, Star, Users, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" }
            });

            if (!res.ok) throw new Error(await res.text());

            router.push("/dashboard");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

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
            <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-6 items-center z-10">

                {/* Left Side - Branding & Info */}
                <div className="hidden lg:block space-y-6 animate-fade-in pr-4">
                    <div className="space-y-5">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 animate-bounce-slow">
                                <span className="font-bold text-white text-xl">R</span>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-foreground">ResumeLab</h1>
                                <p className="text-primary font-semibold text-sm">User Portal</p>
                            </div>
                        </div>

                        {/* Quote Carousel / Main Value Prop */}
                        <div className="space-y-3 p-5 rounded-2xl bg-muted/50 border border-border backdrop-blur-sm">
                            <div className="flex items-start gap-3">
                                <Star className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                                <div>
                                    <p className="text-base font-semibold text-foreground mb-1">
                                        "Accelerate your career journey with AI-powered tools."
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Create tailored resumes, track applications, and land your dream job faster.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-2">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-500 rounded-xl border border-blue-500/20">
                                <Zap className="w-3 h-3" />
                                <span className="text-xs font-semibold">AI Resume</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-500 rounded-xl border border-green-500/20">
                                <CheckCircle className="w-3 h-3" />
                                <span className="text-xs font-semibold">ATS Ready</span>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 text-purple-500 rounded-xl border border-purple-500/20">
                                <Award className="w-3 h-3" />
                                <span className="text-xs font-semibold">Smart Match</span>
                            </div>
                        </div>

                        {/* Support Card (WhatsApp) */}
                        <div className="p-5 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-500/20 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm">
                                    <span className="text-lg">👋</span> Need Assistance?
                                </h3>
                            </div>
                            <p className="text-xs text-muted-foreground mb-4">
                                Facing issues? Contact admin directly on WhatsApp.
                            </p>
                            <a
                                href="https://wa.me/13465099491"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn bg-[#25D366] hover:bg-[#20bd5a] text-white border-none w-full flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all py-2.5 rounded-xl font-bold text-sm"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-4 h-4"
                                >
                                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                                </svg>
                                Contact Admin
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <div className="glass-card p-6 md:p-8 shadow-2xl relative overflow-hidden rounded-[2rem]">

                        {/* Mobile Header (only visible on small screens) */}
                        <div className="lg:hidden text-center mb-6">
                            <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
                                <span className="font-bold text-white text-xl">R</span>
                            </div>
                            <h1 className="text-xl font-bold text-foreground">Welcome Back</h1>
                        </div>

                        {/* Desktop Header */}
                        <div className="hidden lg:block mb-6 text-center">
                            <h2 className="text-2xl font-bold text-foreground mb-1">Welcome Back</h2>
                            <p className="text-muted-foreground text-sm">
                                Enter your credentials to access your dashboard
                            </p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email Input */}
                            <div>
                                <label className="form-label flex items-center gap-2 ml-1 text-xs">
                                    <Mail className="w-3.5 h-3.5 text-primary" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="form-input text-base rounded-xl px-4 py-3"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <div className="flex justify-between items-center mb-1.5 ml-1">
                                    <label className="form-label flex items-center gap-2 mb-0 text-xs">
                                        <Lock className="w-3.5 h-3.5 text-primary" />
                                        Password
                                    </label>
                                    <Link href="/forgot-password" className="text-[10px] text-primary hover:underline font-medium uppercase tracking-wide">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="form-input text-base pr-10 rounded-xl px-4 py-3"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 rounded-xl text-xs font-medium flex items-start gap-2 animate-shake">
                                    <span className="text-base">⚠️</span>
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                disabled={loading}
                                type="submit"
                                className="btn btn-primary w-full py-3 text-sm font-bold shadow-lg flex items-center justify-center gap-2 group rounded-xl mt-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Logging in...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-6 text-center bg-muted/30 p-4 rounded-2xl">
                            <p className="text-xs text-muted-foreground mb-1">
                                Don't have an account?
                            </p>
                            <Link href="/signup" className="text-primary hover:text-primary-dark font-bold text-sm hover:underline transition-all">
                                Create Account
                            </Link>
                        </div>

                        {/* Mobile WhatsApp Link */}
                        <div className="lg:hidden mt-6 text-center">
                            <a
                                href="https://wa.me/13465099491"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm font-medium text-[#25D366]"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>JobFit Pro • Secure Login</span>
            </div>
        </div>
    );
}

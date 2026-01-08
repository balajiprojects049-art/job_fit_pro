"use client";

import { useState } from "react";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validatePassword = (password: string): string | null => {
        if (password.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter";
        }
        if (!/[0-9]/.test(password)) {
            return "Password must contain at least one number";
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return "Password must contain at least one special character (!@#$%^&*...)";
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setPasswordError("");

        // Validate password strength
        const pwdError = validatePassword(formData.password);
        if (pwdError) {
            setPasswordError(pwdError);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" }
            });

            if (!res.ok) throw new Error(await res.text());

            // On success, redirect to login or dashboard
            // Usually redirect to login to sign in, or auto-login
            // For now, let's redirect to login with a success message query param if we could, 
            // but simple redirect is fine.
            router.push("/login");
            router.refresh();
        } catch (err: any) {
            setError(err.message || "Failed to create account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10 hero-gradient">
                <div className="bg-grid opacity-30"></div>
            </div>

            {/* Signup Card */}
            <div className="w-full max-w-md animate-fade-in-up">
                <div className="card glass-card p-8 md:p-10 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
                            <span className="font-bold text-white text-2xl">J</span>
                        </div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
                        <p className="text-muted-foreground">Join thousands of job seekers getting hired faster</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Name Input */}
                        <div>
                            <label className="form-label">
                                <User className="w-4 h-4 inline mr-2" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="form-input"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="form-label">
                                <Mail className="w-4 h-4 inline mr-2" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="form-input"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="form-label">
                                <Lock className="w-4 h-4 inline mr-2" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="form-input pr-12"
                                    value={formData.password}
                                    onChange={(e) => {
                                        setFormData({ ...formData, password: e.target.value });
                                        setPasswordError("");
                                    }}
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {/* Password Requirements */}
                            <div className="mt-2 text-xs text-muted-foreground space-y-1">
                                <p className="font-semibold">Password must contain:</p>
                                <ul className="list-disc list-inside space-y-0.5 ml-2">
                                    <li className={formData.password.length >= 8 ? "text-green-600 dark:text-green-400" : ""}>
                                        At least 8 characters
                                    </li>
                                    <li className={/[A-Z]/.test(formData.password) ? "text-green-600 dark:text-green-400" : ""}>
                                        One uppercase letter (A-Z)
                                    </li>
                                    <li className={/[a-z]/.test(formData.password) ? "text-green-600 dark:text-green-400" : ""}>
                                        One lowercase letter (a-z)
                                    </li>
                                    <li className={/[0-9]/.test(formData.password) ? "text-green-600 dark:text-green-400" : ""}>
                                        One number (0-9)
                                    </li>
                                    <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? "text-green-600 dark:text-green-400" : ""}>
                                        One special character (!@#$%...)
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Password Error */}
                        {passwordError && (
                            <div className="p-3 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 rounded-xl text-sm font-medium flex items-start gap-2">
                                <span className="text-lg">⚠️</span>
                                <span>{passwordError}</span>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 rounded-xl text-sm font-medium flex items-start gap-2">
                                <span className="text-lg">⚠️</span>
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            disabled={loading}
                            type="submit"
                            className="btn btn-primary w-full py-4 text-base font-bold shadow-xl"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary hover:text-primary-dark font-semibold transition-colors">
                                Sign in instead
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <p className="text-center text-muted-foreground text-sm mt-6">
                    By joining, you agree to our Terms and Privacy Policy
                </p>
            </div>
        </div>
    );
}

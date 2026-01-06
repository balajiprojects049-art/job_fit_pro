import Link from "next/link";
import { ArrowRight, Zap, Target, TrendingUp, FileCheck } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10 hero-gradient">
                <div className="bg-grid opacity-50"></div>
            </div>

            {/* Nav bar */}
            <nav className="relative z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                            <span className="font-bold text-white text-xl">R</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">ResumeLab</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/login" className="btn btn-ghost px-5 py-2">
                            Sign In
                        </Link>
                        <Link href="/signup" className="btn btn-primary">
                            Get Started <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary mb-8 animate-fade-in">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    v2.0 with AI-Powered ATS Scoring
                </div>

                {/* Hero Title */}
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 animate-fade-in-up leading-tight text-foreground">
                    Stop Applying Blindly.<br />
                    <span className="text-primary">Apply with Intelligence.</span>
                </h1>

                {/* Hero Description */}
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
                    ResumeLab doesn't just write your resume. It analyzes the job description,
                    calculates your ATS match score, and perfectly tailors your application
                    to <span className="text-primary font-semibold">get you hired 3x faster</span>.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20">
                    <Link href="/signup" className="btn btn-primary px-8 py-4 text-lg shadow-2xl shadow-primary/30 hover:shadow-primary/40">
                        <Zap className="w-5 h-5" />
                        Start Free Trial
                    </Link>
                    <Link href="/dashboard" className="btn btn-outline px-8 py-4 text-lg">
                        View Demo
                    </Link>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-24">
                    <div className="card glass-card p-8 text-left hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 group">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                            <Target className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-foreground">AI-Powered Tailoring</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Upload your resume and job description. Our AI instantly analyzes and optimizes
                            your resume to match exactly what recruiters are looking for.
                        </p>
                    </div>

                    <div className="card glass-card p-8 text-left hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 group">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                            <TrendingUp className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-foreground">ATS Match Score</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Know your chances before applying. Get a real-time compatibility score
                            and keyword suggestions to beat Applicant Tracking Systems.
                        </p>
                    </div>

                    <div className="card glass-card p-8 text-left hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 group">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6 shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                            <FileCheck className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-foreground">Track & Manage</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Kanban board, application history, and analytics—all in one beautiful dashboard.
                            Never lose track of your job search again.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

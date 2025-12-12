"use client";

import { FileText, Lock, Mail, CheckCircle } from "lucide-react";

export default function ViewOnlyNotice() {
    return (
        <div className="max-w-4xl mx-auto p-8">
            {/* Main Notice Card */}
            <div className="card p-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 dark:bg-yellow-500/20 rounded-full mb-6">
                    <Lock className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
                </div>

                <h2 className="text-3xl font-bold text-foreground mb-4">
                    Welcome to JobFit Pro! 🎉
                </h2>

                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Your account has been <span className="font-bold text-green-600 dark:text-green-400">approved</span>!
                    To unlock full access to our AI-powered resume generation, please follow the steps below.
                </p>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-6 mb-8 text-left">
                    {/* Step 1 */}
                    <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-500/5 border-2 border-blue-200 dark:border-blue-500/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full font-bold">
                                1
                            </div>
                            <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="font-bold text-lg text-foreground mb-2">Submit Your Resume</h3>
                        <p className="text-sm text-muted-foreground">
                            Send your current resume to our team for professional review and optimization.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-500/10 dark:to-purple-500/5 border-2 border-purple-200 dark:border-purple-500/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center justify-center w-10 h-10 bg-purple-600 text-white rounded-full font-bold">
                                2
                            </div>
                            <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="font-bold text-lg text-foreground mb-2">Expert Review</h3>
                        <p className="text-sm text-muted-foreground">
                            Our team will review, optimize, and send your enhanced resume back to you.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="card p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-500/10 dark:to-green-500/5 border-2 border-green-200 dark:border-green-500/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full font-bold">
                                3
                            </div>
                            <Lock className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="font-bold text-lg text-foreground mb-2">Get Full Access</h3>
                        <p className="text-sm text-muted-foreground">
                            Admin will grant you FREE or PRO plan access to unlock all features!
                        </p>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="card p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <Mail className="w-6 h-6 text-primary" />
                        <h3 className="font-bold text-xl text-foreground">Send Your Resume To:</h3>
                    </div>
                    <a
                        href="https://wa.me/14099197989?text=Hi%2C%20I%20would%20like%20to%20submit%20my%20resume%20for%20full%20access%20to%20JobFit%20Pro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-2xl font-bold text-primary hover:text-accent transition-colors"
                    >
                        <span className="text-3xl">📱</span>
                        <span>+1 (409) 919-7989</span>
                    </a>
                    <p className="text-sm text-muted-foreground mt-3">
                        WhatsApp us your resume for review
                    </p>
                    <a
                        href="https://wa.me/14099197989?text=Hi%2C%20I%20would%20like%20to%20submit%20my%20resume%20for%20full%20access%20to%20JobFit%20Pro"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        <span className="text-xl">💬</span>
                        <span>Open WhatsApp</span>
                    </a>
                </div>

                {/* Current Status */}
                <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground">
                        <span className="font-bold text-foreground">Current Status:</span>
                        <span className="ml-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 rounded-full text-xs font-bold">
                            ⏳ Awaiting Plan Assignment
                        </span>
                    </p>
                </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-500/10 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <span className="text-blue-600 dark:text-blue-400">ℹ️</span>
                    Why This Process?
                </h4>
                <p className="text-sm text-muted-foreground">
                    We're not just another automated tool - we provide <span className="font-bold">expert-guided resume optimization</span>.
                    By reviewing your resume first, we ensure you get the best possible results and personalized support throughout your job search journey.
                </p>
            </div>
        </div>
    );
}

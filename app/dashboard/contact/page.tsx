import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background p-6 animate-fade-in">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Contact Us</h1>
                    <p className="text-muted-foreground text-lg">
                        We're here to help! Reach out to us for any questions or support.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Contact Information Card */}
                    <div className="card p-8 space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <Mail className="w-6 h-6 text-primary" />
                                Get in Touch
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                Have questions about ResumeLab? Need help with your resume generation? We'd love to hear from you!
                            </p>
                        </div>

                        {/* Email */}
                        <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors">
                            <div className="p-3 bg-primary/20 rounded-lg">
                                <Mail className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold text-foreground mb-1">Email Us</h3>
                                <a
                                    href="mailto:resumelabproai007@gmail.com"
                                    className="text-primary hover:underline font-medium"
                                >
                                    resumelabproai007@gmail.com
                                </a>
                                <p className="text-xs text-muted-foreground mt-1">
                                    We typically respond within 24 hours
                                </p>
                            </div>
                        </div>

                        {/* Support Info */}
                        <div className="p-4 rounded-xl bg-muted border border-border">
                            <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                                <Send className="w-4 h-4 text-accent" />
                                What to Include
                            </h3>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-0.5">•</span>
                                    <span>Your account email address</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-0.5">•</span>
                                    <span>A detailed description of your issue</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-0.5">•</span>
                                    <span>Screenshots if applicable</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Quick Help Card */}
                    <div className="card p-8 space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-4">Quick Help</h2>
                            <p className="text-muted-foreground mb-6">
                                Find answers to common questions
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* FAQ Items */}
                            <div className="p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors border border-border">
                                <h3 className="font-semibold text-foreground mb-2">📝 How do I generate a resume?</h3>
                                <p className="text-sm text-muted-foreground">
                                    Click "New Application" in the sidebar, upload your base resume, paste the job description, and click "Generate Resume".
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors border border-border">
                                <h3 className="font-semibold text-foreground mb-2">💳 How do I upgrade my plan?</h3>
                                <p className="text-sm text-muted-foreground">
                                    Contact your administrator to upgrade your account plan and get access to more resume generations.
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors border border-border">
                                <h3 className="font-semibold text-foreground mb-2">📥 Where can I download my resumes?</h3>
                                <p className="text-sm text-muted-foreground">
                                    All your generated resumes are saved in "My Resumes". You can download them anytime from there.
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-muted hover:bg-muted/80 transition-colors border border-border">
                                <h3 className="font-semibold text-foreground mb-2">🔒 Is my data secure?</h3>
                                <p className="text-sm text-muted-foreground">
                                    Yes! We use industry-standard encryption to protect your personal information and resumes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Support Section */}
                <div className="mt-6 card p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/20 rounded-lg">
                            <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-foreground mb-2">Need Immediate Assistance?</h3>
                            <p className="text-muted-foreground mb-3">
                                For urgent matters or technical support, please email us directly at{" "}
                                <a
                                    href="mailto:resumelabproai007@gmail.com"
                                    className="text-primary hover:underline font-semibold"
                                >
                                    resumelabproai007@gmail.com
                                </a>
                                . We'll get back to you as soon as possible!
                            </p>
                            <p className="text-sm text-muted-foreground italic">
                                💡 Pro Tip: Include "URGENT" in your subject line for priority support.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

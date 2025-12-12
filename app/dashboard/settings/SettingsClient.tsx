"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Lock, Download, Trash2, Save, Calendar } from "lucide-react";
import { useToast } from "@/components/ToastProvider";

interface UserData {
    id: string;
    name: string | null;
    email: string;
    phone: string | null;
    createdAt: Date;
    profileImage?: string | null;
}

interface SettingsClientProps {
    user: UserData;
}

export default function SettingsClient({ user }: SettingsClientProps) {
    const router = useRouter();
    const { showToast } = useToast();
    const [name, setName] = useState(user.name || "");
    const [email, setEmail] = useState(user.email || "");
    const [phone, setPhone] = useState(user.phone || "");
    const [isLoading, setIsLoading] = useState(false);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            showToast("File size must be less than 2MB", "warning");
            return;
        }

        setIsUploadingPhoto(true);
        try {
            // Convert to base64
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64 = reader.result as string;

                // Upload to server
                const response = await fetch("/api/user/upload-photo", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ profileImage: base64 }),
                });

                if (response.ok) {
                    router.refresh();
                } else {
                    showToast("Failed to upload photo", "error");
                }
                setIsUploadingPhoto(false);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            showToast("Error uploading photo", "error");
            setIsUploadingPhoto(false);
        }
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/user/update-profile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone }),
            });

            if (response.ok) {
                showToast("Profile updated successfully!", "success");
                router.refresh();
            } else {
                showToast("Failed to update profile", "error");
            }
        } catch (error) {
            showToast("Error updating profile", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleExportData = async () => {
        try {
            const response = await fetch("/api/user/export-data");
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `jobfit-pro-data-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            showToast("Failed to export data", "error");
        }
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone!")) {
            if (window.confirm("This will permanently delete all your data. Are you absolutely sure?")) {
                try {
                    const response = await fetch("/api/user/delete-account", {
                        method: "DELETE",
                    });

                    if (response.ok) {
                        showToast("Account deleted successfully", "success");
                        router.push("/");
                    } else {
                        showToast("Failed to delete account", "error");
                    }
                } catch (error) {
                    showToast("Error deleting account", "error");
                }
            }
        }
    };

    return (
        <div className="p-6 max-w-4xl space-y-8 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Settings</h1>
                <p className="text-muted-foreground text-lg">Manage your account settings and preferences</p>
            </div>

            {/* Profile Section */}
            <div className="card p-6 space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-border">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <User className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Profile Information</h2>
                        <p className="text-sm text-muted-foreground">Update your personal details</p>
                    </div>
                </div>

                <div className="space-y-5">
                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="form-label">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="form-input"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-input pr-12"
                                placeholder="your@email.com"
                            />
                            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        </div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label htmlFor="phone" className="form-label">
                            Phone Number
                        </label>
                        <div className="relative">
                            <input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="form-input pr-12"
                                placeholder="+1 (234) 567-8900"
                            />
                            <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        </div>
                    </div>

                    {/* Member Since */}
                    <div>
                        <label className="form-label">
                            Member Since
                        </label>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(user.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </div>
                    </div>

                    {/* Profile Picture */}
                    <div>
                        <label className="form-label">
                            Profile Picture
                        </label>
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg overflow-hidden ring-4 ring-primary/10">
                                {user.profileImage ? (
                                    <img
                                        src={user.profileImage}
                                        alt={name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <User className="w-10 h-10 text-white" />
                                )}
                            </div>
                            <div>
                                <input
                                    type="file"
                                    id="photo-upload"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="photo-upload"
                                    className="btn btn-ghost mb-1 cursor-pointer inline-block"
                                >
                                    {isUploadingPhoto ? "Uploading..." : "Change Photo"}
                                </label>
                                <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Security Section */}
            <div className="card p-6 space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-border">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                        <Lock className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Security</h2>
                        <p className="text-sm text-muted-foreground">Manage your password and security settings</p>
                    </div>
                </div>

                <button className="btn btn-ghost w-full justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    Change Password
                </button>
            </div>

            {/* Data & Privacy Section */}
            <div className="card p-6 space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-border">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-foreground">
                        <Download className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground">Data & Privacy</h2>
                        <p className="text-sm text-muted-foreground">Export or delete your data</p>
                    </div>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={handleExportData}
                        className="btn btn-ghost w-full justify-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Export All Data
                    </button>
                    <button
                        onClick={handleDeleteAccount}
                        className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl transition-all border border-red-200 dark:border-red-500/20 flex items-center justify-center gap-2"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete Account
                    </button>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex items-center justify-end gap-4 pb-8">
                <button
                    onClick={() => router.refresh()}
                    className="btn btn-ghost px-8"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="btn btn-primary px-8 shadow-xl gap-2"
                >
                    {isLoading ? (
                        <>Loading...</>
                    ) : (
                        <>
                            <Save className="w-4 h-4" />
                            Save Changes
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

import type { Metadata } from 'next';
import { ToastProvider } from '@/components/ToastProvider';
import { ConfirmDialogProvider } from '@/components/ConfirmDialog';

export const metadata: Metadata = {
    title: 'Admin Dashboard | JobFit Pro',
    description: 'Monitor Resume Generation Activity',
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ToastProvider>
            <ConfirmDialogProvider>
                <div className="bg-neutral-950 min-h-screen text-white antialiased">
                    {children}
                </div>
            </ConfirmDialogProvider>
        </ToastProvider>
    );
}

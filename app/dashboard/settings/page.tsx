import { cookies } from "next/headers";
import { prisma } from "@/app/lib/prisma";
import SettingsClient from "./SettingsClient";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
    // Get user ID from session
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("user_session")?.value;

    if (!sessionId) {
        redirect("/");
    }

    // Fetch user data
    const user = await prisma.user.findUnique({
        where: { id: sessionId },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            profileImage: true,
            createdAt: true,
        }
    });

    if (!user) {
        redirect("/");
    }

    return <SettingsClient user={user} />;
}

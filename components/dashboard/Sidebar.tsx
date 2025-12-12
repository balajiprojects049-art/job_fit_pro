import { cookies } from "next/headers";
import { prisma } from "@/app/lib/prisma";
import { SidebarClient } from "./SidebarClient";

export async function Sidebar() {
    const cookieStore = cookies();
    const sessionId = cookieStore.get("user_session")?.value;

    let user = null;

    if (sessionId) {
        const userData = await prisma.user.findUnique({
            where: { id: sessionId },
            select: {
                name: true,
                email: true,
                profileImage: true,
            },
        });
        user = userData;
    }

    return <SidebarClient user={user} />;
}

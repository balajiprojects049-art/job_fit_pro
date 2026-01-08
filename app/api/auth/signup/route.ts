import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, password } = body;

        // Check if user exists
        const existing = await prisma.user.findUnique({
            where: { email }
        });

        if (existing) {
            return new NextResponse("User already exists", { status: 400 });
        }

        // Create User
        const user = await prisma.user.create({
            data: {
                name,
                email,
                ...(phone && { phone }), // Only include phone if provided
                password, // ⚠️ Note: Should hash in production!
                status: "ACTIVE"
            }
        });

        // Log Activity
        await prisma.systemActivity.create({
            data: {
                userId: user.id,
                action: "SIGN_UP",
                details: "User created account"
            }
        });

        return NextResponse.json({ success: true, userId: user.id });

    } catch (error) {
        console.error("Signup Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

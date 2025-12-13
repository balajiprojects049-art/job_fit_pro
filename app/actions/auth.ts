"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
    const password = formData.get("password");

    if (password === "admin123") {
        // Set secure HTTP-only cookie
        cookies().set("admin_auth", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        redirect("/admin");
    } else {
        redirect("/admin/login?error=Invalid Password");
    }
}

export async function logoutAction() {
    cookies().delete("admin_auth");
    redirect("/admin/login");
}

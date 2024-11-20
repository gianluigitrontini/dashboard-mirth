"use server";
import { BASE_URL } from "@/services/rest.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Questa funzione, comunica sia con il frontend che con il backend. Alla fine, reinvia il token al frontend.
export const serverAuth = async (formData: FormData) => {
    const name = formData.get("name");
    const password = formData.get("password");

    const res = await fetch(`${BASE_URL}/api/v2/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
    });

    if (!res.ok) {
        return { message: "Errore durante il login" };
    }
    const data = await res.json();

    if (
        data["com.mirth.connect.model.LoginStatus"].status === "SUCCESS"
    ) {
        // Cookies gestiti dal middleware

        // Necessario
        const cookieMatch = res.headers.getSetCookie()[0]?.match(/(?<=JSESSIONID=)([^;]+)/) || ""; // ottiene il valore del cookie JSESSIONID
        const cookieStore = await cookies();
        cookieStore.set({
            name: "JSESSIONID",
            value: cookieMatch[0],
            secure: true,
            httpOnly: true,
            path: "/",
        });

        redirect("/dashboard");
    }
};
"use client";

import { apiClient } from "@/lib/apiClient";
import axios from "axios";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function SignupForm() {

    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const { refreshUser } = useAuth();
    const router = useRouter();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        let email = formData.get("email");
        let password = formData.get("password");

        startTransition(async () => {

            try {
                let res = await apiClient.post("/auth/signup", {
                email,
                password,
            })
                refreshUser()
                router.replace("/")
                
            } catch (err: unknown) {
                console.error(err);
               if (axios.isAxiosError(err)) {
                setError((err?.response?.data as {error?: string}).error || "Something went wrong" )
               } else {
                setError("Unexpected error")
               }
            }

        })
        
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            {error && <p className="text-red-500">{error}</p>}
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 text-black"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 text-black"
                />
            </div>

            <button
                type="submit"
                className="w-full rounded-md bg-gray-900 py-2 text-white font-medium hover:bg-gray-800 transition"
                disabled={isPending}
            >
                {isPending ? "Creating..." : "Create Account"}
            </button>
        </form>
    );
}

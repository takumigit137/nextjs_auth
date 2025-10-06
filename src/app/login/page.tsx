"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const handleLogin = async(e: React.FormEvent) => {
        e.preventDefault();
        const { data,error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            setMessage("Mail address or password is wrong.")
            return;
        }
        setMessage("Login success!");
        router.push("/profile")
    };
    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input 
                type="email"
                placeholder="Mail address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
            <p>{message}</p>
        </form>
    );
}
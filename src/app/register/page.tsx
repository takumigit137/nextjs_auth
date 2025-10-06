"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        // checking existing addresses
        const {data: existing} = await supabase
            .from("profiles")
            .select("email")
            .eq("email", email)
            .single();
        if (existing) {
            setMessage("This mail address already exists in database.")
            return;
        }
        // register user information by supabase auth
        const {data, error} = await supabase.auth.signUp({
            email,
            password,
            option: {
                emailRedirectTo: `${window.location.origin}/profile`,
                data: {username},
            },
        });

        if (error) {
            setMessage(`registration error: ${error.message}`);
            return;
        }
        setMessage("Authentification mail was sent. Please check it.")

    };
    return (
        <form onSubmit={handleRegister}>
            <h2>New registration</h2>
            <input 
                type="text"
                placeholder="User name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
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
            <button type="submit">Register</button>
            <p>{message}</p>
        </form>
    );
}
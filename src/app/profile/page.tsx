"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ProfilePage() {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const loadUser = async() => {
            const {data: {user}} = await supabase.auth.getUser();
            if (user) {
                const name = user.user_metadata?.username||"John Doe";
                setUsername(name);
            }
        };
        loadUser();
    }, []);

    return (
        <div>
            <h2>Profile</h2>
            {username ? <p>Hello, {username}!</p> : <p>Loading...</p>}
        </div>
    );
}
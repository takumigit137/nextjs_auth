"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { Box, Card, CardContent, Typography, Skeleton } from "@mui/material";

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
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", p: 2 }}>
            <Card sx={{ maxWidth: 520, width: "100%" }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Profile</Typography>
                    {username ? (
                        <Typography>Hello, {username}!</Typography>
                    ) : (
                        <Skeleton variant="text" width={200} />
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
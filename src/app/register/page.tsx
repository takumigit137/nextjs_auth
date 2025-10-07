"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import {
    Box,
    Button,
    Card,
    CardContent,
    Stack,
    TextField,
    Typography,
    Alert
} from "@mui/material";

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
            options: {
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
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", p: 2 }}>
            <Card sx={{ maxWidth: 480, width: "100%" }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>New registration</Typography>
                    {message && (
                        <Alert severity={message.toLowerCase().includes("error") ? "error" : "info"} sx={{ mb: 2 }}>
                            {message}
                        </Alert>
                    )}
                    <Box component="form" onSubmit={handleRegister} noValidate>
                        <Stack spacing={2}>
                            <TextField
                                label="User name"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Mail address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                fullWidth
                            />
                            <Button type="submit" variant="contained">Register</Button>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";
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
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", p: 2 }}>
            <Card sx={{ maxWidth: 420, width: "100%" }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Login</Typography>
                    {message && (
                        <Alert severity={message.includes("success") ? "success" : "error"} sx={{ mb: 2 }}>
                            {message}
                        </Alert>
                    )}
                    <Box component="form" onSubmit={handleLogin} noValidate>
                        <Stack spacing={2}>
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
                            <Button type="submit" variant="contained">Login</Button>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
"use client"

import { apiClient } from "@/lib/apiClient";
import React, { createContext, useState, useTransition, useContext, useEffect } from "react";


export interface User {
    id: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isPending: boolean;
    isAuthenticated: boolean;
    refreshUser: () => void;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);


export function AuthProvider({children}:{children:React.ReactNode}){
    const [user, setuser] = useState<User | null>(null)
    const [isPending, startTransition] = useTransition()


    function refreshUser () {

        startTransition(async () => {

            try {
                const res = await apiClient.get("/verify/me")
                setuser(res.data.user)
            } catch (error) {
                console.log(error)
                setuser(null)
            }
        })
    }

    async function logout () {
        try {
            await apiClient.post("/auth/logout")
            setuser(null)
        } catch (error) {
            setuser(null)
            console.log(error)
        }
    }


    useEffect(()=> {
        refreshUser()
    },[])

    
    return (
        <AuthContext.Provider value={{user, isPending, isAuthenticated:!!user, refreshUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

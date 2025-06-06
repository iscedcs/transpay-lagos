"use server"

import { signIn } from "@/auth"

export const login = async (credentials: {email: string, password: string}) =>{
	await signIn("credentials", {
        email: credentials.email,
			password: credentials.password,
			redirect: true,
			callbackUrl: "/dashboard",
        }
    )
}

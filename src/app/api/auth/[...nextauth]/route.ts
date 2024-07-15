import axios from "axios";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { extname } from "path";

interface User {
    id: number;
    email: string;
    name: string;
    username: string;
    password: string;
    description: string | null;
    idCart: string | null;
    refreshToken: string;
    createdAt: string;
    updatedAt: string;
}

interface CustomUser extends AdapterUser {
    user: User
    tokens: {
        access_token: string;
        refresh_token: string;
    };
}

interface CustomJWT extends JWT {
    user?: User;
    accessToken?: string;
    refreshToken?: string;
    exp?: number;
}

async function refreshToken(token: CustomJWT): Promise<CustomJWT> {
    const headers = {
        authorization: `Bearer ${token.refreshToken}`,
    };

    try {
        const res = await axios.post(process.env.API_URL + "/auth/refresh", {}, { headers });

        return {
            ...token,
            accessToken: res.data.access_token,
            refreshToken: res.data.refresh_token,
            exp: Date.now() + res.data.expires_in * 1000, // Set the expiration time
        };
    } catch (error) {
        console.error('Error occurred during token refresh:', error);
        return {
            ...token,
            error: 'RefreshAccessTokenError',
        };
    }
}

const handler = NextAuth({
    secret: process.env.NEXT_AUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req): Promise<CustomUser | null> {
                const data = {
                    email: credentials?.email,
                    password: credentials?.password,
                };

                try {
                    const res = await axios.post(process.env.API_URL + "/auth/signin", data);

                    if (res.data) {
                        // nao consegui tirar a necessidade de ter {email, id, emailVarified} entao ta duplicado ai mesmo :(
                        return {
                            email: res.data.user.email,
                            id: res.data.user.id,
                            emailVerified: null,
                            user: res.data.user,
                            tokens: res.data.tokens,
                        };
                    }
                    return null;
                } catch (error) {
                    console.error('Error occurred during sign-in:', error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger }): Promise<CustomJWT> {
            const customToken = token as CustomJWT;
            if (user) {
                const customUser = user as CustomUser;
                if (customUser.user && customUser.tokens) {
                    customToken.user = customUser.user;
                    customToken.accessToken = customUser.tokens.access_token;
                    customToken.refreshToken = customUser.tokens.refresh_token;
                }

                return customToken;
            }

            if (customToken.exp && new Date().getTime() < new Date(customToken.exp).getTime()) return token

            return await refreshToken(token as CustomJWT);
        },
        async session({ session, token }) {
            if (token && token.user) {
                session.user = token.user;
            }
            return session;
        },
    },
});

export { handler as GET, handler as POST };

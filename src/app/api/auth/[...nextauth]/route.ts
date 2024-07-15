import axios from "axios";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";


interface MyUser {
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

interface Tokens {
    access_token: string;
    refresh_token: string;
}

async function refreshToken(token: JWT) {
    const headers = {
        authorization: `Bearer ${token.refreshToken}`,
    };


    try {
        const res = await axios.post("http://localhost:3333/auth/refresh", {}, { headers });

        return {
            ...token,
            accessToken: res.data.access_token,
            refreshToken: res.data.refresh_token,
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
            async authorize(credentials, req) {
                const data = {
                    email: credentials?.email,
                    password: credentials?.password,
                };

                try {
                    const res = await axios.post("http://localhost:3333/auth/signin", data);

                    if (res.data) {
                        const user: MyUser & { tokens: Tokens } = {
                            ...res.data.user,
                            tokens: res.data.tokens,
                        };

                        return {
                            user: res.data.user,
                            tokens: user.tokens,
                        } as any; 
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
        async jwt({ token, user, trigger }) {
            if (user) {
                token.user = user.user;
                token.accessToken = user.tokens.access_token;
                token.refreshToken = user.tokens.refresh_token;

                return token;
            }

            if (new Date().getTime() < new Date(token.exp).getTime()) return token

            return await refreshToken(token) 
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

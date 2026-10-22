import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";

import { authConfig } from "../auth.config";
import { getUserByEmail, createUser } from "@/lib/models/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  session: {
    strategy: "jwt",
  },

  providers: [
    Google({
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),

    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email).trim().toLowerCase();
        const password = String(credentials.password);

        const user = await getUserByEmail(email);

        if (!user || !user.password) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          return null;
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    ...authConfig.callbacks,

    async signIn({ user, account }) {
      if (account?.provider !== "google" || !user?.email) {
        return true;
      }

      const email = user.email.trim().toLowerCase();
      const existingUser = await getUserByEmail(email);

      if (!existingUser) {
        await createUser({
          name: user.name || email.split("@")[0],
          email,
          hashedPassword: "",
          role: "user",
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      const email = user?.email || token.email;

      if (email) {
        const dbUser = await getUserByEmail(String(email).trim().toLowerCase());

        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
          token.name = dbUser.name;
          token.email = dbUser.email;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
  },
});

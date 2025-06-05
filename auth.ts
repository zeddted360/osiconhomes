import { Bde, IBde } from "@/models/bde";
import { Member, IMember } from "@/models/member";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDb } from "@/utils/connectDb";
import mongoose from "mongoose";

type User = {
  id: string;
  email: string;
  username: string;
};

// Extend the IMember and IBde interfaces to include the comparePassword method
interface IUser extends mongoose.Document {
  email: string;
  username: string;
  isEmailVerified: boolean;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        emailOrUsername: {
          type: "text",
          label: "Email or Username",
          placeholder: "Enter email or username",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          if (!credentials?.emailOrUsername || !credentials?.password) {
            throw new Error("Please provide both email/username and password");
          }

          await connectDb();

          // Explicitly type user as a union of IMember and IBde
          let user: any =
            (await Member.findOne({
              $or: [
                { email: credentials.emailOrUsername },
                { username: credentials.emailOrUsername },
              ],
            })) ||
            (await Bde.findOne({
              $or: [
                { email: credentials.emailOrUsername },
                { username: credentials.emailOrUsername },
              ],
            }));

          if (!user) {
            throw new Error("Invalid credentials. Please try again.");
          }

          // Check if email is not verified
          if (!user.isEmailVerified) {
            throw new Error(
              "Please verify your email address before logging in."
            );
          }

          // Use the comparePassword method from the model
          const isMatchedPassword = await user.comparePassword(
            credentials.password as string
          );

          if (!isMatchedPassword) {
            throw new Error("Invalid credentials. Please try again.");
          }

          const userWithoutPassword: User = {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
          };

          return userWithoutPassword;
        } catch (error) {
          if (
            error instanceof Error &&
            error.message === "Invalid credentials. Please try again."
          ) {
            return null; // Return null to indicate authentication failure
          }

          throw new Error("Authentication failed. Please try again.");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/log-in",
    error: "/log-in",
  },
});

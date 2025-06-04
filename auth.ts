import { Bde } from "@/models/bde";
import { Member } from "@/models/member";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

type User = {
  id: string;
  email: string;
  username: string;
};
import { connectDb } from "@/utils/connectDb";

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

          const user =
            (await Bde.findOne({
              $or: [
                { email: credentials.emailOrUsername },
                { username: credentials.emailOrUsername },
              ],
            }).lean()) ||
            (await Member.findOne({
              $or: [
                { email: credentials.emailOrUsername },
                { username: credentials.emailOrUsername },
              ],
            }).lean());

          if (!user) {
            throw new Error("Invalid email/username or password");
          }

          // Verify password
          const isMatchedPassword = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
          if (!isMatchedPassword) {
            throw new Error("Invalid email/username or password");
          }
          // Ensure the user object matches NextAuth's expected shape
          const userWithoutPassword: User = {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
          };

          return userWithoutPassword;

        } catch (error) {
          throw new Error(
            error instanceof Error
              ? "Error during sign in"
              : "Authentication failed. Please try again."
          );
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

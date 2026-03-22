import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import UserLogin from "@/libs/userLogIn";
import { getMe } from "@/libs/api";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
  if (!credentials) return null;

  const data = await UserLogin(
    credentials.email,
    credentials.password
  );

  if (!data) return null;

  // 🔥 เอา token ไปยิง /me
  const me = await getMe(data.token);

  return {
    id: me.data._id,
    name: me.data.name,        // 🔥 ตรงนี้ได้ "Sun1"
    email: me.data.email,
    role: me.data.role,
    token: data.token,
  };
},
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // 🔥 เก็บ user ทั้งก้อนลง token
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      // 🔥 เอา user ไปใส่ session
      session.user = token.user as any;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
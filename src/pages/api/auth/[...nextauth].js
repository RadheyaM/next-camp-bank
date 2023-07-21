import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../../lib/db";
import { verifyPassword } from "../../../../lib/auth";

// authenticaton API route using next auth.
const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const {email, password} = credentials;
        const client = await clientPromise;
        const usersCollection = client.db("Campers").collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        console.log("isValid:", isValid)
        if (isValid) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth',
    // error: /auth/error,
    // signOut: '/auth/signout',
  }
}
export default NextAuth(authOptions);

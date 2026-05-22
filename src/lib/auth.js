import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('ideaVaultDB');

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true
  },
  session: {
    strategy: "jwt",
    maxAge: 5 * 24 * 60 * 60 
  },
  secret: process.env.BETTER_AUTH_SECRET
});
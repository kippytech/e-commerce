import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
//import { PrismaClient } from "@prisma/client"
import prisma from "@/libs/prismadb"
import bcrypt from 'bcrypt'
import { Adapter, AdapterUser } from "next-auth/adapters"

//const prisma = new PrismaClient()

// Assuming your PrismaAdapter is using this type
//const createUser = async (user: AdapterUser): Promise<AdapterUser> => {
    // Your implementation here
  //  return user
  //};
  
  // Adjust the signature to match the expected format in next-auth/adapters
  //const createUserForNextAuth = async (user: Omit<AdapterUser, 'id'>): Promise<Omit<AdapterUser, 'id'>> => {
    // Your updated implementation here
    //return user
  //};

  const createUser: Adapter['createUser'] = async (user) => {
  // Your implementation here
  // Make sure to return a value of type AdapterUser
  return {
    ...user,
    id: 'generated-id', // Replace with your logic to generate an ID
  };
};

export const authOptions: AuthOptions = {
  adapter: {async createUser(user) {
    //return createUserForNextAuth(user);
    return createUser(user)
  },}, //PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
        name: 'credentials',
        credentials: {
            email: {
                label: 'email',
                type: 'text'
            },
            password: {
                label: 'password',
                type: 'password'
            }
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials.password) {
                throw new Error('Invalid email or password')
            }

            const user = await prisma.user.findUnique({
                where: {
                    email: credentials.email
                }
            })

            if (!user || !user?.hashedPassword) {
                throw new Error('Invalid email or password')
            }

            const isCorrectPassword = await bcrypt.compare(
                credentials?.password, user.hashedPassword
            )

            if (!isCorrectPassword) {
                throw new Error('Invalid email or password')
            }

            return user
        }
    })
  ],
  pages: {
    signIn: '/login'
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
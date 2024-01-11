import { User } from "@prisma/client"

export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
    createdAt: string,
    updatedAt: string,
    emailVerified: string
}

//emailVerified: string | null in case of error
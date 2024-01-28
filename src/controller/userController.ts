import { GraphQLError } from 'graphql'
import { registerValidation } from '../validation/userValidation'
import { ZodError, isValid } from 'zod'
import { ValidationError, ValidationUniqueError } from '../lib/ErrorStatus'
import { db } from '../../database'
import { users } from '../../database/schema'
import { eq } from 'drizzle-orm'
import { hash, salt } from '../config/bcrypt'
import { ROLE } from '../config/enum'

export const register = async (
  _: any,
  args: {
    email: string
    password: string
    name: string
  },
) => {
  try {
    const { email, name, password } = registerValidation.parse(args)
    const existingEmail = db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
      .get()

    if (existingEmail) {
      ValidationUniqueError('Email')
    }

    const register = {
      email: email,
      name: name,
      password: hash(password),
    }

    let result = await db.insert(users).values(register).returning({
      id: users.id,
      email: users.email,
      is_active: users.is_active,
      role: users.role,
      name: users.name,
      created_at: users.created_at,
      updated_at: users.updated_at,
    })

    return result[0]
  } catch (error) {
    if (error instanceof ZodError) {
      ValidationError(error)
    }

    //@ts-ignore
    throw new Error(error)
  }
}

export const getMe = async () => {
  return {}
}

import { GraphQLError } from 'graphql'
import {
  loginValidation,
  registerValidation,
} from '../validation/userValidation'
import { ZodError, isValid } from 'zod'
import {
  ValidationError,
  ValidationLogin,
  ValidationUniqueError,
} from '../lib/ErrorStatus'
import { db } from '../../database'
import { users } from '../../database/schema'
import { eq } from 'drizzle-orm'
import { compare, hash, salt } from '../config/bcrypt'
import { ROLE } from '../config/enum'
import { jwtSign } from '../config/jwt'

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

export const login = async (
  _: any,
  args: {
    email: string
    password: string
  },
) => {
  try {
    const { email, password } = loginValidation.parse(args)
    const exist = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    const data = exist[0]

    if (data.email) {
      if (compare(password, data.password)) {
        return {
          token: jwtSign({
            id: data.id,
            email: data.email,
            name: data.name,
            is_active: data.is_active,
            role: data.role,
            created_at: data.created_at,
            updated_at: data.updated_at,
          }),
          user: data,
        }
      } else {
        ValidationLogin()
      }
    } else {
      ValidationLogin()
    }
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

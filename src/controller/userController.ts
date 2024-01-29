import {
  loginValidation,
  registerValidation,
} from '../validation/userValidation'
import { ZodError, z } from 'zod'
import {
  ErrorFormatter,
  GRAPH_ERROR,
  ValidationError,
} from '../lib/ErrorStatus'
import { db } from '../../database'
import { users } from '../../database/schema'
import { eq } from 'drizzle-orm'
import { compare, hash } from '../config/bcrypt'
import { jwtSign, jwtVerify } from '../config/jwt'
import moment from 'moment'

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
      ErrorFormatter(Error(GRAPH_ERROR.UNIQUE_ERROR), 'Email')
    }

    const register = {
      email: email,
      name: name,
      password: hash(password),
    }

    let result = await db.insert(users).values(register).returning()

    return result[0]
  } catch (error) {
    if (error instanceof ZodError) {
      ValidationError(error)
    }

    if (error instanceof Error) {
      ErrorFormatter(error)
    }
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

    if (data && data?.email) {
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
        throw new Error(GRAPH_ERROR.LOGIN_ERROR)
      }
    } else {
      throw new Error(GRAPH_ERROR.LOGIN_ERROR)
    }
  } catch (error) {
    if (error instanceof ZodError) {
      ValidationError(error)
    }

    if (error instanceof Error) {
      ErrorFormatter(error)
    }
  }
}

export const getMe = async (_: any, args: null, context: any) => {
  try {
    const authorization = context.headers.get('authorization') || ''
    if (authorization !== '') {
      const token = authorization.split(' ')[1]

      const user = jwtVerify(token)
      if (user.id) {
        const result = await db
          .select()
          .from(users)
          .where(eq(users.id, user.id))

        return result[0]
      } else {
        throw Error(GRAPH_ERROR.AUTH_ERROR)
      }
    } else {
      throw Error(GRAPH_ERROR.AUTH_ERROR)
    }
  } catch (error) {
    if (error instanceof Error) {
      ErrorFormatter(error)
    }
  }
}

export const updateMe = async (
  _: any,
  args: { name: string },
  context: any,
) => {
  try {
    const authorization = context.headers.get('authorization') || ''
    if (authorization !== '') {
      const token = authorization.split(' ')[1]
      const validationName = z
        .string()
        .min(2, 'Name must be more than 2 character')
        .max(100, 'Name must be lower than 100 character')
      const user = jwtVerify(token)
      if (user.id) {
        const result = await db
          .select()
          .from(users)
          .where(eq(users.id, user.id))

        if (result.length > 0) {
          const update = await db
            .update(users)
            .set({
              name: validationName.parse(args.name),
              updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            })
            .where(eq(users.id, user.id))
            .returning()

          return update[0]
        } else {
          ErrorFormatter(new Error(GRAPH_ERROR.NOT_FOUND))
        }
      } else {
        throw Error(GRAPH_ERROR.AUTH_ERROR)
      }
    } else {
      throw Error(GRAPH_ERROR.AUTH_ERROR)
    }
  } catch (error) {
    if (error instanceof Error) {
      ErrorFormatter(error)
    }
  }
}

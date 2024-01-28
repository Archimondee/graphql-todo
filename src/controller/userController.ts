import { GraphQLError } from 'graphql'
import { registerValidation } from '../validation/userValidation'
import { ZodError, isValid } from 'zod'

export const register = async (
  _: any,
  args: {
    email: string
    password: string
    name: string
  },
) => {
  try {
    const valid = registerValidation.parse(args)

    return {}
  } catch (error) {
    if (error instanceof ZodError) {
      throw new GraphQLError('Validation error', {
        extensions: {
          customData: error.formErrors.fieldErrors,
          code: 'ERROR_VALIDATE',
          http: { status: 423 },
        },
      })
    }
  }
}

export const getMe = async () => {
  return {}
}

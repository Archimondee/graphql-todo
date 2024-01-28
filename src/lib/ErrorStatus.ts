import { GraphQLError } from 'graphql'
import { ZodError } from 'zod'

export const ValidationError = (error: ZodError) => {
  throw new GraphQLError('Validation error', {
    extensions: {
      customData: error.formErrors.fieldErrors,
      code: 'ERROR_VALIDATE',
      http: { status: 423 },
    },
  })
}

export const ValidationUniqueError = (field: string) => {
  throw new GraphQLError(`${field} must be unique`, {
    extensions: {
      code: 'ERROR_UNIQUE',
      http: { status: 500 },
    },
  })
}

export const ValidationLogin = () => {
  throw new GraphQLError(`Email or password mismatch`, {
    extensions: {
      code: 'LOGIN_ERROR',
      http: { status: 200 },
    },
  })
}

export const ValidationNotLogin = () => {
  throw new GraphQLError(`You dont have access data`, {
    extensions: {
      code: 'AUTH_ERROR',
      http: { status: 401 },
    },
  })
}

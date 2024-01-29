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

export const ValidationUniqueError = (field?: string) => {
  throw new GraphQLError(`${field} must be unique`, {
    extensions: {
      code: 'ERROR_UNIQUE',
      http: { status: 200 },
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

export const ValidationNotFound = () => {
  throw new GraphQLError(`Data not found`, {
    extensions: {
      code: 'NOT_FOUND',
      http: { status: 404 },
    },
  })
}

export const ErrorFormatter = (error: Error, field?: string) => {
  switch (error?.message) {
    case GRAPH_ERROR.AUTH_ERROR:
      ValidationNotLogin()
    case GRAPH_ERROR.LOGIN_ERROR:
      ValidationLogin()
    case GRAPH_ERROR.UNIQUE_ERROR:
      ValidationUniqueError(field)
    default:
      throw Error(error?.message)
  }
}

export enum GRAPH_ERROR {
  AUTH_ERROR = 'AUTH_ERROR',
  LOGIN_ERROR = 'LOGIN_ERROR',
  UNIQUE_ERROR = 'UNIQUE_ERROR',
  NOT_FOUND = 'NOT_FOUND',
}

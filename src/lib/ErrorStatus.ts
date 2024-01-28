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

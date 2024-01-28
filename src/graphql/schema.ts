import { gql } from '@elysiajs/apollo'
import { userTypeDefs } from './schema/user'

export const typeDefs = gql`
  type Query
  type Mutation

  ${userTypeDefs}
`

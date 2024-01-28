import { gql } from '@elysiajs/apollo'
import { metaTypeDefs } from './meta'

export const userTypeDefs = gql`
  ${metaTypeDefs}

  type User {
    id: String!
    email: String!
    name: String!
    is_active: Boolean!
    role: Int!
    role_label: String!
    created_at: String!
    updated_at: String!
  }

  extend type Query {
    getMe: User
  }

  extend type Mutation {
    register(email: String!, password: String!, name: String!): User
  }
`

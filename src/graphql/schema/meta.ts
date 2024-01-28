import { gql } from '@elysiajs/apollo'

export const metaTypeDefs = gql`
  type Meta {
    total_items: Int!
    total_page: Int!
    current_page: Int
    next_page: Int
    previous_page: Int
    last_page: Int
  }
`

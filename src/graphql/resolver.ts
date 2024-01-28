import { mergeResolvers } from '@graphql-tools/merge'
import { userResolver } from './resolver/user'

const mergeResolver = [userResolver]
export const resolvers = mergeResolvers(mergeResolver)

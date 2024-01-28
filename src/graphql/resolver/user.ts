import { getMe, register } from '../../controller/userController'

export const userResolver = {
  Query: {
    getMe: async (_: any) => {},
  },

  Mutation: {
    register: async (
      _: any,
      args: { email: string; password: string; name: string },
    ) => {},
  },
}

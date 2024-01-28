import { getMe, register } from '../../controller/userController'

export const userResolver = {
  Query: {
    getMe: getMe,
  },

  Mutation: {
    register: register,
  },
}

import {
  getMe,
  login,
  register,
  updateMe,
} from '../../controller/userController'

export const userResolver = {
  Query: {
    getMe: getMe,
  },

  Mutation: {
    register: register,
    login: login,
    updateMe: updateMe,
  },
}

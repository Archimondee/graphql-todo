import { genSaltSync, hashSync } from 'bcrypt-ts'

export const salt = genSaltSync(10)
export const hash = (hashString: string) => {
  return hashSync(hashString, salt)
}

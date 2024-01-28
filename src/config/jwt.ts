import * as jwt from 'jsonwebtoken'

export const jwtSign = (params: any) => {
  const token = jwt.sign(params, '$3Mentara', {
    expiresIn: '24h',
    issuer: 'todo',
  })
  return token
}

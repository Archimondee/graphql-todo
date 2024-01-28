import * as jwt from 'jsonwebtoken'

export const jwtSign = (params: any) => {
  const token = jwt.sign(params, '$3Mentara', {
    expiresIn: '24h',
    issuer: 'todo',
  })
  return token
}

export const jwtVerify = (token: string): any => {
  const data = jwt.verify(token, '$3Mentara', {
    maxAge: '24h',
    issuer: 'todo',
  })

  return data
}

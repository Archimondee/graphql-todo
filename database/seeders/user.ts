import { faker } from '@faker-js/faker'
import { hash } from '../../src/config/bcrypt'
import { db } from '..'
import { users } from '../schema'
import { QueryPromise } from 'drizzle-orm'

export const userSeeders = async () => {
  await db.insert(users).values({
    email: 'superadmin@email.com',
    name: 'Superadmin',
    password: hash('password'),
    role: 0,
  })
  await db.insert(users).values({
    email: 'admin@email.com',
    name: 'Admin',
    password: hash('password'),
    role: 1,
  })

  let data: any = []
  for (let i = 0; i < 100; i++) {
    data.push({
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: hash('password'),
      role: 2,
    })
  }
  await Promise.all(
    data.map(async (item: any) => await db.insert(users).values(item)),
  )
}

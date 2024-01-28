import { userSeeders } from './user'

async function seedDatabase() {
  console.time('userSeeders')
  await userSeeders()
  console.timeEnd('userSeeders')
}

seedDatabase().catch((err) => console.error(err))

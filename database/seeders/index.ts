import { userSeeders } from './user'

async function seedDatabase() {
  const start = performance.now()
  userSeeders().then(() => {
    const end = performance.now()
    console.log(`User execution time: ${(end - start).toFixed()} milisecond`)
  })
}

seedDatabase().catch((err) => console.error(err))

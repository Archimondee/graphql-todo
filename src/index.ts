import swagger from '@elysiajs/swagger'
import { Elysia, error, t } from 'elysia'
import { typeDefs } from './graphql/schema'
import { resolvers } from './graphql/resolver'
import apollo from '@elysiajs/apollo'
import { logger } from '@grotto/logysia'
import cors from '@elysiajs/cors'
import { helmet } from 'elysia-helmet'

const app = new Elysia()
app.use(swagger())
app.use(logger())
app.use(cors())
app.use(helmet())
app.use(
  apollo({
    // context: ({ request }) => {
    //   // throw new GraphQLError('User is not authenticated', {
    //   //   extensions: {
    //   //     code: 'UNAUTHENTICATED',
    //   //     http: { status: 401 },
    //   //   },
    //   // })
    //   const data = 2

    //   if (data.error) {
    //     console.log('data', data.error)
    //   }

    //   return data
    //   // return {
    //   //   userId: 'i am here',
    //   // }
    // },
    typeDefs,
    resolvers,
    formatError: (formattedError) => {
      return {
        message: formattedError?.message,
        code: formattedError?.extensions?.code,
      }
    },
  }),
)

// app.get('/testing', () => {
//   return db.select().from(categories).get()
// })

app
  .onError(({ code, error }) => {
    return new Response(error.toString())
  })
  .listen({ port: 3000 }, () =>
    console.log(
      `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
    ),
  )

// const db = new Database('todo.db')
// const client = drizzle(db, { schema })
// const result = client.select().from(categories).all()
// console.log('data', result)

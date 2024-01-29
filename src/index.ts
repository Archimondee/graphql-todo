import swagger from '@elysiajs/swagger'
import { Elysia, error, t } from 'elysia'
import { typeDefs } from './graphql/schema'
import { resolvers } from './graphql/resolver'
import apollo, { gql } from '@elysiajs/apollo'
import { logger } from '@grotto/logysia'
import cors from '@elysiajs/cors'
import { helmet } from 'elysia-helmet'
import { DefaultLogger } from 'drizzle-orm'

const app = new Elysia()
app.use(swagger())
app.use(logger({ logIP: true }))
app.use(cors())
app.use(helmet())
app.use(
  apollo({
    typeDefs,
    resolvers,
    formatError: (formattedError, error) => {
      return {
        //...formattedError,
        message: formattedError?.message,
        code: formattedError?.extensions?.code,
        error: formattedError?.extensions?.customData,
      }
    },
    //@ts-ignore
    context: ({ request, body }) => {
      if (body) {
        //@ts-ignore
        const query = body.query
        let parsingQuery = gql`
          ${query}
        `

        //@ts-ignore
        console.log(
          //@ts-ignore
          `GraphQL Operations: ${
            //@ts-ignore
            parsingQuery.definitions[0].operation
          }, Type: ${
            //@ts-ignore
            parsingQuery.definitions[0].selectionSet.selections[0].name.value
            //@ts-ignore
          }, Query: ${JSON.stringify(body.query)}`,
        )
      }

      return { headers: request.headers }
    },
    persistedQueries: { ttl: 200 },
    allowBatchedHttpRequests: true,
  }),
)

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

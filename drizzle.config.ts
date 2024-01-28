import type { Config } from "drizzle-kit";

export default {
  schema: "./database/schema",
  out: "./database/migrations",
  driver: 'better-sqlite',
  dbCredentials: {
    url: "./database/todos.db",
  },
  
  verbose: true,
  strict: true,
} satisfies Config;
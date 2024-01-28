import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

export const users = sqliteTable('users', {
  id: text('id')
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name').notNull(),
  password: text('password').notNull(),
  is_active: int('is_active', { mode: 'boolean' }).default(true),
  role: int('role').default(2),
  created_at: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updated_at: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
})

// export const userRelations = relations(users, ({ many }) => ({
//   todos: many(todos),
// }))

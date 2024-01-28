import Database from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import * as schema from './schema'

const client = new Database('./database/todo.db')
export const db = drizzle(client, { schema })

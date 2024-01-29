import Database from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'
import * as schema from './schema'
import { logger } from '@grotto/logysia'
import { DefaultLogger } from 'drizzle-orm'

const client = new Database('./database/todos.db')
export const db = drizzle(client, { schema, logger: new DefaultLogger() })

import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

// DATABASE_URL is optional for local development when no DB features are used
const databaseUrl = process.env.DATABASE_URL;

export const pool = databaseUrl
  ? new Pool({ connectionString: databaseUrl })
  : (null as unknown as pg.Pool);

export const db = databaseUrl
  ? drizzle(pool, { schema })
  : (null as unknown as ReturnType<typeof drizzle>);

export * from "./schema";

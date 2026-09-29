import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from '../prisma/schema.d';
import contractJson from '../prisma/schema.json' with { type: 'json' };

const globalForDb = globalThis as unknown as { db: ReturnType<typeof postgres<Contract>> | undefined };

export const db =
  globalForDb.db ??
  postgres<Contract>({
    contractJson,
    url: process.env.DATABASE_URL!,
  });

if (process.env.NODE_ENV !== 'production') globalForDb.db = db;

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

declare global {
  var cachedPrisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({ adapter });
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient({ adapter });
  }
  prisma = global.cachedPrisma;
}

export { prisma };

import "server-only"
import { PrismaClient } from "@prisma/client/index"
import { PrismaPg } from "@prisma/adapter-pg"

type PrismaClientInstance = InstanceType<typeof PrismaClient>
const globalForPrisma = global as unknown as { prisma: PrismaClientInstance }
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL ?? "" })

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
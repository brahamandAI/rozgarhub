import { PrismaClient } from "@/generated/prisma";

const DATABASE_URL = "mongodb+srv://rozgarhubrobustrix:YkwgrX0rwj22uRcB@cluster0.2svd0zr.mongodb.net/rozgarhub?retryWrites=true&w=majority&appName=Cluster0";

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: DATABASE_URL
      }
    },
    log: ['error', 'warn']
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
} 
import { PrismaClient } from "@prisma/client";

// DATABASE CONECTION
export const prisma = new PrismaClient();

//limpar e reinstalar cache de dependências:
// npm cache clean --force
// rm -rf node_modules package-lock.json
// npm i

//npm update para atualizar

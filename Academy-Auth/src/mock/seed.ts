import { StudentType } from "@prisma/client";
import { prisma } from "../database/prisma.database";
import { Bcrypt } from "../utils/bcrypt";

async function main() {
  const bcrypt = new Bcrypt();

  const students = [
    {
      name: "João Silva",
      email: "joao.silva@email.com",
      password: "senha123",
      type: StudentType.M,
      age: 16,
      cpf: "11111111111",
    },
    {
      name: "Ana Souza",
      email: "ana.souza@email.com",
      password: "senha123",
      type: StudentType.M,
      age: 17,
      cpf: "22222222222",
    },
    {
      name: "Carlos Oliveira",
      email: "carlos.oliveira@email.com",
      password: "senha123",
      type: StudentType.M,
      age: 18,
      cpf: "33333333333",
    },
    {
      name: "Mariana Lima",
      email: "mariana.lima@email.com",
      password: "senha123",
      type: StudentType.M,
      age: 19,
      cpf: "44444444444",
    },
    {
      name: "Ricardo Pereira",
      email: "ricardo.pereira@email.com",
      password: "senha123",
      type: StudentType.M,
      age: 20,
      cpf: "55555555555",
    },
    {
      name: "Fernanda Costa",
      email: "fernanda.costa@email.com",
      password: "senha123",
      type: StudentType.M,
      age: 21,
      cpf: "66666666666",
    },
    {
      name: "Thiago Martins",
      email: "thiago.martins@email.com",
      password: "senha123",
      type: StudentType.T,
      age: 20,
      cpf: "77777777777",
    },
    {
      name: "Juliana Almeida",
      email: "juliana.almeida@email.com",
      password: "senha123",
      type: StudentType.T,
      age: 30,
      cpf: "88888888888",
    },
    {
      name: "Pedro Fernandes",
      email: "pedro.fernandes@email.com",
      password: "senha123",
      type: StudentType.F,
      age: 20,
      cpf: "99999999999",
    },
    {
      name: "Luciana Rocha",
      email: "luciana.rocha@email.com",
      password: "senha123",
      type: StudentType.F,
      age: 22,
      cpf: "10101010101",
    },
    {
      name: "Paulo Silva",
      email: "paulo.silva@email.com",
      password: "senha123",
      type: StudentType.F,
      age: 25,
      cpf: "12121212121",
    },
    {
      name: "Carla Souza",
      email: "carla.souza@email.com",
      password: "senha123",
      type: StudentType.F,
      age: 27,
      cpf: "13131313131",
    },
  ];

  // Gerar o hash para cada senha de forma independente
  for (let student of students) {
    student.password = await bcrypt.generateHash(student.password); // Gera o hash com esse valor
  }

  await prisma.student.createMany({ data: students });
  console.log("Dados inseridos com sucesso!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

//comando para inserção: npx ts-node src/mock/seed.ts

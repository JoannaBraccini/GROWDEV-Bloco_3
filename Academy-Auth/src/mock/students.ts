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
      studentType: StudentType.M,
      age: 16,
      cpf: "27025822060",
    },
    {
      name: "Ana Souza",
      email: "ana.souza@email.com",
      password: "senha123",
      studentType: StudentType.M,
      age: 17,
      cpf: "96063570071",
    },
    {
      name: "Carlos Oliveira",
      email: "carlos.oliveira@email.com",
      password: "senha123",
      studentType: StudentType.M,
      age: 18,
      cpf: "56919567016",
    },
    {
      name: "Mariana Lima",
      email: "mariana.lima@email.com",
      password: "senha123",
      studentType: StudentType.M,
      age: 19,
      cpf: "20490191061",
    },
    {
      name: "Ricardo Pereira",
      email: "ricardo.pereira@email.com",
      password: "senha123",
      studentType: StudentType.M,
      age: 20,
      cpf: "04390048023",
    },
    {
      name: "Fernanda Costa",
      email: "fernanda.costa@email.com",
      password: "senha123",
      studentType: StudentType.M,
      age: 21,
      cpf: "49693556062",
    },
    {
      name: "Thiago Martins",
      email: "thiago.martins@email.com",
      password: "senha123",
      studentType: StudentType.T,
      age: 20,
      cpf: "58264844030",
    },
    {
      name: "Juliana Almeida",
      email: "juliana.almeida@email.com",
      password: "senha123",
      studentType: StudentType.T,
      age: 30,
      cpf: "43342103094",
    },
    {
      name: "Pedro Fernandes",
      email: "pedro.fernandes@email.com",
      password: "senha123",
      studentType: StudentType.F,
      age: 20,
      cpf: "00404378099",
    },
    {
      name: "Luciana Rocha",
      email: "luciana.rocha@email.com",
      password: "senha123",
      studentType: StudentType.F,
      age: 22,
      cpf: "80433546000",
    },
    {
      name: "Paulo Silva",
      email: "paulo.silva@email.com",
      password: "senha123",
      studentType: StudentType.F,
      age: 25,
      cpf: "79704961057",
    },
    {
      name: "Carla Souza",
      email: "carla.souza@email.com",
      password: "senha123",
      studentType: StudentType.F,
      age: 27,
      cpf: "93010504047",
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

//comando para inserção: npx ts-node src/mock/students.ts

import { prisma } from "../database/prisma.database";

async function main() {
  // Avaliações de TI
  const assessments = [
    {
      title: "Prova de Programação - Algoritmos e Estruturas de Dados",
      description:
        "Avaliação sobre algoritmos básicos e avançados, além de estruturas de dados como listas, pilhas e filas.",
      grade: 92,
    },
    {
      title: "Prova de Redes de Computadores - TCP/IP e Modelos OSI",
      description:
        "Teste sobre o funcionamento das redes, incluindo o modelo TCP/IP, modelos OSI e protocolos principais.",
      grade: 85,
    },
    {
      title: "Prova de Banco de Dados - SQL e Modelagem Relacional",
      description:
        "Avaliação focada em consultas SQL, normalização de dados e modelagem de bancos de dados relacionais.",
      grade: 88,
    },
    {
      title: "Prova de Sistemas Operacionais - Gerenciamento de Processos",
      description:
        "Questões sobre o gerenciamento de processos, memória e sistemas operacionais modernos como Linux e Windows.",
      grade: 90,
    },
    {
      title: "Prova de Segurança da Informação - Criptografia e Autenticação",
      description:
        "Prova sobre criptografia, autenticação e segurança de redes, abordando protocolos como SSL/TLS e algoritmos de chave pública.",
      grade: 93,
    },
    {
      title: "Prova de Desenvolvimento Web - Frontend e Backend",
      description:
        "Avaliação sobre desenvolvimento web, incluindo frameworks como React para frontend e Node.js para backend.",
      grade: 87,
    },
    {
      title: "Prova de Engenharia de Software - Metodologias Ágeis",
      description:
        "Teste sobre as principais metodologias ágeis como Scrum e Kanban, e como aplicá-las em projetos de software.",
      grade: 82,
    },
    {
      title:
        "Prova de Inteligência Artificial - Algoritmos de Machine Learning",
      description:
        "Avaliação sobre algoritmos de aprendizado supervisionado e não supervisionado, como regressão linear e árvores de decisão.",
      grade: 91,
    },
    {
      title: "Prova de DevOps - Automação e CI/CD",
      description:
        "Questões sobre integração contínua (CI), entrega contínua (CD), e práticas de DevOps para automação de processos.",
      grade: 89,
    },
    {
      title: "Prova de Testes de Software - Testes Unitários e Funcionais",
      description:
        "Avaliação sobre os tipos de testes de software, incluindo testes unitários, testes funcionais e ferramentas como Jest e Mocha.",
      grade: 84,
    },
  ];

  // Obter todos os estudantes cadastrados
  const students = await prisma.student.findMany();

  //Filtrar os estudantes
  const studentsM = students.filter((student) => student.studentType === "M");
  const studentsT = students.filter((student) => student.studentType === "T");
  const studentTIds = studentsT.map((student) => student.id);

  // Associar avaliações aos estudantes
  for (const student of studentsM) {
    // Adicionar uma avaliação aleatória para cada estudante
    const randomAssessments = assessments.slice(
      0,
      Math.floor(Math.random() * 5) + 1
    ); // Aleatoriamente seleciona até 5 avaliações

    // Selecionar aleatoriamente um ID de estudante do tipo "T" para o campo createdBy
    const randomCreatedById =
      studentTIds[Math.floor(Math.random() * studentTIds.length)];

    await prisma.assessment.createMany({
      data: randomAssessments.map((assessment) => ({
        ...assessment,
        studentId: student.id, // Associando a avaliação com o estudante
        createdBy: randomCreatedById, // Usando um ID de estudante do tipo "T"
      })),
    });
  }

  console.log("Avaliações criadas com sucesso.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

//comando para inserção: npx ts-node src/mock/assessments.ts

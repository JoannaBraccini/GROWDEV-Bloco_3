import { Transaction } from "../types/Transaction";

export const rows: Transaction[] = [
  {
    id: "1",
    description: "Salário",
    type: "Entrada",
    date: new Date("2024-12-02"),
    amount: 3400,
  },
  {
    id: "2",
    description: "Aluguel",
    type: "Saída",
    date: new Date("2024-12-02"),
    amount: 1200.0,
  },
  {
    id: "3",
    description: "Mercado",
    type: "Saída",
    date: new Date("2024-12-03"),
    amount: 400.0,
  },
  {
    id: "4",
    description: "Freelance",
    type: "Entrada",
    date: new Date("2024-12-04"),
    amount: 800.0,
  },
  {
    id: "5",
    description: "Academia",
    type: "Saída",
    date: new Date("2024-12-05"),
    amount: 100.0,
  },
  {
    id: "6",
    description: "Transporte",
    type: "Saída",
    date: new Date("2024-12-06"),
    amount: 150.0,
  },
  {
    id: "7",
    description: "Restaurante",
    type: "Saída",
    date: new Date("2024-12-07"),
    amount: 200.0,
  },
  {
    id: "8",
    description: "Presente",
    type: "Saída",
    date: new Date("2024-12-08"),
    amount: 300.0,
  },
  {
    id: "9",
    description: "Bônus",
    type: "Entrada",
    date: new Date("2024-12-08"),
    amount: 500.0,
  },
  {
    id: "10",
    description: "Internet",
    type: "Saída",
    date: new Date("2024-12-09"),
    amount: 100.0,
  },
];

import { Budget } from "@/types";

const budgets: Budget[] = [
  {
    id: "1",
    createdAt: new Date("2023-01-10"),
    name: "Food",
    amount: 250000,
    emoji: "🍎",
    transactions: [
      {
        id: "t1",
        amount: 15000,
        emoji: "🍕",
        description: "Pizzeria",
        createdAt: new Date("2023-01-12"),
        budgetName: "Alimentation",
        budgetId: "1",
      },
      {
        id: "t2",
        amount: 30000,
        emoji: "🍞",
        description: "Boulangerie",
        createdAt: new Date("2023-01-15"),
        budgetName: "Alimentation",
        budgetId: "1",
      },
    ],
  },
  {
    id: "2",
    createdAt: new Date("2023-01-05"),
    name: "Transportation",
    amount: 100000,
    emoji: "🚗",
    transactions: [
      {
        id: "t3",
        amount: 60000,
        emoji: "⛽",
        description: "Essence",
        createdAt: new Date("2023-01-08"),
        budgetName: "Transport",
        budgetId: "2",
      },
      {
        id: "t4",
        amount: 15000,
        emoji: "🚕",
        description: "Taxi",
        createdAt: new Date("2023-01-20"),
        budgetName: "Transport",
        budgetId: "2",
      },
    ],
  },
  {
    id: "3",
    createdAt: new Date("2023-02-01"),
    name: "Hobbies",
    amount: 20000,
    emoji: "🎉",
    transactions: [
      {
        id: "t5",
        amount: 4000,
        emoji: "🎬",
        description: "Cinéma",
        createdAt: new Date("2023-02-03"),
        budgetName: "Loisirs",
        budgetId: "3",
      },
    ],
  },
  {
    id: "4",
    createdAt: new Date("2023-02-15"),
    name: "Health",
    amount: 150000,
    emoji: "💊",
    transactions: [
      {
        id: "t6",
        amount: 45000,
        emoji: "🏥",
        description: "Consultation médicale",
        createdAt: new Date("2023-02-17"),
        budgetName: "Santé",
        budgetId: "4",
      },
    ],
  },
  {
    id: "5",
    createdAt: new Date("2023-03-01"),
    name: "Education",
    amount: 400000,
    emoji: "📚",
    transactions: [
      {
        id: "t7",
        amount: 100000,
        emoji: "📖",
        description: "Livres scolaires",
        createdAt: new Date("2023-03-05"),
        budgetName: "Éducation",
        budgetId: "5",
      },
    ],
  },
  {
    id: "6",
    createdAt: new Date("2023-04-01"),
    name: "Home",
    amount: 600000,
    emoji: "🏠",
    transactions: [
      {
        id: "t8",
        amount: 250000,
        emoji: "🛋️",
        description: "Meubles",
        createdAt: new Date("2023-04-10"),
        budgetName: "Maison",
        budgetId: "6",
      },
    ],
  },
];

export default budgets;
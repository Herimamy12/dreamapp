"use server";

import prisma from "@/lib/prisma";
import { Budget, Transaction } from "@/types";
import { use } from "react";

export async function checkAndAddUser(email: string | undefined) {
  if (!email) return;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: { email },
      });
      console.log("New user added");
    } else {
      console.log("User already exists");
    }
  } catch (error) {
    console.error("Error check user", error);
  }
}

export async function addBudget(
  email: string,
  name: string,
  amount: number,
  emoji: string
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await prisma.budget.create({
      data: {
        name,
        amount,
        emoji,
        userId: user.id,
      },
    });
  } catch (error) {
    console.error("Add budgets error");
    throw error;
  }
}

export async function getBudgetsByUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        budgets: {
          include: {
            transactions: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("User does not exists");
    }

    return user.budgets;
  } catch (error) {
    console.error("Eroor get budget user", error);
    throw error;
  }
}

export async function getTransactionsByBudgetId(budgetId: string) {
  try {
    const budget = await prisma.budget.findUnique({
      where: {
        id: budgetId,
      },
      include: {
        transactions: true,
      },
    });
    if (!budget) {
      throw new Error("Budget not found");
    }
    return budget;
  } catch (error) {
    console.log("Error in get transaction", error);
    throw error;
  }
}

export async function addTransactionsToBudget(
  budgetId: string,
  amount: number,
  description: string
) {
  try {
    const budget = await prisma.budget.findUnique({
      where: {
        id: budgetId,
      },
      include: {
        transactions: true,
      },
    });

    if (!budget) {
      throw new Error("Budget not found");
    }

    const totalTransactions = budget.transactions.reduce((sum, transaction) => {
      return sum + transaction.amount;
    }, 0);

    const totalWithNewTransaction = totalTransactions + amount;

    if (totalWithNewTransaction > budget.amount) {
      throw new Error("Total amount max depassed");
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        amount,
        description,
        emoji: budget.emoji,
        budget: {
          connect: {
            id: budget.id,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error in add transactions", error);
    throw error;
  }
}

export const deleteBudget = async (budgetId: string) => {
  try {
    await prisma.transaction.deleteMany({
      where: {
        budgetId,
      },
    });

    await prisma.budget.delete({
      where: {
        id: budgetId,
      },
    });
  } catch (error) {
    console.error("Error deleting budget and transactions", error);
    throw error;
  }
};

export async function deleteTransaction(transactionId: string) {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    await prisma.transaction.delete({
      where: {
        id: transactionId,
      },
    });
  } catch (error) {
    console.error("Error deleting transactions", error);
    throw error;
  }
}

export async function getTransactionByEmailAndPeriod(
  email: string,
  period: string
) {
  try {
    const now = new Date();
    let dateLimit;

    switch (period) {
      case "last30":
        dateLimit = new Date(now);
        dateLimit.setDate(now.getDate() - 30);
        break;
      case "last90":
        dateLimit = new Date(now);
        dateLimit.setDate(now.getDate() - 90);
        break;
      case "last7":
        dateLimit = new Date(now);
        dateLimit.setDate(now.getDate() - 7);
        break;
      case "last365":
        dateLimit = new Date(now);
        dateLimit.setFullYear(now.getFullYear() - 1);
        break;
      default:
        throw new Error("Invalid period");
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        budgets: {
          include: {
            transactions: {
              where: {
                createdAt: {
                  gte: dateLimit,
                },
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const transactions = user.budgets.flatMap((budget) =>
      budget.transactions.map((transaction) => ({
        ...transaction,
        budgetName: budget.name,
        budgetId: budget.id,
      }))
    );

    return transactions;
  } catch (error) {
    console.error("Error in get transaction", error);
  }
}

// dashboard

export async function getTotalTransactionAmount(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        budgets: {
          include: {
            transactions: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const totalAmount = user.budgets.reduce((sum, budget) => {
      return (
        sum +
        budget.transactions.reduce(
          (budgetSum, transaction) => budgetSum + transaction.amount,
          0
        )
      );
    }, 0);

    return totalAmount;
  } catch (error) {
    console.error("getTotalTransactionAmount error", error);
    throw error;
  }
}

export async function getTotalTransactionCount(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        budgets: {
          include: {
            transactions: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const totalCount = user.budgets.reduce((count, budget) => {
      return count + budget.transactions.length;
    }, 0);

    return totalCount;
  } catch (error) {
    console.error("getTotalTransactionCount", error);
    throw error;
  }
}

export async function getReachedBudgets(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        budgets: {
          include: {
            transactions: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const totalBudgets = user.budgets.length;

    const rechedBudgets = user.budgets.filter((budget) => {
      const totalTransactionAmount = budget.transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );
      return totalTransactionAmount >= budget.amount;
    }).length;

    return `${rechedBudgets}/${totalBudgets}`;
  } catch (error) {
    console.error("getReachedBudgets", error);
    throw error;
  }
}

export async function getUserBudgetsData(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        budgets: {
          include: {
            transactions: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("user not found");
    }

    const data = user.budgets.map((budget) => {
      const totalTransactionsAmount = budget.transactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0
      );
      return {
        budgetName: budget.name,
        totalBudgetAmount: budget.amount,
        totalTransactionsAmount,
      };
    });

    return data;
  } catch (error) {
    console.error("getUserBudgetsData", error);
    throw error;
  }
}

export async function getLastTransactions(email: string) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        budget: {
          user: {
            email: email,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      include: {
        budget: {
          select: {
            name: true,
          },
        },
      },
    });

    const transactionsWithBudgetName = transactions.map((transaction) => ({
      ...transaction,
      budgetName: transaction.budget?.name || "N/A",
    }));

    return transactionsWithBudgetName;
  } catch (error) {
    console.error("getLastTransactions error", error);
    throw error;
  }
}

export async function getLastBudgets(email: string) {
  try {
    const budgets = await prisma.budget.findMany({
      where: {
        user: {
          email,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      include: {
        transactions: true,
      },
    });

    return budgets;
  } catch (error) {
    console.error("getLastBudgets error", error);
    throw error;
  }
}

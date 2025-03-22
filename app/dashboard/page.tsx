"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import {
  getLastBudgets,
  getLastTransactions,
  getReachedBudgets,
  getTotalTransactionAmount,
  getTotalTransactionCount,
  getUserBudgetsData,
} from "../actions";
import Wrapper from "../components/Wrapper";
import { CircleDollarSign, Landmark, PiggyBank } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Budget, Transaction } from "@/types";
import Link from "next/link";
import BudgetItem from "../components/BudgetItem";
import TransactionItem from "../components/TransactionItem";

const page = () => {
  const { user } = useUser();
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [reachedBudgetsRatio, setReachedBudgetsRatio] = useState<string | null>(
    null
  );
  const [budgetData, setBudgetData] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const email = user?.primaryEmailAddress?.emailAddress as string;
      if (email) {
        const amount = await getTotalTransactionAmount(email);
        const count = await getTotalTransactionCount(email);
        const reachedBudgets = await getReachedBudgets(email);
        const budgetdata = await getUserBudgetsData(email);
        const lastTransactions = await getLastTransactions(email);
        const lastBudgets = await getLastBudgets(email);
        setTotalAmount(amount);
        setTotalCount(count);
        setReachedBudgetsRatio(reachedBudgets);
        setBudgetData(budgetdata);
        setTransactions(lastTransactions);
        setBudgets(lastBudgets);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("fetchData error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <Wrapper>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : (
        <div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border-2 border-base-300 p-5 flex justify-between items-center rounded-xl">
              <div className="flex flex-col">
                <span className="text-accent text-sm">Total transactions</span>
                <span className="text-2xl font-bold text-error">
                  {totalAmount !== null ? `${totalAmount} Ar` : `N/A`}
                </span>
              </div>
              <CircleDollarSign className="bg-accent w-9 h-9 rounded-full p-1 text-white" />
            </div>
            <div className="border-2 border-base-300 p-5 flex justify-between items-center rounded-xl">
              <div className="flex flex-col">
                <span className="text-accent text-sm">Transactions number</span>
                <span className="text-2xl font-bold text-error">
                  {totalCount !== null ? `${totalCount}` : `N/A`}
                </span>
              </div>
              <PiggyBank className="bg-accent w-9 h-9 rounded-full p-1 text-white" />
            </div>
            <div className="border-2 border-base-300 p-5 flex justify-between items-center rounded-xl">
              <div className="flex flex-col">
                <span className="text-accent text-sm">Budget reached</span>
                <span className="text-2xl font-bold text-error">
                  {reachedBudgetsRatio || `N /A`}
                </span>
              </div>
              <Landmark className="bg-accent w-9 h-9 rounded-full p-1 text-white" />
            </div>
          </div>
          <div className="w-full md:flex mt-4">
            <div className="rounded-xl md:w-2/3">
              <div className="border-2 border-base-300 p-5 rounded-xl">
                <h3 className="text-lg font-semibold mb-3">Statistics</h3>
                <ResponsiveContainer height={250} width="100%">
                  <BarChart width={730} height={250} data={budgetData}>
                    <CartesianGrid vertical={false} strokeDasharray="1 5" />
                    <XAxis dataKey="budgetName" />
                    <Tooltip />
                    <Bar
                      name="Budget"
                      radius={[10, 10, 0, 0]}
                      dataKey="totalBudgetAmount"
                      fill="#8884d8"
                    />
                    <Bar
                      name="Transaction"
                      radius={[10, 10, 0, 0]}
                      dataKey="totalTransactionsAmount"
                      fill="#82ca9d"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 border-2 border-base-300 p-5 rounded-xl">
                <h3 className="text-lg font-semibold mb-3">
                  Last transactions
                </h3>

                <ul className="divide-y divide-base-300">
                  {transactions.map((transaction) => (
                    <TransactionItem
                      key={transaction.id}
                      transaction={transaction}
                    ></TransactionItem>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:w=1/3 ml-4">
              <h3 className="text-lg font-semibold my-4 md:mb-4 md:mt-0">
                Last budget
              </h3>

              <ul className="grid grid-cols-1 gap-1">
                {budgets.map((budget) => (
                  <Link href={`/manage/${budget.id}`} key={budget.id}>
                    <BudgetItem budget={budget} enableHover={1}></BudgetItem>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default page;

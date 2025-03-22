"use client";
import { Transaction } from "@/types";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { getTransactionByEmailAndPeriod } from "../actions";
import Wrapper from "../components/Wrapper";
import TransactionItem from "../components/TransactionItem";

const page = () => {
  const { user } = useUser();
  const [transactions, setTransaction] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTransactions = async (period: string) => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setLoading(true);
      try {
        const transactionsData = await getTransactionByEmailAndPeriod(
          user?.primaryEmailAddress?.emailAddress,
          period
        );
        setTransaction(transactionsData || []);
        setLoading(false);
      } catch (error) {
        console.error("fetchTransactions error", error);
      }
    }
  };

  useEffect(() => {
    fetchTransactions("last30");
  }, [user?.primaryEmailAddress?.emailAddress]);

  return (
    <Wrapper>
      <div className="flex justify-end mb-5">
        <select defaultValue={"last30"} onChange={(e) => fetchTransactions(e.target.value)}>
          <option value="last7">Seven days ago</option>
          <option value="last30">One month ago</option>
          <option value="last90">Three months ago</option>
          <option value="last365">One years ago</option>
        </select>
      </div>
      <div className="overflow-x-auto w-full bg-base-200/35 p-5 rounded-xl">
        {loading ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-xl"></span>
          </div>
        ) : transactions?.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <span className="text-gray-500 text-sm">No transaction made</span>
          </div>
        ) : (
          <ul className="divide-y divide-base-300">
            {transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
              ></TransactionItem>
            ))}
          </ul>
        )}
      </div>
    </Wrapper>
  );
};

export default page;

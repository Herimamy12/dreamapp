"use client";

import React, { use, useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { useUser } from "@clerk/nextjs";
import EmojiPicker from "emoji-picker-react";
import { addBudget, getBudgetsByUser } from "../actions";
import Notification from "../components/Notification";
import { Budget } from "@/types";
import Link from "next/link";
import BudgetItem from "../components/BudgetItem";
import { Landmark } from "lucide-react";

const Page = () => {
  const { user } = useUser();
  const [budgetName, setBudgetName] = useState<string>("");
  const [budgetAmount, setBudgetAmount] = useState<string>("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [notification, setNotification] = useState<string>("");

  const closeNotification = () => {
    setNotification("");
  };

  const handleEmojiSelect = (emojiObject: { emoji: string }) => {
    setSelectedEmoji(emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleAddBudget = async () => {
    try {
      const amount = parseFloat(budgetAmount);

      if (isNaN(amount) || amount < 0) {
        throw new Error("Amount error");
      }

      await addBudget(
        user?.primaryEmailAddress?.emailAddress as string,
        budgetName,
        amount,
        selectedEmoji
      );

      fetchBudgets();

      const modal = document.getElementById("my_modal_3") as HTMLDialogElement;

      if (modal) {
        modal.close();
      }

      setNotification("New budget added successfully.");
      setBudgetName("");
      setBudgetAmount("");
      setSelectedEmoji("");
      setShowEmojiPicker(false);
    } catch (error) {
      setNotification(`${error}`);
      console.error("Handle add budget error", error);
    }
  };

  const fetchBudgets = async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      try {
        const userBudgets = await getBudgetsByUser(
          user?.primaryEmailAddress?.emailAddress
        );

        setBudgets(userBudgets);
      } catch (error) {
        setNotification(`${error}`);
      }
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, [user?.primaryEmailAddress?.emailAddress]);

  return (
    <Wrapper>
      {notification && (
        <Notification
          message={notification}
          onclose={closeNotification}
        ></Notification>
      )}
      <button
        className="btn mb-4"
        onClick={() =>
          (
            document.getElementById("my_modal_3") as HTMLDialogElement
          ).showModal()
        }
      >
        New budget
        <Landmark />
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Create budget</h3>
          <p className="py-4">For better financial management</p>
          <div className="w-full flex flex-col">
            <input
              type="text"
              value={budgetName}
              placeholder="Budget name"
              onChange={(e) => setBudgetName(e.target.value)}
              required
              className="input rounded-2xl mb-3 w-full"
            />
            <input
              type="number"
              value={budgetAmount}
              placeholder="Amount"
              onChange={(e) => setBudgetAmount(e.target.value)}
              required
              className="input rounded-2xl mb-3 w-full"
            />
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="btn btn-soft btn-primary rounded-full mb-3"
            >
              {selectedEmoji || "Selectionnez un emoji 🫰"}
            </button>
            {showEmojiPicker && (
              <div className="flex justify-center items-center my-4">
                <EmojiPicker onEmojiClick={handleEmojiSelect} />
              </div>
            )}
            <button onClick={handleAddBudget} className="btn">
              Add
            </button>
          </div>
        </div>
      </dialog>
      <ul className="grid md:grid-cols-3 gap-4">
        {budgets.map((budget) => (
          <Link href={`/manage/${budget.id}`} key={budget.id}>
            <BudgetItem budget={budget} enableHover={1}></BudgetItem>
          </Link>
        ))}
      </ul>
    </Wrapper>
  );
};

export default Page;

"use server";

import prisma from "@/lib/prisma";
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
      console.log("New user added from database");
    } else {
      console.log("User already exist from database");
    }
  } catch (error) {
    console.error("Error from user verification :", error);
  }
}

export async function addBudget(
  email: string | undefined,
  name: string,
  amount: number,
  selectedEmoji: string
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User not found from added new budget");
    }

    await prisma.budget.create({
      data : {
        name ,
        amount ,
        emoji : selectedEmoji,
		userId : user.id
      },
    });
  } catch (error) {
    console.error("Add new budget error : ", error);
    throw error;
  }
}

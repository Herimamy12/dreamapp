"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect } from "react";
import { checkAndAddUser } from "../actions";

const Navabar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      checkAndAddUser(user.primaryEmailAddress.emailAddress)
    }
  }, [user])

  return (
    <div
      className="bg-base-200/30 px-5 md:px-[10%] py-4
    border-b border-gray-300/20"
    >
      {isLoaded &&
        (isSignedIn ? (
          <div className="flex justify-between items-center">
            <Link href={"/"} className="flex text-2xl items-center font-bold">
              dream<span className="text-info">app</span>
            </Link>
            <div className="flex gap-3">
              <Link href={"/dashboard"} className="btn btn-outline btn-xs md:btn-md">
                Dashboard
              </Link>
              <Link href={"/budgets"} className="btn btn-outline btn-xs md:btn-md">
                Budget
              </Link>
              <Link href={"/transactions"} className="btn btn-outline btn-xs md:btn-md">
                Transaction
              </Link>
            </div>
            <UserButton />
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <Link href={"/"} className="flex text-2xl items-center font-bold">
              dream<span className="text-info">app</span>
            </Link>
            <div className="flex gap-2">
              <Link href={"/sign-in"} className="btn btn-soft btn-sm md:btn-md">
                Sign-In
              </Link>
              <Link href={"/sign-up"} className="btn btn-soft btn-accent btn-sm md:btn-md">
                Sign-Up
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Navabar;

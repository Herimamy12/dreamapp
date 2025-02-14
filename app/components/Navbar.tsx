"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useEffect } from "react";
import { checkAndAddUser } from "../actions";

const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      checkAndAddUser(user.primaryEmailAddress.emailAddress);
    }
  }, [user]);

  return (
    <div className="bg-base-200/50 px-5 md:px-[10%] py-4">
      {isLoaded &&
        (isSignedIn ? (
          <>
            <div className="flex justify-between items-center">
              <div className="flex text-2xl items-center font-bold">
                <Link href={"/"}>
                  dream<span className="text-accent">app</span>
                </Link>
              </div>
              <div className="md:flex hidden">
                <Link href={"/budjets"} className="btn btn-outline btn-sm">
                  Mes budgets
                </Link>
                <Link href={""} className="btn mx-4 btn-outline btn-sm">
                  Tableau de bord
                </Link>
                <Link href={""} className="btn btn-outline btn-sm">
                  Mes transactions
                </Link>
              </div>
              <UserButton />
            </div>
            <div className="md:hidden flex mt-2 justify-center">
              <Link href={"/budjets"} className="btn btn-outline btn-sm">
                Mes budgets
              </Link>
              <Link href={""} className="btn mx-4 btn-outline btn-sm">
                Tableau de bord
              </Link>
              <Link href={""} className="btn btn-outline btn-sm">
                Mes transactions
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <div className="flex text-2xl items-center font-bold">
                dream <span className="text-accent">app</span>
              </div>
              <div className="flex justify-end">
                <Link href={"/sign-in"} className="btn btn-outline btn-sm">
                  Se connecter
                </Link>
                <Link href={"/sign-up"} className="btn mx-4 btn-accent btn-sm">
                  S'inscrire
                </Link>
              </div>
            </div>
          </>
        ))}
    </div>
  );
};

export default Navbar;

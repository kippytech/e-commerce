import React from "react";
import Container from "../Container";
import Link from "next/link";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Categories from "./Categories";
import SearchBar from "./SearchBar";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

async function Navbar() {
  const currentUser = await getCurrentUser();
  return (
    <div className="sticky top-0 z-30 w-full bg-slate-200 shadow-md">
      <div className="border-b-[1px] py-4">
        <Container>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-3 md:gap-0">
              <Link
                className={`${redressed.className} text-2xl font-bold`}
                href="/"
              >
                E-Shop
              </Link>
              <div className="hidden md:block">
                <SearchBar />
              </div>
              <div className="flex items-center gap-8 md:gap-12">
                <CartCount />
                <UserMenu currentUser={currentUser} />
              </div>
            </div>
            <div className="block w-full md:hidden">
              <SearchBar />
            </div>
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
}

export default Navbar;

"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Settings } from "lucide-react";
import { useSession } from "next-auth/react";
const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div
      className={`sticky top-0 left-0 w-full z-50 border-b dark:border-none dark:bg-navbar bg-zinc-50`}
    >
      <div className="h-16 max-w-screen-2xl mx-auto flex items-center px-6 justify-between">
        <Link className="font-bold text-lg hover:text-primary" href="/">
          card.io
        </Link>
        <div className="flex gap-2">
          <Link href="/about">
            <Button variant="ghost">
              <Settings style={{ width: "100%", height: "100%" }} />
            </Button>
          </Link>
          {user ? (
            <Link href="/api/auth/signout">
              <Button>Sign Out</Button>
            </Link>
          ) : (
            <Link href="/api/auth/signin">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

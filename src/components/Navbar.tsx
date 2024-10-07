"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Book, LogOutIcon, Settings, SettingsIcon } from "lucide-react";
import { signOut, useSession, signIn } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const { data: session, status } = useSession();
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
          {status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarFallback>
                    {user?.name?.split(" ").map((name) => name[0])}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {/* Label */}
                <DropdownMenuLabel>
                  {user?.name || user?.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* Study Sets */}
                <DropdownMenuItem className="">
                  <Link
                    href={`/${user?.id}/study-sets`}
                    className="flex gap-4 items-center"
                  >
                    <Book className="w-4" />
                    My Study Sets
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* Settings */}
                <DropdownMenuItem className="">
                  <Link
                    href={`/${user?.id}/settings`}
                    className="flex gap-4 items-center"
                  >
                    <SettingsIcon className="w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="">
                  <form
                    action={async () => {
                      await signOut();
                    }}
                    className="flex gap-4 items-center"
                  >
                    <LogOutIcon className="w-4" />
                    <button type="submit">Sign Out</button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : status === "loading" ? (
            <Avatar>
              <AvatarFallback>
                <div className="animate-pulse rounded-full w-8 h-8"></div>
              </AvatarFallback>
            </Avatar>
          ) : (
            <Button>
              <form
                action={async () => {
                  await signIn();
                }}
                className="flex gap-4 items-center"
              >
                <button type="submit">Sign In</button>
              </form>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

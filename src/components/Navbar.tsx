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
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const router = useRouter();

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
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarFallback className="bg-primary text-secondary dark:bg-secondary dark:text-white">
                      {user?.username?.split(" ").map((name) => name[0]) ||
                        user?.name?.split(" ").map((name) => name[0])}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  {/* Label */}
                  <DropdownMenuLabel>
                    {user?.username || user?.name || user?.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* Study Sets */}
                  <DropdownMenuItem
                    onClick={() => router.push(`/${user?.id}/study-sets`)}
                    className="flex gap-4 items-center hover:cursor-pointer"
                  >
                    <Book className="w-4" />
                    My Study Sets
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {/* Settings */}
                  <DropdownMenuItem
                    onClick={() => router.push(`/${user?.id}/settings`)}
                    className="flex gap-4 items-center hover:cursor-pointer"
                  >
                    <SettingsIcon className="w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => {
                      await signOut();
                    }}
                    className="flex gap-4 items-center hover:cursor-pointer"
                  >
                    <LogOutIcon className="w-4" />
                    <div>Sign Out</div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : status === "loading" ? (
            <Avatar>
              <AvatarFallback>
                <div className="animate-pulse rounded-full w-8 h-8"></div>
              </AvatarFallback>
            </Avatar>
          ) : (
            <Button
              onClick={async () => {
                await signIn();
              }}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

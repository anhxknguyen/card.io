"use client";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";
import { Settings } from "lucide-react";
const Navbar = () => {
  const [opacity, setOpacity] = useState<number>(1);
  const topRef = useRef(null);

  //set opacity to lower when page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setOpacity(0.9);
      } else {
        setOpacity(1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={topRef}
      className={`sticky top-0 left-0 w-full z-50 border-b dark:border-none dark:bg-navbar bg-zinc-50`}
    >
      <div className="h-16 max-w-screen-2xl mx-auto flex items-center px-6 justify-between">
        <Link className="font-bold text-lg hover:text-zinc-300" href="/">
          card.io
        </Link>
        <div className="flex gap-2">
          <Link href="/about">
            <Button variant="ghost">
              <Settings style={{ width: "100%", height: "100%" }} />
            </Button>
          </Link>
          <Button variant="link">Sign Up</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

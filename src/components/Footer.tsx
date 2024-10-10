import React from "react";
import { Button } from "./ui/button";
import { Sticker } from "lucide-react";
import { Linkedin, FileUser } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const Footer = () => {
  return (
    <div className="border-t dark:border-none dark:bg-navbar bg-zinc-50  px-6">
      <div className="h-24 max-w-screen-2xl mx-auto text-sm flex items-center justify-center">
        <div className="grow flex justify-center m-4">
          <div className="flex flex-col gap-2">
            <p>
              Built by{" "}
              <a
                target="_blank"
                className="text-zinc-500 hover:text-primary"
                href="https://github.com/anhxknguyen?tab=repositories"
              >
                @Bon Nguyen
              </a>
            </p>
            {/* Linkedin */}
            <div className="flex gap-2">
              <a target="_blank" href="https://www.linkedin.com/feed/">
                <Button variant="outline" className="grow">
                  <Linkedin />
                </Button>
              </a>
              {/* Github */}
              <a
                target="_blank"
                href="https://github.com/anhxknguyen?tab=repositories"
              >
                <Button variant="outline" className="grow">
                  <GitHubLogoIcon />
                </Button>
              </a>
              {/* Resume */}
              <a
                target="_blank"
                href="https://drive.google.com/file/d/14xYFN5aAii5PYW-uxHPqEgmagY5WNsmz/view"
              >
                <Button variant="outline" className="grow">
                  <FileUser />
                </Button>
              </a>
            </div>
          </div>
        </div>
        <div className="grow flex justify-center m-4">
          <Button className="flex gap-2">
            <Sticker />
            <span className="hidden sm:block">Send Feedback</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;

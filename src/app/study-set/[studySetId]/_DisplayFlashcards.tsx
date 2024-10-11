"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Flashcard } from "@/types/Flashcard";
import { StudySet } from "@/types/StudySet";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useSession } from "next-auth/react";

export const DisplayFlashcards = ({ studySet }: { studySet: StudySet }) => {
  const [displayFront, setDisplayFront] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const session = useSession();
  const sessionUser = session?.data?.user;
  const isOwner = sessionUser?.id === studySet.user.id;

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("select", () => {
      setDisplayFront(true);
    });
  }, [api]);

  return (
    <div className="w-full flex flex-col ">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant={"ghost"}
            onClick={() => {
              window.history.back();
            }}
          >
            <ChevronLeft className="w-6" />
          </Button>
          <div className="flex items-center gap-6">
            <h1 className="text-4xl font-bold">{studySet?.title}</h1>
            {isOwner && (
              <Button
                type="button"
                variant={"outline"}
                onClick={() => {
                  window.history.back();
                }}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 px-16">
          <p>{studySet?.description}</p>
        </div>
      </div>
      <div className="grow w-full flex justify-center items-center">
        <Carousel
          setApi={setApi}
          opts={{ loop: true, watchDrag: false }}
          className="border border-neutral-300 dark:border-border rounded-md h-2/3 bg-neutral-50 dark:bg-card w-4/5 sm:w-1/2"
        >
          <CarouselPrevious />
          <CarouselContent
            className="h-full"
            onClick={() => setDisplayFront(!displayFront)}
          >
            {studySet?.flashcards.map((flashcard: Flashcard) => (
              <CarouselItem key={flashcard.id} className="h-full select-none">
                {displayFront ? (
                  <div className="flex flex-col relative overflow-scroll px-8 py-4 items-center sm:text-2xl text-xl lg:text-5xl h-full justify-center transition-transform duration-500">
                    <p>{flashcard.term}</p>
                    <p className="text-sm absolute top-2 left-2 text-gray-400 dark:text-neutral-700">
                      card front
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col px-8 relative overflow-scroll py-4 items-center sm:text-xl text-md lg:text-3xl h-full justify-center transition-transform duration-500">
                    <p>{flashcard.definition}</p>
                    <p className="text-sm absolute top-2 left-2 text-gray-400 dark:text-neutral-700">
                      card back
                    </p>
                  </div>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

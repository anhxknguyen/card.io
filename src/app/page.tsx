import { Button } from "@/components/ui/button";
import { MySetsButton } from "@/components/buttonComponents/MySetsButton";
export default async function Home() {
  return (
    <div className="h-full flex flex-col justify-center items-center px-8 sm:px-0">
      <div className="flex flex-col-reverse lg:flex-row justify-evenly gap-16 items-center">
        <div className="flex flex-col gap-4 h-full justify-center">
          <h1 className="text-8xl sm:text-9xl w-1/2 font-bold flex items-center">
            card.io
          </h1>
          <MySetsButton label="Start Studying Now" />
        </div>
        <img
          className="w-full md:w-4/5 lg:w-1/2 object-contain"
          src="/images/logo.png"
          alt="image"
        />
      </div>
    </div>
  );
}

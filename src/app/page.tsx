import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="flex flex-col-reverse lg:flex-row justify-evenly gap-16 items-center">
        <div className="flex flex-col gap-4 h-full justify-center">
          <h1 className="text-9xl w-1/2 font-bold flex items-center">
            card.io
          </h1>
          <Button className="">Start Studying Now.</Button>
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

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/ModeToggle";

const About = () => {
  return (
    <div className="h-full w-full flex justify-center items-center px-8 sm:px-0">
      <Card className="h-fit flex flex-col justify-center items-center w-full">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardFooter>
          <ModeToggle label="Change Theme" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default About;

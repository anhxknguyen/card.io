import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ModeToggle } from "@/components/ModeToggle";

const About = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardFooter>
          <ModeToggle />
        </CardFooter>
      </Card>
    </div>
  );
};

export default About;

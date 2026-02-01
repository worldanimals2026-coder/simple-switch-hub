import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Button 
        variant="glow" 
        size="lg"
        className="text-lg font-semibold"
      >
        Click Me
      </Button>
    </div>
  );
};

export default Index;

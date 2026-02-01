import { Play, Sparkles, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-new.png";

interface WelcomeScreenProps {
  onStart: () => void;
  onSettings: () => void;
}

const WelcomeScreen = ({ onStart, onSettings }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/10 to-game-pink/20 flex flex-col items-center justify-center p-6">
      {/* Floating sparkles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-game-yellow/30 animate-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              width: `${20 + (i % 3) * 10}px`,
              height: `${20 + (i % 3) * 10}px`,
            }}
          />
        ))}
      </div>

      {/* Settings Button */}
      <Button
        onClick={onSettings}
        variant="outline"
        size="icon"
        className="absolute top-6 right-6 rounded-full"
      >
        <Settings className="w-5 h-5" />
      </Button>

      {/* Logo */}
      <div className="relative animate-bounce-in">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-game-pink/40 rounded-full blur-3xl scale-150" />
        <img
          src={logo}
          alt="MemoSpark Logo"
          className="relative w-40 h-40 md:w-52 md:h-52 drop-shadow-2xl"
        />
      </div>

      {/* Title */}
      <div className="mt-8 text-center">
        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-primary via-game-pink to-accent bg-clip-text text-transparent drop-shadow-lg">
          MemoSpark
        </h1>
        <p className="mt-3 text-lg md:text-xl text-muted-foreground font-medium">
          Train your brain, spark your memory! ✨
        </p>
      </div>

      {/* Play Button */}
      <Button
        onClick={onStart}
        size="lg"
        className="mt-10 px-10 py-7 text-xl font-bold rounded-full bg-gradient-to-r from-primary via-game-pink to-accent hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl animate-pulse-glow"
      >
        <Play className="w-7 h-7 mr-3 fill-current" />
        Play Now
      </Button>

      {/* Features */}
      <div className="mt-12 flex gap-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 bg-game-purple/20 rounded-xl">
            <span className="text-2xl">🧠</span>
          </div>
          <span className="text-xs text-muted-foreground">Memory</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 bg-game-yellow/20 rounded-xl">
            <span className="text-2xl">⚡</span>
          </div>
          <span className="text-xs text-muted-foreground">Fast</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="p-3 bg-game-green/20 rounded-xl">
            <span className="text-2xl">🎯</span>
          </div>
          <span className="text-xs text-muted-foreground">Fun</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;

import { Play, Sparkles, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-new.png";

interface WelcomeScreenProps {
  onStart: () => void;
  onSettings: () => void;
}

const WelcomeScreen = ({ onStart, onSettings }: WelcomeScreenProps) => {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-background via-primary/10 to-game-pink/20 flex flex-col items-center justify-center p-4 safe-area-inset">
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
        className="absolute top-4 right-4 rounded-full h-10 w-10"
      >
        <Settings className="w-5 h-5" />
      </Button>

      {/* Logo */}
      <div className="relative animate-bounce-in">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-game-pink/40 rounded-full blur-3xl scale-150" />
        <img
          src={logo}
          alt="MemoSpark Logo"
          className="relative w-32 h-32 sm:w-40 sm:h-40 drop-shadow-2xl"
        />
      </div>

      {/* Title */}
      <div className="mt-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-primary via-game-pink to-accent bg-clip-text text-transparent drop-shadow-lg">
          MemoSpark
        </h1>
        <p className="mt-2 text-base sm:text-lg text-muted-foreground font-medium">
          Train your brain, spark your memory! ✨
        </p>
      </div>

      {/* Play Button */}
      <Button
        onClick={onStart}
        size="lg"
        className="mt-8 px-8 py-6 text-lg font-bold rounded-full bg-gradient-to-r from-primary via-game-pink to-accent hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl animate-pulse-glow touch-manipulation"
      >
        <Play className="w-6 h-6 mr-2 fill-current" />
        Play Now
      </Button>

      {/* Features */}
      <div className="mt-10 flex gap-6 text-center">
        <div className="flex flex-col items-center gap-1.5">
          <div className="p-2.5 bg-game-purple/20 rounded-xl">
            <span className="text-xl">🧠</span>
          </div>
          <span className="text-xs text-muted-foreground">Memory</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="p-2.5 bg-game-yellow/20 rounded-xl">
            <span className="text-xl">⚡</span>
          </div>
          <span className="text-xs text-muted-foreground">Fast</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <div className="p-2.5 bg-game-green/20 rounded-xl">
            <span className="text-xl">🎯</span>
          </div>
          <span className="text-xs text-muted-foreground">Fun</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;

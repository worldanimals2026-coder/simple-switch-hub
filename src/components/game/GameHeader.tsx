import { Trophy, RotateCcw, Clock, Zap, Settings, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-new.png";

interface GameHeaderProps {
  score: number;
  moves: number;
  bestScore: number;
  timeLeft?: number;
  timerMode?: boolean;
  onRestart: () => void;
  onSettings: () => void;
}

const GameHeader = ({ 
  score, 
  moves, 
  bestScore, 
  timeLeft, 
  timerMode, 
  onRestart, 
  onSettings 
}: GameHeaderProps) => {
  const isLowTime = timerMode && timeLeft !== undefined && timeLeft <= 10;

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="MemoSpark" className="w-10 h-10" />
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-game-pink to-accent bg-clip-text text-transparent">
            MemoSpark
          </h1>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={onSettings}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <Settings className="w-5 h-5" />
          </Button>
          <Button
            onClick={onRestart}
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 p-4 bg-card rounded-2xl shadow-lg border">
        {timerMode && timeLeft !== undefined ? (
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-xl ${isLowTime ? "bg-game-red/20 animate-pulse" : "bg-game-orange/20"}`}>
              <Timer className={`w-5 h-5 ${isLowTime ? "text-game-red" : "text-game-orange"}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Time</p>
              <p className={`text-xl font-bold ${isLowTime ? "text-game-red" : "text-foreground"}`}>
                {timeLeft}s
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="p-2 bg-game-yellow/20 rounded-xl">
              <Zap className="w-5 h-5 text-game-orange" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Score</p>
              <p className="text-xl font-bold text-foreground">{score}</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <div className="p-2 bg-game-blue/20 rounded-xl">
            <Clock className="w-5 h-5 text-game-blue" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Moves</p>
            <p className="text-xl font-bold text-foreground">{moves}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-2 bg-game-green/20 rounded-xl">
            <Trophy className="w-5 h-5 text-game-green" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Best</p>
            <p className="text-xl font-bold text-foreground">{bestScore}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;

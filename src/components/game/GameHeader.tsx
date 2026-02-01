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
    <div className="w-full mb-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <img src={logo} alt="MemoSpark" className="w-8 h-8" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-game-pink to-accent bg-clip-text text-transparent">
            MemoSpark
          </h1>
        </div>
        <div className="flex gap-1">
          <Button
            onClick={onSettings}
            variant="outline"
            size="icon"
            className="rounded-full h-9 w-9"
          >
            <Settings className="w-4 h-4" />
          </Button>
          <Button
            onClick={onRestart}
            variant="outline"
            size="icon"
            className="rounded-full h-9 w-9 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-1 p-2 bg-card rounded-xl shadow-lg border">
        {timerMode && timeLeft !== undefined ? (
          <div className="flex items-center gap-1.5 flex-1">
            <div className={`p-1.5 rounded-lg ${isLowTime ? "bg-game-red/20 animate-pulse" : "bg-game-orange/20"}`}>
              <Timer className={`w-4 h-4 ${isLowTime ? "text-game-red" : "text-game-orange"}`} />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground leading-none">Time</p>
              <p className={`text-base font-bold leading-tight ${isLowTime ? "text-game-red" : "text-foreground"}`}>
                {timeLeft}s
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 flex-1">
            <div className="p-1.5 bg-game-yellow/20 rounded-lg">
              <Zap className="w-4 h-4 text-game-orange" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground leading-none">Score</p>
              <p className="text-base font-bold text-foreground leading-tight">{score}</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-1.5 flex-1 justify-center">
          <div className="p-1.5 bg-game-blue/20 rounded-lg">
            <Clock className="w-4 h-4 text-game-blue" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground leading-none">Moves</p>
            <p className="text-base font-bold text-foreground leading-tight">{moves}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-1 justify-end">
          <div className="p-1.5 bg-game-green/20 rounded-lg">
            <Trophy className="w-4 h-4 text-game-green" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground leading-none">Best</p>
            <p className="text-base font-bold text-foreground leading-tight">{bestScore}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;

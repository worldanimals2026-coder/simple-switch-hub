import { Trophy, RotateCcw, Clock, Zap, Settings, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
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
    <motion.div
      className="w-full mb-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <motion.img
            src={logo}
            alt="MemoSpark"
            className="w-8 h-8"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-game-pink to-accent bg-clip-text text-transparent">
            MemoSpark
          </h1>
        </div>
        <div className="flex gap-1">
          <motion.div whileTap={{ scale: 0.85 }}>
            <Button
              onClick={onSettings}
              variant="outline"
              size="icon"
              className="rounded-full h-9 w-9 backdrop-blur-md bg-card/60 border-primary/20"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.85, rotate: -180 }} transition={{ duration: 0.3 }}>
            <Button
              onClick={onRestart}
              variant="outline"
              size="icon"
              className="rounded-full h-9 w-9 hover:bg-primary hover:text-primary-foreground transition-colors backdrop-blur-md bg-card/60 border-primary/20"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="flex items-center justify-between gap-1 p-2 bg-card/80 backdrop-blur-md rounded-xl shadow-lg border border-primary/10"
        layout
      >
        {timerMode && timeLeft !== undefined ? (
          <motion.div
            className="flex items-center gap-1.5 flex-1"
            animate={isLowTime ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 0.5, repeat: isLowTime ? Infinity : 0 }}
          >
            <div className={`p-1.5 rounded-lg ${isLowTime ? "bg-game-red/20" : "bg-game-orange/20"}`}>
              <Timer className={`w-4 h-4 ${isLowTime ? "text-game-red" : "text-game-orange"}`} />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground leading-none">Time</p>
              <AnimatePresence mode="popLayout">
                <motion.p
                  key={timeLeft}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`text-base font-bold leading-tight ${isLowTime ? "text-game-red" : "text-foreground"}`}
                >
                  {timeLeft}s
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <div className="flex items-center gap-1.5 flex-1">
            <div className="p-1.5 bg-game-yellow/20 rounded-lg">
              <Zap className="w-4 h-4 text-game-orange" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground leading-none">Score</p>
              <motion.p
                key={score}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="text-base font-bold text-foreground leading-tight"
              >
                {score}
              </motion.p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-1.5 flex-1 justify-center">
          <div className="p-1.5 bg-game-blue/20 rounded-lg">
            <Clock className="w-4 h-4 text-game-blue" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground leading-none">Moves</p>
            <motion.p
              key={moves}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              className="text-base font-bold text-foreground leading-tight"
            >
              {moves}
            </motion.p>
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
      </motion.div>
    </motion.div>
  );
};

export default GameHeader;

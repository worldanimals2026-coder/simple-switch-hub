import { Trophy, Star, RotateCcw, Share2, Clock, Coins, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WinModalProps {
  isOpen: boolean;
  score: number;
  moves: number;
  isNewBest: boolean;
  timeLeft?: number;
  timerMode?: boolean;
  isLost?: boolean;
  onPlayAgain: () => void;
  onShare: () => void;
}

const WinModal = ({ 
  isOpen, 
  score, 
  moves, 
  isNewBest, 
  timeLeft, 
  timerMode, 
  isLost,
  onPlayAgain, 
  onShare 
}: WinModalProps) => {
  const coinsEarned = isLost ? 0 : Math.floor(score / 10);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-card via-card to-primary/10 border-2 border-primary/20">
        <DialogHeader className="text-center">
          <div className={`mx-auto mb-4 p-4 rounded-full w-fit animate-bounce-in ${
            isLost 
              ? "bg-gradient-to-br from-game-red to-game-orange" 
              : "bg-gradient-to-br from-game-yellow to-game-orange"
          }`}>
            {isLost ? (
              <XCircle className="w-12 h-12 text-white" />
            ) : (
              <Trophy className="w-12 h-12 text-white" />
            )}
          </div>
          <DialogTitle className={`text-3xl font-bold bg-clip-text text-transparent ${
            isLost 
              ? "bg-gradient-to-r from-game-red via-game-orange to-game-yellow"
              : "bg-gradient-to-r from-primary via-game-pink to-accent"
          }`}>
            {isLost ? "Time's Up! ⏰" : "You Won! 🎉"}
          </DialogTitle>
          <DialogDescription className="text-lg text-muted-foreground">
            {isLost ? "Better luck next time!" : "Amazing memory skills!"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex justify-center gap-4">
            {!isLost && (
              <div className="text-center p-4 bg-muted rounded-2xl">
                <p className="text-sm text-muted-foreground">Score</p>
                <p className="text-3xl font-bold text-primary">{score}</p>
              </div>
            )}
            <div className="text-center p-4 bg-muted rounded-2xl">
              <p className="text-sm text-muted-foreground">Moves</p>
              <p className="text-3xl font-bold text-game-blue">{moves}</p>
            </div>
            {timerMode && !isLost && (
              <div className="text-center p-4 bg-muted rounded-2xl">
                <p className="text-sm text-muted-foreground">Time Bonus</p>
                <p className="text-3xl font-bold text-game-orange">+{(timeLeft || 0) * 10}</p>
              </div>
            )}
          </div>

          {!isLost && (
            <div className="flex items-center justify-center gap-2 p-3 bg-game-yellow/20 rounded-xl">
              <Coins className="w-5 h-5 text-game-yellow" />
              <span className="font-semibold text-game-yellow">+{coinsEarned} coins earned!</span>
            </div>
          )}

          {isNewBest && !isLost && (
            <div className="flex items-center justify-center gap-2 p-3 bg-game-green/20 rounded-xl animate-pulse-glow">
              <Star className="w-5 h-5 text-game-green fill-game-green" />
              <span className="font-semibold text-game-green">New Best Score!</span>
              <Star className="w-5 h-5 text-game-green fill-game-green" />
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              onClick={onPlayAgain}
              className="flex-1 bg-gradient-to-r from-primary to-game-pink hover:opacity-90 transition-opacity"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </Button>
            {!isLost && (
              <Button
                onClick={onShare}
                variant="outline"
                size="lg"
                className="border-2"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WinModal;

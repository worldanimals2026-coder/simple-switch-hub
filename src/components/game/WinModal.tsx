import { Trophy, Star, RotateCcw, Share2, Coins, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
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

const Confetti = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          left: `${10 + Math.random() * 80}%`,
          top: '-5%',
          backgroundColor: `hsl(${Math.random() * 360} 80% 60%)`,
        }}
        initial={{ y: 0, opacity: 1, rotate: 0 }}
        animate={{
          y: [0, 300 + Math.random() * 200],
          opacity: [1, 1, 0],
          rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
          x: [0, (Math.random() - 0.5) * 100],
        }}
        transition={{
          duration: 1.5 + Math.random(),
          delay: Math.random() * 0.5,
          ease: "easeOut",
        }}
      />
    ))}
  </div>
);

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
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-card via-card to-primary/10 border-2 border-primary/20 overflow-hidden">
        <AnimatePresence>
          {isOpen && !isLost && <Confetti />}
        </AnimatePresence>

        <DialogHeader className="text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
            className={`mx-auto mb-4 p-4 rounded-full w-fit ${
              isLost 
                ? "bg-gradient-to-br from-game-red to-game-orange" 
                : "bg-gradient-to-br from-game-yellow to-game-orange"
            }`}
          >
            {isLost ? (
              <XCircle className="w-12 h-12 text-white" />
            ) : (
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Trophy className="w-12 h-12 text-white" />
              </motion.div>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
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
          </motion.div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <motion.div
            className="flex justify-center gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
            }}
          >
            {!isLost && (
              <motion.div
                variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } }}
                className="text-center p-4 bg-muted rounded-2xl"
              >
                <p className="text-sm text-muted-foreground">Score</p>
                <motion.p
                  className="text-3xl font-bold text-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {score}
                </motion.p>
              </motion.div>
            )}
            <motion.div
              variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } }}
              className="text-center p-4 bg-muted rounded-2xl"
            >
              <p className="text-sm text-muted-foreground">Moves</p>
              <p className="text-3xl font-bold text-game-blue">{moves}</p>
            </motion.div>
            {timerMode && !isLost && (
              <motion.div
                variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } }}
                className="text-center p-4 bg-muted rounded-2xl"
              >
                <p className="text-sm text-muted-foreground">Time Bonus</p>
                <p className="text-3xl font-bold text-game-orange">+{(timeLeft || 0) * 10}</p>
              </motion.div>
            )}
          </motion.div>

          {!isLost && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-2 p-3 bg-game-yellow/20 rounded-xl"
            >
              <Coins className="w-5 h-5 text-game-yellow" />
              <span className="font-semibold text-game-yellow">+{coinsEarned} coins earned!</span>
            </motion.div>
          )}

          {isNewBest && !isLost && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="flex items-center justify-center gap-2 p-3 bg-game-green/20 rounded-xl"
            >
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 1, delay: 1 }}>
                <Star className="w-5 h-5 text-game-green fill-game-green" />
              </motion.div>
              <span className="font-semibold text-game-green">New Best Score!</span>
              <motion.div animate={{ rotate: [0, -360] }} transition={{ duration: 1, delay: 1 }}>
                <Star className="w-5 h-5 text-game-green fill-game-green" />
              </motion.div>
            </motion.div>
          )}

          <motion.div
            className="flex gap-3 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.div className="flex-1" whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onPlayAgain}
                className="w-full bg-gradient-to-r from-primary to-game-pink hover:opacity-90 transition-opacity"
                size="lg"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Play Again
              </Button>
            </motion.div>
            {!isLost && (
              <motion.div whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={onShare}
                  variant="outline"
                  size="lg"
                  className="border-2"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WinModal;

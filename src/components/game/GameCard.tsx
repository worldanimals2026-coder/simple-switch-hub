import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GameCardProps {
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  colorClass: string;
  index?: number;
}

const GameCard = ({ emoji, isFlipped, isMatched, onClick, colorClass, index = 0 }: GameCardProps) => {
  return (
    <motion.div
      className="cursor-pointer touch-manipulation"
      style={{ perspective: 800 }}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0, rotateZ: -15 }}
      animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
      transition={{
        delay: index * 0.04,
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        className="relative w-full aspect-square"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Card Back */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl flex items-center justify-center",
            "bg-gradient-to-br from-primary via-game-pink to-accent",
            "shadow-lg active:shadow-md transition-shadow duration-300",
            "border-2 border-white/20"
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-2xl sm:text-3xl md:text-4xl select-none relative z-10">❓</span>
        </div>

        {/* Card Front */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl flex items-center justify-center",
            "shadow-lg border-2",
            colorClass,
            isMatched && "ring-2 ring-game-green ring-offset-1"
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {isMatched && (
            <motion.div
              className="absolute inset-0 rounded-xl bg-game-green/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          <motion.span
            className="text-2xl sm:text-3xl md:text-4xl select-none"
            animate={isMatched ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.4 }}
          >
            {emoji}
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameCard;

import { cn } from "@/lib/utils";

interface GameCardProps {
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  colorClass: string;
}

const GameCard = ({ emoji, isFlipped, isMatched, onClick, colorClass }: GameCardProps) => {
  return (
    <div
      className="perspective-1000 cursor-pointer touch-manipulation"
      onClick={onClick}
    >
      <div
        className={cn(
          "relative w-full aspect-square transition-transform duration-500 transform-style-preserve-3d",
          isFlipped && "rotate-y-180",
          isMatched && "animate-bounce-in"
        )}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Card Back */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl flex items-center justify-center backface-hidden",
            "bg-gradient-to-br from-primary via-game-pink to-accent",
            "shadow-lg active:shadow-md transition-shadow duration-300",
            "border-2 border-white/30",
            !isFlipped && "animate-float"
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-2xl sm:text-3xl md:text-4xl select-none">❓</span>
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
          <span className="text-2xl sm:text-3xl md:text-4xl select-none">{emoji}</span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;

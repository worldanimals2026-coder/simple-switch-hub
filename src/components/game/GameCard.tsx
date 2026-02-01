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
      className="perspective-1000 cursor-pointer"
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
            "absolute inset-0 rounded-2xl flex items-center justify-center backface-hidden",
            "bg-gradient-to-br from-primary via-game-pink to-accent",
            "shadow-lg hover:shadow-xl transition-shadow duration-300",
            "border-4 border-white/30",
            !isFlipped && "animate-float"
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-4xl md:text-5xl">❓</span>
        </div>

        {/* Card Front */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl flex items-center justify-center",
            "shadow-lg border-4",
            colorClass,
            isMatched && "ring-4 ring-game-green ring-offset-2"
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <span className="text-4xl md:text-5xl">{emoji}</span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;

import GameCard from "@/components/game/GameCard";
import GameHeader from "@/components/game/GameHeader";
import WinModal from "@/components/game/WinModal";
import AdBanner from "@/components/game/AdBanner";
import { useMemoryGame } from "@/hooks/useMemoryGame";

const Index = () => {
  const {
    cards,
    moves,
    score,
    bestScore,
    isWon,
    isNewBest,
    handleCardClick,
    restartGame,
    shareScore,
  } = useMemoryGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-game-pink/10 p-4 pb-20">
      <div className="max-w-lg mx-auto pt-4">
        {/* Top Ad Banner */}
        <AdBanner position="top" />

        {/* Game Header */}
        <GameHeader
          score={score}
          moves={moves}
          bestScore={bestScore}
          onRestart={restartGame}
        />

        {/* Game Grid */}
        <div className="grid grid-cols-4 gap-3 p-4 bg-card/50 backdrop-blur-sm rounded-3xl shadow-xl border">
          {cards.map((card) => (
            <GameCard
              key={card.id}
              emoji={card.emoji}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              colorClass={card.colorClass}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </div>

        {/* Bottom Ad Banner */}
        <AdBanner position="bottom" />

        {/* Win Modal */}
        <WinModal
          isOpen={isWon}
          score={score}
          moves={moves}
          isNewBest={isNewBest}
          onPlayAgain={restartGame}
          onShare={shareScore}
        />
      </div>
    </div>
  );
};

export default Index;

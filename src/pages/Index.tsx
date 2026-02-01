import { useState, useEffect } from "react";
import GameCard from "@/components/game/GameCard";
import GameHeader from "@/components/game/GameHeader";
import WinModal from "@/components/game/WinModal";
import AdBanner from "@/components/game/AdBanner";
import WelcomeScreen from "@/components/game/WelcomeScreen";
import SettingsScreen from "@/components/game/SettingsScreen";
import { useMemoryGame } from "@/hooks/useMemoryGame";
import { useGameSounds } from "@/hooks/useGameSounds";
import { useGameSettings } from "@/contexts/GameSettingsContext";

type Screen = "welcome" | "game" | "settings";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("welcome");
  const { playButtonSound } = useGameSounds();
  const { settings } = useGameSettings();

  const {
    cards,
    moves,
    score,
    bestScore,
    isWon,
    isLost,
    isNewBest,
    timeLeft,
    timerMode,
    handleCardClick,
    restartGame,
    shareScore,
  } = useMemoryGame();

  const handleStart = () => {
    if (settings.soundEnabled) playButtonSound();
    restartGame();
    setScreen("game");
  };

  const handleRestart = () => {
    if (settings.soundEnabled) playButtonSound();
    restartGame();
  };

  const handlePlayAgain = () => {
    if (settings.soundEnabled) playButtonSound();
    restartGame();
  };

  const handleSettings = () => {
    if (settings.soundEnabled) playButtonSound();
    setScreen("settings");
  };

  const handleBackFromSettings = () => {
    if (settings.soundEnabled) playButtonSound();
    setScreen("welcome");
  };

  if (screen === "settings") {
    return <SettingsScreen onBack={handleBackFromSettings} />;
  }

  if (screen === "welcome") {
    return <WelcomeScreen onStart={handleStart} onSettings={handleSettings} />;
  }

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-background via-primary/5 to-game-pink/10 p-3 pb-16 flex flex-col safe-area-inset">
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col">
        {/* Top Ad Banner */}
        <AdBanner position="top" />

        {/* Game Header */}
        <GameHeader
          score={score}
          moves={moves}
          bestScore={bestScore}
          timeLeft={timeLeft}
          timerMode={timerMode}
          onRestart={handleRestart}
          onSettings={handleSettings}
        />

        {/* Game Grid - optimized for mobile */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-4 gap-2 p-3 bg-card/50 backdrop-blur-sm rounded-2xl shadow-xl border w-full aspect-square max-h-[65vh]">
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
        </div>

        {/* Bottom Ad Banner */}
        <AdBanner position="bottom" />

        {/* Win/Lose Modal */}
        <WinModal
          isOpen={isWon || isLost}
          score={score}
          moves={moves}
          isNewBest={isNewBest}
          timeLeft={timeLeft}
          timerMode={timerMode}
          isLost={isLost}
          onPlayAgain={handlePlayAgain}
          onShare={shareScore}
        />
      </div>
    </div>
  );
};

export default Index;

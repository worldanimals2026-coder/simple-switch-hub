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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-game-pink/10 p-4 pb-20">
      <div className="max-w-lg mx-auto pt-4">
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

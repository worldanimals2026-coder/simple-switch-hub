import { useState } from "react";
import GameCard from "@/components/game/GameCard";
import GameHeader from "@/components/game/GameHeader";
import WinModal from "@/components/game/WinModal";
import AdBanner from "@/components/game/AdBanner";
import WelcomeScreen from "@/components/game/WelcomeScreen";
import SettingsScreen from "@/components/game/SettingsScreen";
import { useMemoryGame } from "@/hooks/useMemoryGame";
import { useGameSounds } from "@/hooks/useGameSounds";
import { useGameSettings } from "@/contexts/GameSettingsContext";
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-[100dvh] bg-gradient-to-br from-background via-primary/5 to-game-pink/10 flex flex-col safe-area-inset relative overflow-hidden"
    >
      {/* Subtle animated background */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-primary/5 blur-3xl -top-20 -right-20"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-56 h-56 rounded-full bg-game-pink/5 blur-3xl -bottom-10 -left-10"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="w-full max-w-sm mx-auto flex flex-col h-[100dvh] p-3 relative z-10">
        {/* Top Ad Banner */}
        <div className="flex-shrink-0">
          <AdBanner position="top" />
        </div>

        {/* Game Header */}
        <div className="flex-shrink-0">
          <GameHeader
            score={score}
            moves={moves}
            bestScore={bestScore}
            timeLeft={timeLeft}
            timerMode={timerMode}
            onRestart={handleRestart}
            onSettings={handleSettings}
          />
        </div>

        {/* Game Grid */}
        <div className="flex-1 min-h-0 flex items-center justify-center py-2">
          <div className="grid grid-cols-4 gap-2 p-3 bg-card/50 backdrop-blur-sm rounded-2xl shadow-xl border border-primary/10 w-full h-full max-w-[min(100%,calc(100vh-280px))] aspect-square mx-auto">
            {cards.map((card, idx) => (
              <GameCard
                key={card.id}
                emoji={card.emoji}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                colorClass={card.colorClass}
                index={idx}
                onClick={() => handleCardClick(card.id)}
              />
            ))}
          </div>
        </div>

        {/* Bottom Ad Banner */}
        <div className="flex-shrink-0 pb-2">
          <AdBanner position="bottom" />
        </div>

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
    </motion.div>
  );
};

export default Index;

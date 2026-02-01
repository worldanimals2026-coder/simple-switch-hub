import { useState, useEffect, useCallback, useRef } from "react";
import { useGameSounds } from "./useGameSounds";
import { useGameSettings } from "@/contexts/GameSettingsContext";

interface Card {
  id: number;
  emoji: string;
  colorClass: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const COLOR_CLASSES = [
  "bg-gradient-to-br from-game-pink/20 to-game-pink/40 border-game-pink",
  "bg-gradient-to-br from-game-purple/20 to-game-purple/40 border-game-purple",
  "bg-gradient-to-br from-game-blue/20 to-game-blue/40 border-game-blue",
  "bg-gradient-to-br from-game-cyan/20 to-game-cyan/40 border-game-cyan",
  "bg-gradient-to-br from-game-green/20 to-game-green/40 border-game-green",
  "bg-gradient-to-br from-game-yellow/20 to-game-yellow/40 border-game-yellow",
  "bg-gradient-to-br from-game-orange/20 to-game-orange/40 border-game-orange",
  "bg-gradient-to-br from-game-red/20 to-game-red/40 border-game-red",
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const createCards = (emojis: string[]): Card[] => {
  const cards: Card[] = [];
  emojis.forEach((emoji, index) => {
    const colorClass = COLOR_CLASSES[index % COLOR_CLASSES.length];
    cards.push(
      { id: index * 2, emoji, colorClass, isFlipped: false, isMatched: false },
      { id: index * 2 + 1, emoji, colorClass, isFlipped: false, isMatched: false }
    );
  });
  return shuffleArray(cards);
};

export const useMemoryGame = () => {
  const { settings, getCurrentThemePack, addCoins } = useGameSettings();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isLost, setIsLost] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(settings.timerDuration);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  const { playFlipSound, playMatchSound, playMismatchSound, playWinSound } = useGameSounds();
  const winSoundPlayedRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize game
  useEffect(() => {
    initGame();
    const saved = localStorage.getItem("memoSparkBestScore");
    if (saved) setBestScore(parseInt(saved));
  }, []);

  // Timer effect
  useEffect(() => {
    if (settings.timerMode && isTimerRunning && timeLeft > 0 && !isWon && !isLost) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && settings.timerMode && isTimerRunning && !isWon) {
      setIsLost(true);
      setIsTimerRunning(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, isTimerRunning, settings.timerMode, isWon, isLost]);

  const initGame = useCallback(() => {
    const themePack = getCurrentThemePack();
    setCards(createCards(themePack.emojis));
    setFlippedCards([]);
    setMoves(0);
    setScore(0);
    setIsWon(false);
    setIsLost(false);
    setIsNewBest(false);
    setIsProcessing(false);
    setTimeLeft(settings.timerDuration);
    setIsTimerRunning(false);
    winSoundPlayedRef.current = false;
  }, [getCurrentThemePack, settings.timerDuration]);

  const startTimer = useCallback(() => {
    if (settings.timerMode) {
      setIsTimerRunning(true);
    }
  }, [settings.timerMode]);

  const handleCardClick = useCallback((cardId: number) => {
    if (isProcessing || isWon || isLost) return;

    // Start timer on first click
    if (settings.timerMode && !isTimerRunning) {
      startTimer();
    }

    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    // Play flip sound
    if (settings.soundEnabled) {
      playFlipSound();
    }

    // Flip the card
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, isFlipped: true } : c))
    );

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsProcessing(true);
      setMoves((prev) => prev + 1);

      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // Match found
        setTimeout(() => {
          if (settings.soundEnabled) playMatchSound();
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c
            )
          );
          setScore((prev) => prev + 100);
          setFlippedCards([]);
          setIsProcessing(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          if (settings.soundEnabled) playMismatchSound();
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  }, [cards, flippedCards, isProcessing, isWon, isLost, isTimerRunning, settings.soundEnabled, settings.timerMode, playFlipSound, playMatchSound, playMismatchSound, startTimer]);

  // Check for win
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched) && !winSoundPlayedRef.current) {
      setIsTimerRunning(false);
      
      // Calculate score with timer bonus
      let finalScore = Math.max(1000 - moves * 10, 100) + score;
      
      // Timer bonus: remaining seconds * 10 points
      if (settings.timerMode && timeLeft > 0) {
        const timerBonus = timeLeft * 10;
        finalScore += timerBonus;
      }
      
      setScore(finalScore);
      
      // Award coins (10% of score)
      const coinsEarned = Math.floor(finalScore / 10);
      addCoins(coinsEarned);
      
      if (finalScore > bestScore) {
        setBestScore(finalScore);
        localStorage.setItem("memoSparkBestScore", finalScore.toString());
        setIsNewBest(true);
      }
      
      winSoundPlayedRef.current = true;
      setTimeout(() => {
        if (settings.soundEnabled) playWinSound();
        setIsWon(true);
      }, 500);
    }
  }, [cards, moves, score, bestScore, timeLeft, settings.timerMode, settings.soundEnabled, playWinSound, addCoins]);

  const shareScore = useCallback(() => {
    const timerText = settings.timerMode ? `\nTime Left: ${timeLeft}s` : "";
    const text = `🧠 MemoSpark Score: ${score}!\nMoves: ${moves}${timerText}\nCan you beat me? 🎮✨`;
    if (navigator.share) {
      navigator.share({ title: "MemoSpark", text });
    } else {
      navigator.clipboard.writeText(text);
    }
  }, [score, moves, timeLeft, settings.timerMode]);

  return {
    cards,
    moves,
    score,
    bestScore,
    isWon,
    isLost,
    isNewBest,
    timeLeft,
    timerMode: settings.timerMode,
    handleCardClick,
    restartGame: initGame,
    shareScore,
  };
};

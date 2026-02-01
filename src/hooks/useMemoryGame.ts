import { useState, useEffect, useCallback } from "react";

interface Card {
  id: number;
  emoji: string;
  colorClass: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const EMOJIS = ["🦋", "🌸", "🌈", "⭐", "🎨", "🎵", "💎", "🔮"];
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

const createCards = (): Card[] => {
  const cards: Card[] = [];
  EMOJIS.forEach((emoji, index) => {
    const colorClass = COLOR_CLASSES[index];
    cards.push(
      { id: index * 2, emoji, colorClass, isFlipped: false, isMatched: false },
      { id: index * 2 + 1, emoji, colorClass, isFlipped: false, isMatched: false }
    );
  });
  return shuffleArray(cards);
};

export const useMemoryGame = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize game
  useEffect(() => {
    initGame();
    const saved = localStorage.getItem("memoryGameBestScore");
    if (saved) setBestScore(parseInt(saved));
  }, []);

  const initGame = useCallback(() => {
    setCards(createCards());
    setFlippedCards([]);
    setMoves(0);
    setScore(0);
    setIsWon(false);
    setIsNewBest(false);
    setIsProcessing(false);
  }, []);

  const handleCardClick = useCallback((cardId: number) => {
    if (isProcessing) return;

    const card = cards.find((c) => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

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
  }, [cards, flippedCards, isProcessing]);

  // Check for win
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      const finalScore = Math.max(1000 - moves * 10, 100) + score;
      setScore(finalScore);
      
      if (finalScore > bestScore) {
        setBestScore(finalScore);
        localStorage.setItem("memoryGameBestScore", finalScore.toString());
        setIsNewBest(true);
      }
      
      setTimeout(() => setIsWon(true), 500);
    }
  }, [cards, moves, score, bestScore]);

  const shareScore = useCallback(() => {
    const text = `🧠 Memory Match Score: ${score}!\nMoves: ${moves}\nCan you beat me? 🎮`;
    if (navigator.share) {
      navigator.share({ title: "Memory Match", text });
    } else {
      navigator.clipboard.writeText(text);
    }
  }, [score, moves]);

  return {
    cards,
    moves,
    score,
    bestScore,
    isWon,
    isNewBest,
    handleCardClick,
    restartGame: initGame,
    shareScore,
  };
};

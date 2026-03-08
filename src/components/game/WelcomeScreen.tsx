import { Play, Sparkles, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import logo from "@/assets/logo-new.png";

interface WelcomeScreenProps {
  onStart: () => void;
  onSettings: () => void;
}

const floatingParticle = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: [0, 0.6, 0],
    y: [-20, -80, -140],
    x: [0, (i % 2 === 0 ? 15 : -15), 0],
  },
  transition: {
    duration: 3 + i * 0.5,
    repeat: Infinity,
    delay: i * 0.7,
    ease: "easeInOut" as const,
  },
});

const WelcomeScreen = ({ onStart, onSettings }: WelcomeScreenProps) => {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-background via-primary/10 to-game-pink/20 flex flex-col items-center justify-center p-4 safe-area-inset overflow-hidden relative">
      {/* Animated grid lines background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            {...floatingParticle(i)}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              bottom: `10%`,
            }}
          >
            <Sparkles
              className="text-game-yellow/40"
              style={{
                width: `${16 + (i % 3) * 8}px`,
                height: `${16 + (i % 3) * 8}px`,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-primary/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: '10%', left: '-10%' }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-game-pink/10 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: '15%', right: '-5%' }}
      />

      {/* Settings Button */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="absolute top-4 right-4"
      >
        <Button
          onClick={onSettings}
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10 backdrop-blur-md bg-card/60 border-primary/20 hover:border-primary/50 hover:bg-primary/10 transition-all"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Logo with glow */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, duration: 0.8 }}
        className="relative"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/40 to-game-pink/40 rounded-full blur-3xl scale-150"
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1.4, 1.6, 1.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src={logo}
          alt="MemoSpark Logo"
          className="relative w-32 h-32 sm:w-40 sm:h-40 drop-shadow-2xl"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
        className="mt-6 text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-primary via-game-pink to-accent bg-clip-text text-transparent drop-shadow-lg">
          MemoSpark
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-2 text-base sm:text-lg text-muted-foreground font-medium"
        >
          Train your brain, spark your memory! ✨
        </motion.p>
      </motion.div>

      {/* Play Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="mt-8 px-8 py-6 text-lg font-bold rounded-full bg-gradient-to-r from-primary via-game-pink to-accent shadow-2xl touch-manipulation relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <Play className="w-6 h-6 mr-2 fill-current relative z-10" />
            <span className="relative z-10">Play Now</span>
          </Button>
        </motion.div>
      </motion.div>

      {/* Features */}
      <motion.div
        className="mt-10 flex gap-6 text-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15, delayChildren: 0.7 } },
        }}
      >
        {[
          { emoji: "🧠", label: "Memory", bg: "bg-game-purple/20" },
          { emoji: "⚡", label: "Fast", bg: "bg-game-yellow/20" },
          { emoji: "🎯", label: "Fun", bg: "bg-game-green/20" },
        ].map((item) => (
          <motion.div
            key={item.label}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-col items-center gap-1.5"
          >
            <motion.div
              className={`p-2.5 ${item.bg} rounded-xl backdrop-blur-sm`}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <span className="text-xl">{item.emoji}</span>
            </motion.div>
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;

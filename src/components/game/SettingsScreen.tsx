import { ArrowLeft, Volume2, VolumeX, Timer, Check, Lock, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useGameSettings, THEME_PACKS } from "@/contexts/GameSettingsContext";
import { useGameSounds } from "@/hooks/useGameSounds";
import logo from "@/assets/logo-new.png";

interface SettingsScreenProps {
  onBack: () => void;
}

const SettingsScreen = ({ onBack }: SettingsScreenProps) => {
  const {
    settings,
    toggleSound,
    toggleTimerMode,
    setTimerDuration,
    setTheme,
    unlockTheme,
    getThemePacks,
  } = useGameSettings();
  const { playButtonSound } = useGameSounds();

  const handleToggleSound = () => {
    if (settings.soundEnabled) {
      toggleSound();
    } else {
      toggleSound();
      playButtonSound();
    }
  };

  const handleThemeSelect = (themeId: string) => {
    const theme = THEME_PACKS.find((t) => t.id === themeId);
    if (!theme) return;

    if (settings.unlockedThemes.includes(themeId)) {
      if (settings.soundEnabled) playButtonSound();
      setTheme(themeId);
    } else {
      // Try to unlock
      if (unlockTheme(themeId)) {
        if (settings.soundEnabled) playButtonSound();
        setTheme(themeId);
      }
    }
  };

  const themePacks = getThemePacks();

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-background via-primary/10 to-game-pink/20 safe-area-inset">
      <div className="max-w-sm mx-auto p-4 pb-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button
            onClick={onBack}
            variant="outline"
            size="icon"
            className="rounded-full h-9 w-9 flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <img src={logo} alt="MemoSpark" className="w-8 h-8" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-game-pink to-accent bg-clip-text text-transparent">
              Settings
            </h1>
          </div>
        </div>

        {/* Coins Display */}
        <div className="flex items-center justify-center gap-2 mb-4 p-2.5 bg-game-yellow/20 rounded-xl">
          <Coins className="w-5 h-5 text-game-yellow" />
          <span className="text-lg font-bold text-game-yellow">{settings.totalCoins}</span>
          <span className="text-sm text-muted-foreground">coins</span>
        </div>

        {/* Sound Settings */}
        <div className="bg-card rounded-xl p-4 shadow-lg border mb-4">
          <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
            {settings.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-primary" />
            ) : (
              <VolumeX className="w-4 h-4 text-muted-foreground" />
            )}
            Sound
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Sound Effects</span>
            <Switch
              checked={settings.soundEnabled}
              onCheckedChange={handleToggleSound}
            />
          </div>
        </div>

        {/* Timer Mode */}
        <div className="bg-card rounded-xl p-4 shadow-lg border mb-4">
          <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
            <Timer className="w-4 h-4 text-game-orange" />
            Timer Mode
          </h2>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Enable Timer</span>
            <Switch
              checked={settings.timerMode}
              onCheckedChange={toggleTimerMode}
            />
          </div>
          {settings.timerMode && (
            <div className="space-y-2">
              <span className="text-xs text-muted-foreground">Duration</span>
              <div className="flex gap-2">
                {[30, 60, 90, 120].map((duration) => (
                  <Button
                    key={duration}
                    variant={settings.timerDuration === duration ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimerDuration(duration)}
                    className="flex-1 h-8 text-xs"
                  >
                    {duration}s
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Packs */}
        <div className="bg-card rounded-xl p-4 shadow-lg border">
          <h2 className="text-base font-semibold mb-3">🎨 Theme Packs</h2>
          <div className="grid grid-cols-2 gap-2">
            {themePacks.map((theme) => {
              const isSelected = settings.currentTheme === theme.id;
              const isLocked = !theme.unlocked;
              const canAfford = settings.totalCoins >= theme.unlockCost;

              return (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  disabled={isLocked && !canAfford}
                  className={`relative p-3 rounded-lg border-2 transition-all touch-manipulation ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-lg"
                      : isLocked
                      ? "border-muted bg-muted/50 opacity-70"
                      : "border-border hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 bg-primary rounded-full p-0.5">
                      <Check className="w-2.5 h-2.5 text-primary-foreground" />
                    </div>
                  )}
                  {isLocked && (
                    <div className="absolute top-1.5 right-1.5 bg-muted-foreground rounded-full p-0.5">
                      <Lock className="w-2.5 h-2.5 text-background" />
                    </div>
                  )}
                  <div className="text-2xl mb-1">{theme.icon}</div>
                  <div className="font-medium text-xs">{theme.name}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    {theme.emojis.slice(0, 4).join(" ")}
                  </div>
                  {isLocked && (
                    <div className="mt-1.5 flex items-center justify-center gap-1 text-[10px]">
                      <Coins className="w-2.5 h-2.5 text-game-yellow" />
                      <span className={canAfford ? "text-game-green" : "text-muted-foreground"}>
                        {theme.unlockCost}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;

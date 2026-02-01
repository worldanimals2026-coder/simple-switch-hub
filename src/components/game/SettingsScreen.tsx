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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/10 to-game-pink/20 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            size="icon"
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <img src={logo} alt="MemoSpark" className="w-10 h-10" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-game-pink to-accent bg-clip-text text-transparent">
              Settings
            </h1>
          </div>
        </div>

        {/* Coins Display */}
        <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-game-yellow/20 rounded-2xl">
          <Coins className="w-6 h-6 text-game-yellow" />
          <span className="text-xl font-bold text-game-yellow">{settings.totalCoins}</span>
          <span className="text-muted-foreground">coins</span>
        </div>

        {/* Sound Settings */}
        <div className="bg-card rounded-2xl p-6 shadow-lg border mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            {settings.soundEnabled ? (
              <Volume2 className="w-5 h-5 text-primary" />
            ) : (
              <VolumeX className="w-5 h-5 text-muted-foreground" />
            )}
            Sound
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Sound Effects</span>
            <Switch
              checked={settings.soundEnabled}
              onCheckedChange={handleToggleSound}
            />
          </div>
        </div>

        {/* Timer Mode */}
        <div className="bg-card rounded-2xl p-6 shadow-lg border mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Timer className="w-5 h-5 text-game-orange" />
            Timer Mode
          </h2>
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground">Enable Timer</span>
            <Switch
              checked={settings.timerMode}
              onCheckedChange={toggleTimerMode}
            />
          </div>
          {settings.timerMode && (
            <div className="space-y-3">
              <span className="text-sm text-muted-foreground">Duration</span>
              <div className="flex gap-2">
                {[30, 60, 90, 120].map((duration) => (
                  <Button
                    key={duration}
                    variant={settings.timerDuration === duration ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimerDuration(duration)}
                    className="flex-1"
                  >
                    {duration}s
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Packs */}
        <div className="bg-card rounded-2xl p-6 shadow-lg border">
          <h2 className="text-lg font-semibold mb-4">🎨 Theme Packs</h2>
          <div className="grid grid-cols-2 gap-3">
            {themePacks.map((theme) => {
              const isSelected = settings.currentTheme === theme.id;
              const isLocked = !theme.unlocked;
              const canAfford = settings.totalCoins >= theme.unlockCost;

              return (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  disabled={isLocked && !canAfford}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-primary bg-primary/10 shadow-lg"
                      : isLocked
                      ? "border-muted bg-muted/50 opacity-70"
                      : "border-border hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                      <Check className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                  {isLocked && (
                    <div className="absolute top-2 right-2 bg-muted-foreground rounded-full p-1">
                      <Lock className="w-3 h-3 text-background" />
                    </div>
                  )}
                  <div className="text-3xl mb-2">{theme.icon}</div>
                  <div className="font-medium text-sm">{theme.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {theme.emojis.slice(0, 4).join(" ")}
                  </div>
                  {isLocked && (
                    <div className="mt-2 flex items-center justify-center gap-1 text-xs">
                      <Coins className="w-3 h-3 text-game-yellow" />
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

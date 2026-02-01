import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ThemePack {
  id: string;
  name: string;
  icon: string;
  emojis: string[];
  unlocked: boolean;
  unlockCost: number;
}

export const THEME_PACKS: ThemePack[] = [
  {
    id: "classic",
    name: "Classic",
    icon: "✨",
    emojis: ["🦋", "🌸", "🌈", "⭐", "🎨", "🎵", "💎", "🔮"],
    unlocked: true,
    unlockCost: 0,
  },
  {
    id: "animals",
    name: "Animals",
    icon: "🐾",
    emojis: ["🦁", "🐼", "🦊", "🐸", "🦉", "🐙", "🦋", "🐬"],
    unlocked: false,
    unlockCost: 500,
  },
  {
    id: "food",
    name: "Food",
    icon: "🍕",
    emojis: ["🍕", "🍔", "🍩", "🍦", "🍎", "🧁", "🍿", "🌮"],
    unlocked: false,
    unlockCost: 500,
  },
  {
    id: "nature",
    name: "Nature",
    icon: "🌿",
    emojis: ["🌺", "🌴", "🍄", "🌻", "🌊", "⛰️", "🌙", "☀️"],
    unlocked: false,
    unlockCost: 500,
  },
];

interface GameSettings {
  soundEnabled: boolean;
  timerMode: boolean;
  timerDuration: number; // in seconds
  currentTheme: string;
  unlockedThemes: string[];
  totalCoins: number;
}

interface GameSettingsContextType {
  settings: GameSettings;
  toggleSound: () => void;
  toggleTimerMode: () => void;
  setTimerDuration: (duration: number) => void;
  setTheme: (themeId: string) => void;
  unlockTheme: (themeId: string) => boolean;
  addCoins: (amount: number) => void;
  getCurrentThemePack: () => ThemePack;
  getThemePacks: () => ThemePack[];
}

const defaultSettings: GameSettings = {
  soundEnabled: true,
  timerMode: false,
  timerDuration: 60,
  currentTheme: "classic",
  unlockedThemes: ["classic"],
  totalCoins: 0,
};

// Create context with default value to prevent errors during HMR
const defaultContextValue: GameSettingsContextType = {
  settings: defaultSettings,
  toggleSound: () => {},
  toggleTimerMode: () => {},
  setTimerDuration: () => {},
  setTheme: () => {},
  unlockTheme: () => false,
  addCoins: () => {},
  getCurrentThemePack: () => THEME_PACKS[0],
  getThemePacks: () => THEME_PACKS,
};

const GameSettingsContext = createContext<GameSettingsContextType>(defaultContextValue);

export const GameSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<GameSettings>(() => {
    const saved = localStorage.getItem("memoSparkSettings");
    if (saved) {
      return { ...defaultSettings, ...JSON.parse(saved) };
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("memoSparkSettings", JSON.stringify(settings));
  }, [settings]);

  const toggleSound = () => {
    setSettings((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const toggleTimerMode = () => {
    setSettings((prev) => ({ ...prev, timerMode: !prev.timerMode }));
  };

  const setTimerDuration = (duration: number) => {
    setSettings((prev) => ({ ...prev, timerDuration: duration }));
  };

  const setTheme = (themeId: string) => {
    if (settings.unlockedThemes.includes(themeId)) {
      setSettings((prev) => ({ ...prev, currentTheme: themeId }));
    }
  };

  const unlockTheme = (themeId: string): boolean => {
    const theme = THEME_PACKS.find((t) => t.id === themeId);
    if (!theme || settings.unlockedThemes.includes(themeId)) return false;
    
    if (settings.totalCoins >= theme.unlockCost) {
      setSettings((prev) => ({
        ...prev,
        totalCoins: prev.totalCoins - theme.unlockCost,
        unlockedThemes: [...prev.unlockedThemes, themeId],
      }));
      return true;
    }
    return false;
  };

  const addCoins = (amount: number) => {
    setSettings((prev) => ({ ...prev, totalCoins: prev.totalCoins + amount }));
  };

  const getCurrentThemePack = (): ThemePack => {
    return THEME_PACKS.find((t) => t.id === settings.currentTheme) || THEME_PACKS[0];
  };

  const getThemePacks = (): ThemePack[] => {
    return THEME_PACKS.map((theme) => ({
      ...theme,
      unlocked: settings.unlockedThemes.includes(theme.id),
    }));
  };

  return (
    <GameSettingsContext.Provider
      value={{
        settings,
        toggleSound,
        toggleTimerMode,
        setTimerDuration,
        setTheme,
        unlockTheme,
        addCoins,
        getCurrentThemePack,
        getThemePacks,
      }}
    >
      {children}
    </GameSettingsContext.Provider>
  );
};

export const useGameSettings = () => {
  return useContext(GameSettingsContext);
};

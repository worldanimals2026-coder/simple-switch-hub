import { useCallback, useRef } from "react";

// Web Audio API for generating game sounds
const createAudioContext = () => {
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

export const useGameSounds = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = createAudioContext();
    }
    return audioContextRef.current;
  }, []);

  const playFlipSound = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);
    } catch (e) {
      console.log("Audio not supported");
    }
  }, [getAudioContext]);

  const playMatchSound = useCallback(() => {
    try {
      const ctx = getAudioContext();
      
      // Play a cheerful chord
      const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5 - C major chord
      
      frequencies.forEach((freq, index) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(freq, ctx.currentTime);
        oscillator.type = "sine";

        const startTime = ctx.currentTime + index * 0.05;
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.4);
      });
    } catch (e) {
      console.log("Audio not supported");
    }
  }, [getAudioContext]);

  const playMismatchSound = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(300, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.2);
      oscillator.type = "sawtooth";

      gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.2);
    } catch (e) {
      console.log("Audio not supported");
    }
  }, [getAudioContext]);

  const playWinSound = useCallback(() => {
    try {
      const ctx = getAudioContext();
      
      // Victory fanfare
      const notes = [
        { freq: 523.25, time: 0 },     // C5
        { freq: 659.25, time: 0.1 },   // E5
        { freq: 783.99, time: 0.2 },   // G5
        { freq: 1046.50, time: 0.3 },  // C6
      ];

      notes.forEach(({ freq, time }) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(freq, ctx.currentTime + time);
        oscillator.type = "sine";

        gainNode.gain.setValueAtTime(0, ctx.currentTime + time);
        gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + time + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + time + 0.3);

        oscillator.start(ctx.currentTime + time);
        oscillator.stop(ctx.currentTime + time + 0.3);
      });
    } catch (e) {
      console.log("Audio not supported");
    }
  }, [getAudioContext]);

  const playButtonSound = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(600, ctx.currentTime);
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.log("Audio not supported");
    }
  }, [getAudioContext]);

  return {
    playFlipSound,
    playMatchSound,
    playMismatchSound,
    playWinSound,
    playButtonSound,
  };
};

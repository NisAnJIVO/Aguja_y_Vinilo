import { create } from "zustand";
import { VinylRecord } from "../data/types";
import { audioEngine } from "../lib/audioEngine";

interface PlayerState {
  currentRecord: VinylRecord | null;
  currentTrackName: string | null;
  isPlaying: boolean;
  isCrackleEnabled: boolean;
  isTonearmEngaged: boolean;
  volume: number;
  playRecord: (record: VinylRecord, trackName?: string) => void;
  togglePlay: () => void;
  pause: () => void;
  toggleCrackle: () => void;
  setVolume: (val: number) => void;
  stop: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentRecord: null,
  currentTrackName: null,
  isPlaying: false,
  isCrackleEnabled: true,
  isTonearmEngaged: false,
  volume: 0.7,

  playRecord: (record, trackName) => {
    const selectedTrack = trackName || (record.tracklist.length > 0 ? record.tracklist[0].title : record.title);

    // Trigger physical needle drop sound effect
    audioEngine.playNeedleDrop();

    if (get().isCrackleEnabled) {
      audioEngine.startVinylCrackle(0.14);
    }

    // Play subtle harmonic analog chord
    const baseFreq = record.bpm ? 160 + (record.bpm % 100) : 220;
    setTimeout(() => {
      audioEngine.playPreviewChordProgression(baseFreq);
    }, 180);

    set({
      currentRecord: record,
      currentTrackName: selectedTrack,
      isPlaying: true,
      isTonearmEngaged: true
    });
  },

  togglePlay: () => {
    const { isPlaying, currentRecord, playRecord, pause } = get();
    if (!currentRecord) return;
    if (isPlaying) {
      pause();
    } else {
      playRecord(currentRecord, get().currentTrackName || undefined);
    }
  },

  pause: () => {
    audioEngine.stopPreviewMusic();
    audioEngine.stopVinylCrackle();
    set({ isPlaying: false, isTonearmEngaged: false });
  },

  toggleCrackle: () => {
    const nextVal = !get().isCrackleEnabled;
    if (nextVal && get().isPlaying) {
      audioEngine.startVinylCrackle(0.14);
    } else if (!nextVal) {
      audioEngine.stopVinylCrackle();
    }
    set({ isCrackleEnabled: nextVal });
  },

  setVolume: (val) => {
    audioEngine.setMasterVolume(val);
    set({ volume: val });
  },

  stop: () => {
    audioEngine.stopPreviewMusic();
    audioEngine.stopVinylCrackle();
    set({
      isPlaying: false,
      isTonearmEngaged: false,
      currentRecord: null,
      currentTrackName: null
    });
  }
}));

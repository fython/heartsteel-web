import { ref } from "vue";

const soundEnabled = ref(true);
const soundVolume = ref(0.5);
const vibrateEnabled = ref(true);

export function useMainSettings() {
  return {
    soundEnabled,
    soundVolume,
    vibrateEnabled,
  };
}

export function playSoundWithSettings(el?: HTMLAudioElement): Promise<void> {
  if (el && soundEnabled.value) {
    el.currentTime = 0;
    el.volume = 0.5;
    return el.play();
  }
  return Promise.resolve();
}

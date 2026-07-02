import { ref, watch } from "vue";

const SETTINGS_STORAGE_KEY = "heartsteel:settings";

interface StoredSettings {
  soundEnabled?: boolean;
  soundVolume?: number;
  vibrateEnabled?: boolean;
}

function loadStoredSettings(): StoredSettings {
  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return {};
}

const stored = loadStoredSettings();
const soundEnabled = ref(stored.soundEnabled ?? true);
const soundVolume = ref(stored.soundVolume ?? 0.5);
const vibrateEnabled = ref(stored.vibrateEnabled ?? true);

watch(
  [soundEnabled, soundVolume, vibrateEnabled],
  ([enabled, volume, vibrate]) => {
    window.localStorage.setItem(
      SETTINGS_STORAGE_KEY,
      JSON.stringify({ soundEnabled: enabled, soundVolume: volume, vibrateEnabled: vibrate }),
    );
  },
  { deep: true },
);

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
    el.volume = soundVolume.value;
    return el.play();
  }
  return Promise.resolve();
}

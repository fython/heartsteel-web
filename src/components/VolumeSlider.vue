<script setup lang="ts">
import { computed } from "vue";
import { useMainSettings } from "@/game/main-settings";
import { Volume, Volume1, Volume2, VolumeX } from "@lucide/vue";

const { soundEnabled, soundVolume } = useMainSettings();

const volumePercent = computed({
  get: () => Math.round(soundVolume.value * 100),
  set: (val: number) => {
    soundVolume.value = val / 100;
  },
});

const volumeIconComponent = computed(() => {
  if (!soundEnabled.value || soundVolume.value === 0) return VolumeX;
  if (soundVolume.value < 0.33) return Volume;
  if (soundVolume.value < 0.66) return Volume1;
  return Volume2;
});
</script>

<template>
  <div class="volume-slider" :class="{ disabled: !soundEnabled }">
    <button
      class="volume-icon-btn"
      :aria-label="soundEnabled ? '静音' : '开启音效'"
      @click="soundEnabled = !soundEnabled"
    >
      <component :is="volumeIconComponent" :size="28" />
    </button>
    <input
      class="volume-range"
      type="range"
      min="0"
      max="100"
      step="1"
      :value="volumePercent"
      :disabled="!soundEnabled"
      :style="{ '--volume-percent': volumePercent + '%' }"
      :aria-label="`音量: ${volumePercent}%`"
      @input="volumePercent = Number(($event.target as HTMLInputElement).value)"
    />
    <span class="volume-label">{{ volumePercent }}%</span>
  </div>
</template>

<style lang="less" scoped>
.volume-slider {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  user-select: none;
  -webkit-user-select: none;

  &.disabled {
    opacity: 0.45;
  }
}

.volume-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  min-width: 44px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--circle-button-icon-fill);
  cursor: pointer;
  transition: background 0.15s;

  &:active {
    background: rgba(192, 155, 106, 0.15);
  }
}

.volume-range {
  flex: 1;
  height: 44px;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  cursor: pointer;
  outline: none;

  &::-webkit-slider-runnable-track {
    height: 6px;
    border-radius: 3px;
    background: linear-gradient(
      to right,
      #c09b6a 0%,
      #c09b6a var(--volume-percent, 50%),
      #d0d0d0 var(--volume-percent, 50%),
      #d0d0d0 100%
    );
  }

  &::-moz-range-track {
    height: 6px;
    border-radius: 3px;
    background: #d0d0d0;
  }

  &::-moz-range-progress {
    height: 6px;
    border-radius: 3px;
    background: var(--circle-button-icon-fill);
  }

  &::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--circle-button-icon-fill);
    margin-top: -9px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
    transition: transform 0.1s;

    &:active {
      transform: scale(1.2);
    }
  }

  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border: none;
    border-radius: 50%;
    background: var(--circle-button-icon-fill);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  }

  &:disabled {
    cursor: not-allowed;

    &::-webkit-slider-thumb {
      background: #888;
    }

    &::-moz-range-thumb {
      background: #888;
    }

    &::-webkit-slider-runnable-track {
      background: #e0e0e0;
    }
  }
}

.volume-label {
  min-width: 36px;
  text-align: right;
  font-size: 14px;
  font-variant-numeric: tabular-nums;
  color: #5a4a35;
}
</style>

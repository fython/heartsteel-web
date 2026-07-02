<script setup lang="ts">
import { computed, ref, watch } from "vue";

const props = defineProps<{
  max: number;
  current: number;
}>();

const progressBgStyle = computed(() => {
  return {
    width: `${(props.current / props.max) * 100}%`,
  };
});

// Floating +HP animation
interface FloatingItem {
  id: number;
  text: string;
}

const floatingItems = ref<FloatingItem[]>([]);
let nextId = 0;
let prevMax = props.max;

watch(
  () => props.max,
  (newVal, oldVal) => {
    if (oldVal === undefined) {
      prevMax = newVal;
      return;
    }
    const diff = newVal - oldVal;
    if (diff > 0) {
      const id = nextId++;
      floatingItems.value.push({ id, text: `+${Math.round(diff)}` });
      setTimeout(() => {
        floatingItems.value = floatingItems.value.filter(
          (item) => item.id !== id,
        );
      }, 1200);
    }
    prevMax = newVal;
  },
);
</script>

<template>
  <div class="health-bar">
    <div class="health-bar-progress-bg" :style="progressBgStyle" />

    <div class="health-bar-text">
      {{ Math.floor(current) }}/{{ Math.floor(max) }}
      <span class="hp-gain-popup">
        <TransitionGroup name="hp-float">
          <span
            v-for="item in floatingItems"
            :key="item.id"
            class="hp-gain-text"
          >
            {{ item.text }}
          </span>
        </TransitionGroup>
      </span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.health-bar {
  height: var(--health-bar-height);
  padding: var(--health-bar-border-width);
  border: var(--health-bar-border-width) solid var(--health-bar-border-color);
  border-radius: var(--health-bar-border-radius);
  background-color: #000000;

  .health-bar-progress-bg {
    border-radius: var(--health-bar-inner-border-radius);
    background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.05)
    );
    box-shadow:
      0 0 1px 1px rgba(0, 0, 0, 0.25),
      inset 0 1px rgba(255, 255, 255, 0.1);
    background-color: var(--health-bar-background-color);
  }
}

.health-bar-progress-bg {
  height: 100%;
}

.health-bar-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-size: 18px;
  text-shadow:
    0 0 2px #000000,
    0 0 4px #303030;

  white-space: nowrap;
}

.hp-gain-popup {
  position: relative;
  display: inline-block;
  margin-left: 4px;
  vertical-align: middle;
}

.hp-gain-text {
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 14px;
  font-weight: bold;
  color: #4ade80;
  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000,
    0 0 4px rgba(74, 222, 128, 0.6);
  white-space: nowrap;
}

.hp-float-enter-active {
  animation: hp-float-up 1.2s ease-out forwards;
}

.hp-float-leave-active {
  display: none;
}

@keyframes hp-float-up {
  0% {
    opacity: 0;
    transform: translateY(4px) scale(0.8);
  }
  15% {
    opacity: 1;
    transform: translateY(0) scale(1.1);
  }
  30% {
    opacity: 1;
    transform: translateY(-2px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px) scale(0.9);
  }
}
</style>

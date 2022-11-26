<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  max: number;
  current: number;
}>();

const progressBgStyle = computed(() => {
  return {
    width: `${(props.current / props.max) * 100}%`,
  };
});
</script>

<template>
  <div class="health-bar">
    <div class="health-bar-progress-bg" :style="progressBgStyle" />

    <div class="health-bar-text">
      {{ Math.floor(current) }}/{{ Math.floor(max) }}
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
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.25),
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
  text-shadow: 0 0 2px #000000, 0 0 4px #303030;
}
</style>

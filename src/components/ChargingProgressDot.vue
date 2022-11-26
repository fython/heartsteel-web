<script setup lang="ts">
import type { ChargingProgressDotState } from "@/components/view-model";

const props = defineProps<{
  state: ChargingProgressDotState;
}>();
</script>

<template>
  <div
    class="charging-progress-dot"
    :class="{
      'activated-state': props.state.status === 1,
      'final-dot': props.state.final,
    }"
  />
</template>

<style lang="less" scoped>
.charging-progress-dot {
  font-size: var(--charging-progress-text-size);

  width: calc(var(--charging-progress-dot-radius) * 2);
  height: calc(var(--charging-progress-dot-radius) * 2);
  border-radius: var(--charging-progress-dot-radius);
  border: var(--charging-progress-dot-border-width) solid
    var(--charging-progress-dot-border-color);

  background: var(--charging-progress-dot-background);

  text-align: center;
  user-select: none;

  &.activated-state {
    background: var(--charging-progress-dot-background-activated);
  }

  &.activated-state.final-dot {
    background-color: var(--charging-progress-dot-background-final);
  }
}
</style>

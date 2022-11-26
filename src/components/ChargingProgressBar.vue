<script setup lang="ts">
import { computed } from "vue";
import type { ChargingProgressDotState } from "@/components/view-model";
import { ChargingProgressDotStatus } from "@/components/view-model";
import ChargingProgressDot from "@/components/ChargingProgressDot.vue";

const props = defineProps<{
  max: number;
  current: number;
}>();

const dotStates = computed<ChargingProgressDotState[]>(() => {
  if (props.max < 1) {
    return [];
  }
  const states: ChargingProgressDotState[] = [];
  for (let i = 0; i < props.max; i++) {
    states.push({
      no: i + 1,
      status:
        props.current > i
          ? ChargingProgressDotStatus.ACTIVATED
          : ChargingProgressDotStatus.DEACTIVATED,
      final: i === props.max - 1,
    });
  }
  return states;
});
</script>

<template>
  <div class="charging-progress-bar">
    <template v-for="dot in dotStates" :key="dot.no">
      <charging-progress-dot :state="dot" />
    </template>
  </div>
</template>

<style scoped>
.charging-progress-bar {
  display: flex;
  flex-direction: row;

  gap: var(--charging-progress-dot-gap);
}
</style>

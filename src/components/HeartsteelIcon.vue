<script setup lang="ts">
import { onMounted, ref, toRef, watch } from "vue";

const props = defineProps<{
  isBought: boolean;
  progress: number;
  stackCount: number;
}>();

const iconImg = ref<HTMLDivElement | null>();
const stackCountText = ref<HTMLDivElement | null>();
const countTextShake = ref(false);

onMounted(() => {
  stackCountText?.value?.addEventListener("animationend", () => {
    countTextShake.value = false;
  });
});

watch(toRef(props, "stackCount"), (newVal, oldVal) => {
  if (newVal > oldVal && (oldVal !== 0 || newVal - oldVal < 30)) {
    countTextShake.value = true;
    setTimeout(() => {
      if (countTextShake.value) {
        countTextShake.value = false;
      }
    }, 500);
  }
});
</script>

<template>
  <div
    class="heartsteel-icon"
    :class="{
      'disabled-state': !props.isBought,
      'icon-shake-active': countTextShake,
    }"
  >
    <img
      ref="iconImg"
      class="icon-img"
      src="../assets/media/heartsteel.jpg"
      alt="Heartsteel Icon"
    />
    <div class="icon-img-hover-layer" />
    <div
      v-if="props.isBought"
      ref="stackCountText"
      class="stack-count-text"
      :class="{ 'stack-count-shake-active': countTextShake }"
    >
      {{ Math.floor(props.stackCount) }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.heartsteel-icon {
  width: var(--heartsteel-icon-size);
  height: var(--heartsteel-icon-size);
  z-index: 2;

  border-radius: var(--heartsteel-icon-border-radius);
  border: var(--heartsteel-icon-outer-border-width) solid
    var(--game-icon-outer-border-color);
  padding: var(--heartsteel-icon-border-width);

  background: var(--heartsteel-icon-border-background);

  transition: opacity 0.5s linear;

  &::before {
    position: absolute;
    z-index: 1;
    content: "";
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: var(--heartsteel-icon-border-background-hovered);
    opacity: 0;
    transition: opacity 0.25s linear;
  }

  &:not(.disabled-state):hover::before {
    opacity: 1;
  }

  &:not(.disabled-state) .icon-img-hover-layer:hover {
    opacity: 0.15;
  }

  &.disabled-state {
    opacity: 0.5;

    filter: grayscale(80%);
  }
}

.heartsteel-icon .stack-count-text {
  position: absolute;
  z-index: 4;
  right: var(--heartsteel-icon-stack-count-text-right);
  bottom: var(--heartsteel-icon-stack-count-text-bottom);
  user-select: none;

  color: var(--heartsteel-icon-stack-count-text-color);
  font-size: var(--heartsteel-icon-stack-count-text-size);
  font-weight: 500;

  text-shadow: 0 3px 2px #000000, 0 0 16px #303030;
}

.heartsteel-icon .icon-img {
  width: var(--heartsteel-icon-inner-size);
  height: var(--heartsteel-icon-inner-size);
  z-index: 2;
  border: var(--heartsteel-icon-outer-border-width) solid
    var(--game-icon-outer-border-color);
}

.heartsteel-icon .icon-img-hover-layer {
  position: absolute;
  top: calc(var(--heartsteel-icon-border-width));
  left: calc(var(--heartsteel-icon-border-width));
  width: var(--heartsteel-icon-inner-size);
  height: var(--heartsteel-icon-inner-size);
  z-index: 3;
  background: #ffffff;
  opacity: 0;
  transition: opacity 0.2s linear;
}

@keyframes stack-count-shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.stack-count-shake-active {
  animation: stack-count-shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes icon-shake {
  10%,
  90% {
    transform: translate3d(1.5px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(-3px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(6px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(-6px, 0, 0);
  }
}

.icon-shake-active {
  animation: icon-shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
</style>

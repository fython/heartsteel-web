<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import AttackButtonClickSFX from "@/assets/media/attack_button_click.ogg";
import { playSoundWithSettings } from "@/game/main-settings";

const emits = defineEmits<{
  (event: "click"): void;
}>();

const swordsIcon = defineAsyncComponent(
  () => import("@/assets/icons/swords_FILL0_wght400_GRAD0_opsz48.svg")
);

const circleButtonSFX = ref<HTMLAudioElement>();

const onClick = () => {
  playSoundWithSettings(circleButtonSFX.value);
  emits("click");
};

defineExpose({
  onClick,
});
</script>

<template>
  <div class="circle-button-container">
    <div class="circle-button" @click="onClick">
      <component :is="swordsIcon" class="circle-button-icon" />
    </div>
    <audio
      class="circle-button-sfx"
      ref="circleButtonSFX"
      :src="AttackButtonClickSFX"
      preload="auto"
    />
  </div>
</template>

<style lang="less" scoped>
.circle-button-container {
  width: var(--circle-button-size);
  height: var(--circle-button-size);
  border-radius: calc(var(--circle-button-size) / 2);
  background: var(--circle-button-border-background);

  &::before {
    position: absolute;
    border-radius: calc(var(--circle-button-size) / 2);
    z-index: 1;
    content: "";
    inset: 0;
    background: var(--heartsteel-icon-border-background-hovered);
    opacity: 0;
    transition: opacity 0.25s linear;
  }

  &:hover::before {
    opacity: 1;
  }
}

.circle-button {
  position: absolute;
  z-index: 3;
  inset: 0;
  margin: calc(
    (var(--circle-button-size) - var(--circle-button-inner-size)) / 2
  );

  width: var(--circle-button-inner-size);
  height: var(--circle-button-inner-size);
  border-radius: calc(var(--circle-button-inner-size) / 2);
  background: var(--circle-button-inner-background);

  font-family: "Friz Quadrata Std Medium", sans-serif;
  font-size: 32px;

  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &::before {
    position: absolute;
    border-radius: calc(var(--circle-button-inner-size) / 2);
    z-index: 4;
    content: "";
    inset: 0;
    background: var(--circle-button-inner-background-hovered);
    opacity: 0;
    transition: opacity 0.15s linear;

    user-select: none;
  }

  &:hover::before {
    opacity: 1;
  }

  .circle-button-icon {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(75%);
    z-index: 5;

    user-select: none;

    fill: var(--circle-button-icon-fill);
  }
}

.circle-button-sfx {
  display: none;
}
</style>

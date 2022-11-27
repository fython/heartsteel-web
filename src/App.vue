<script setup lang="ts">
import HeartsteelIcon from "@/components/HeartsteelIcon.vue";
import { computed, provide, ref } from "vue";
import HealthBar from "@/components/HealthBar.vue";
import MainController from "@/game/main-controller";
import PlayButton from "@/components/PlayButton.vue";
import AttackButton from "@/components/AttackButton.vue";
import HeartsteelAudioResources from "@/components/HeartsteelAudioResources.vue";
import ChargingProgressBar from "@/components/ChargingProgressBar.vue";
import GameTips from "@/components/GameTips.vue";
import RelatedLinks from "@/components/RelatedLinks.vue";

const ctrl = new MainController();
const isPlaying = ref(false);
const attackButton = ref<typeof AttackButton>();

const maxHP = computed(() => {
  if (isPlaying.value) {
    return ctrl.maxHP.value;
  } else {
    return ctrl.baseHP.value;
  }
});

const play = () => {
  isPlaying.value = true;
  ctrl.start();
};

provide("main-controller", ctrl);

document.addEventListener("keypress", (event) => {
  if (isPlaying.value && event.code === "Space") {
    attackButton.value?.onClick();
  }
});
</script>

<template>
  <heartsteel-audio-resources />

  <main>
    <div class="center-layout">
      <!-- Icon -->
      <heartsteel-icon
        :is-bought="isPlaying"
        :progress="0"
        :stack-count="ctrl.heartsteel.itemBonusHP.value"
      />
      <!-- Introduce -->
      <span class="passive-text">
        <span class="passive-title">被动 - 庞然吞食：</span>
        当 700 码内有一名敌方英雄时，会在 3
        秒里持续充能一次对英雄的强力攻击。充能攻击会造成 125 + 你 6%
        最大生命值的额外物理伤害，并为你提供相当于 10% 该伤害的永久
        最大生命值。<del>对每个目标有 30 秒冷却时间。</del>（这里没有冷却 :P）
      </span>
      <!-- Health bar -->
      <span class="user-health-bar-text">你的生命值：</span>
      <health-bar class="user-health-bar" :current="maxHP" :max="maxHP" />
      <!-- Buttons -->
      <play-button v-show="!isPlaying" class="app-play-button" @click="play" />
      <attack-button
        v-show="isPlaying"
        ref="attackButton"
        class="app-attack-button"
        @click="ctrl.doAttack()"
      />
      <charging-progress-bar
        v-if="isPlaying"
        class="app-progress-bar"
        :current="ctrl.heartsteel.currentChargeStack.value"
        :max="4"
      />
      <!-- Help & About -->
      <game-tips class="app-game-tips" />
      <related-links class="app-related-links" />
    </div>

    <div class="background">
      <video
        class="background-video"
        src="./assets/media/meme-background.webm"
        autoplay
        muted
        loop
      />
      <div class="background-layer" />
    </div>
  </main>
</template>

<style lang="less" scoped>
main {
  height: 100vh;
  color: #fafafa;
}

.center-layout {
  width: 100%;
  height: 100%;
  z-index: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.passive-text {
  margin-top: 24px;
  width: calc(100% - 32px);
  max-width: 500px;
  font-size: 14px;
}
.passive-title {
  font-weight: bold;
  color: var(--circle-button-icon-fill);
}

.user-health-bar-text {
  margin-top: 32px;
  font-size: 14px;
}

.user-health-bar {
  width: calc(100% - 16px * 2);
  max-width: 500px;
  margin: 8px 0 0 0;
}

.app-play-button,
.app-attack-button {
  margin-top: 32px;
}

.app-progress-bar {
  margin-top: 8px;
}

.app-game-tips {
  margin-top: 32px;
  width: calc(100% - 32px);
  text-align: center;
}

.app-related-links {
  margin-top: 32px;
  width: calc(100% - 16px);
}

@media screen and (max-height: 700px) {
  .passive-text {
    font-size: 12px;
  }

  .user-health-bar-text {
    margin-top: 8px;
    font-size: 12px;
  }

  .app-play-button,
  .app-attack-button {
    margin-top: 16px;
  }

  .app-game-tips {
    margin-top: 8px;
  }

  .app-related-links {
    margin-top: 8px;
  }
}

.background {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: black;

  .background-video {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }

  .background-layer {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: black;
    opacity: 0.6;
  }
}
</style>

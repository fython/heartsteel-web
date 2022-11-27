<script setup lang="ts">
import ItemBuySFX from "@/assets/media/item_buy.ogg";
import { ref } from "vue";
import { playSoundWithSettings } from "@/game/main-settings";

const emits = defineEmits<{
  (event: "click"): void;
}>();

const itemBuySFX = ref<HTMLAudioElement>();

const onClick = () => {
  playSoundWithSettings(itemBuySFX.value);
  emits("click");
};
</script>

<template>
  <div class="play-button-container">
    <button class="play-button" @click="onClick">购买</button>
    <span class="play-button-tips">（有音效请注意音量）</span>

    <audio
      class="item-buy-sfx"
      ref="itemBuySFX"
      :src="ItemBuySFX"
      preload="auto"
    />
  </div>
</template>

<style lang="less" scoped>
.play-button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.play-button {
  font-family: "Friz Quadrata Std Medium", sans-serif;
  font-size: 32px;
  font-weight: bold;
  padding: 8px 48px;
  border: 1px solid #000000;

  cursor: pointer;

  background-color: #c09b6a;
  clip-path: polygon(10% 0%, 100% 0%, 100% 70%, 90% 100%, 0% 100%, 0% 30%);
  transition: background-color 0.2s linear;

  &:hover {
    background-color: #d2b48c;
  }
}

.play-button-tips {
  margin-top: 4px;
  color: #d2b48c;
  font-size: 12px;
  opacity: 0.7;
}

.item-buy-sfx {
  display: none;
}
</style>

<script setup lang="ts">
import ItemBuySFX from "@/assets/media/item_buy.ogg";
import { ref } from "vue";

const emits = defineEmits<{
  (event: "click"): void;
}>();

const itemBuySFX = ref<HTMLAudioElement | null>(null);

const onClick = () => {
  const sfx = itemBuySFX.value;
  if (sfx) {
    sfx.currentTime = 0;
    sfx.volume = 0.5;
    sfx.play();
  }
  emits("click");
};
</script>

<template>
  <div>
    <button class="play-button" @click="onClick">购买</button>

    <audio
      class="item-buy-sfx"
      ref="itemBuySFX"
      :src="ItemBuySFX"
      preload="auto"
    />
  </div>
</template>

<style lang="less" scoped>
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

.item-buy-sfx {
  display: none;
}
</style>

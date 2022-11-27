<script setup lang="ts">
import { ref } from "vue";
import type { HeartsteelResourcesProvider } from "@/game/items/heartsteel";
import HeartsteelStackSFX1 from "@/assets/media/Heartsteel_stack_SFX_1.mp3";
import HeartsteelStackSFX2 from "@/assets/media/Heartsteel_stack_SFX_2.mp3";
import HeartsteelStackSFX3 from "@/assets/media/Heartsteel_stack_SFX_3.mp3";
import HeartsteelStackSFX4 from "@/assets/media/Heartsteel_stack_SFX_4.mp3";
import Heartsteel3rdStackSFX1 from "@/assets/media/Heartsteel_3rd_stack_SFX_1.mp3";
import Heartsteel3rdStackSFX2 from "@/assets/media/Heartsteel_3rd_stack_SFX_2.mp3";
import Heartsteel3rdStackSFX3 from "@/assets/media/Heartsteel_3rd_stack_SFX_3.mp3";
import HeartsteelTriggerSFX1 from "@/assets/media/Heartsteel_trigger_SFX_1.mp3";
import HeartsteelTriggerSFX2 from "@/assets/media/Heartsteel_trigger_SFX_2.mp3";
import HeartsteelTriggerSFX3 from "@/assets/media/Heartsteel_trigger_SFX_3.mp3";
import { installHeartsteelResourcesProvider } from "@/game/items/heartsteel";

const rootEl = ref<HTMLDivElement | null>(null);

const provider: HeartsteelResourcesProvider = {
  getStackSFX: (n: number) =>
    rootEl.value?.querySelector(`#heartsteel-stack-sfx-${n + 1}`)!,
  getThirdStackSFX: (n: number) =>
    rootEl.value?.querySelector(`#heartsteel-third-stack-sfx-${n + 1}`)!,
  getTriggerSFX: (n: number) =>
    rootEl.value?.querySelector(`#heartsteel-trigger-sfx-${n + 1}`)!,
};
installHeartsteelResourcesProvider(provider);
</script>

<template>
  <div class="heartsteel-audio-resources" ref="rootEl">
    <audio
      id="heartsteel-stack-sfx-1"
      :src="HeartsteelStackSFX1"
      preload="auto"
    />
    <audio
      id="heartsteel-stack-sfx-2"
      :src="HeartsteelStackSFX2"
      preload="auto"
    />
    <audio
      id="heartsteel-stack-sfx-3"
      :src="HeartsteelStackSFX3"
      preload="auto"
    />
    <audio
      id="heartsteel-stack-sfx-4"
      :src="HeartsteelStackSFX4"
      preload="auto"
    />

    <audio
      id="heartsteel-third-stack-sfx-1"
      :src="Heartsteel3rdStackSFX1"
      preload="auto"
    />
    <audio
      id="heartsteel-third-stack-sfx-2"
      :src="Heartsteel3rdStackSFX2"
      preload="auto"
    />
    <audio
      id="heartsteel-third-stack-sfx-3"
      :src="Heartsteel3rdStackSFX3"
      preload="auto"
    />

    <audio
      id="heartsteel-trigger-sfx-1"
      :src="HeartsteelTriggerSFX1"
      preload="auto"
    />
    <audio
      id="heartsteel-trigger-sfx-2"
      :src="HeartsteelTriggerSFX2"
      preload="auto"
    />
    <audio
      id="heartsteel-trigger-sfx-3"
      :src="HeartsteelTriggerSFX3"
      preload="auto"
    />
  </div>
</template>

<style scoped>
.heartsteel-audio-resources {
  display: none;
}
</style>

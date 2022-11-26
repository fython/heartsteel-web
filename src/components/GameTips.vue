<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import randomInteger from "random-int";

const allTips = [
  "模拟器中叠加层数会保存到浏览器中哦~",
  "神圣分离者和破败王者之刃都是心之钢的克星",
  "叠起来的生命值可以通过恶魔之拥或巨型九头蛇转化为输出属性",
  "成人正常静息心率通常在 60-100BPM 之间，而心之钢是 80BPM",
  "斯特拉克的挑战护手和石像鬼石板甲提供的护盾值都能享受心之钢带来的增益",
  "俄洛伊使用灵魂试炼扯出的灵魂会单独计算心之钢冷却时间",
  "心之钢又被称为电子木鱼",
  "心之钢叠的血有多厚，对面腕豪砸你的队友就有多痛",
  "GALA 大乱斗玩猫咪也出过心之钢且叠到了 1207 层",
  "建议打不过就加入（误",
  "很多远程英雄也适合出心之钢，配合巨型九头蛇和破败王者之刃打出不俗输出",
  "吸血鬼的被动会将部分生命值转化为额外法术强度，而心之钢提供可成长生命值",
  "河流之主塔姆的 Q 技能舌头长度会跟随生命值成长",
  "亡灵战神塞恩的 W 技能护盾值会根据自身最大生命值提供加成",
  "本模拟器使用 Vue.js 3 + TypeScript + Vite 进行开发",
  "欢迎熟悉前端开发的朋友贡献更多有趣的段子和功能",
  "本模拟器是一个 PWA 应用，你可以添加到你的手机桌面上随时使用",
];
const tipMagicIndex = ref(randomInteger(0, 1000));
const tipMagicStep = ref(randomInteger(0, allTips.length - 1));
const selectedTips = computed(() => {
  return allTips[tipMagicIndex.value % allTips.length];
});
const windowIntervalCallback = ref<number>();

onMounted(() => {
  windowIntervalCallback.value = window.setInterval(() => {
    tipMagicIndex.value += tipMagicStep.value;
  }, 5000);
});
</script>

<template>
  <div class="game-tips">
    <span class="game-tips-title">Tips: </span>{{ selectedTips }}
  </div>
</template>

<style lang="less" scoped>
.game-tips {
  font-size: 12px;
  opacity: 0.7;

  .game-tips-title {
    opacity: 0.5;
  }
}
</style>

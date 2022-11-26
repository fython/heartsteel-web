import { HeartsteelController } from "@/game/items/heartsteel";
import { computed, type Ref, ref } from "vue";
import { debounce } from "lodash-es";

export default class MainController {
  private lastTriggerTime = 0;
  heartsteel: HeartsteelController;
  baseHP: Ref<number>;
  bonusHP = computed(
    () => this.heartsteel.itemBaseHP + this.heartsteel.itemBonusHP.value
  );
  maxHP = computed(() => this.baseHP.value + this.bonusHP.value);

  constructor(baseHP = 1000) {
    this.baseHP = ref(Math.max(baseHP, 500));

    this.heartsteel = new HeartsteelController(this.baseHP);
  }

  start(): void {
    this.loadSlot();
    this.heartsteel.start();
    window.setInterval(() => this.saveSlot(), 1000);
  }

  loadSlot(): void {
    const slotValue = window.localStorage.getItem("heartsteel:bonus_hp");
    if (slotValue) {
      const bonusHp = Number(slotValue);
      if (!isNaN(bonusHp)) {
        this.heartsteel.itemBonusHP.value = bonusHp;
      }
    }
  }

  saveSlot(): void {
    window.localStorage.setItem(
      "heartsteel:bonus_hp",
      String(this.heartsteel.itemBonusHP.value)
    );
  }

  private _doAttack = debounce(
    () => {
      this.doAttackNormalOp();
      // prevent from double-triggering
      if (new Date().getTime() - this.lastTriggerTime < 3000) {
        return;
      }
      if (this.heartsteel.trigger()) {
        this.lastTriggerTime = new Date().getTime();
        window.navigator.vibrate?.([50, 20, 200]);
      }
    },
    100,
    {
      leading: true,
      trailing: false,
    }
  );

  doAttack(): void {
    this._doAttack();
  }

  private doAttackNormalOp(): void {
    // normal attack ops
  }
}

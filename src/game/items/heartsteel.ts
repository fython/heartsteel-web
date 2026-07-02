import randomInteger from "random-int";
import type { Ref } from "vue";
import { readonly, ref } from "vue";
import { playSoundWithSettings } from "@/game/main-settings";

interface HeartsteelResourcesProvider {
  getStackSFX(n: number): HTMLAudioElement;
  getThirdStackSFX(n: number): HTMLAudioElement;
  getTriggerSFX(n: number): HTMLAudioElement;
}

let heartResourcesProviderInstance: HeartsteelResourcesProvider | null = null;

function installHeartsteelResourcesProvider(
  resources: HeartsteelResourcesProvider,
): void {
  console.debug("installHeartsteelResourcesProvider:", resources);
  heartResourcesProviderInstance = resources;
}

const MAX_CHARGE_STACK_COUNT = 3;
const CHARGE_INTERVAL_MS = 1000;

class HeartsteelChargeProcess {
  private currentStackCount = 0;
  private chargeIntervalCallback: number | undefined;
  private isStopped = false;
  private activeAudio: HTMLAudioElement | undefined;

  maxStackCount = MAX_CHARGE_STACK_COUNT;

  isDebugging = false;
  onStackCountChange: (current: number) => void = () => {};

  constructor() {}

  reset(): void {
    this.activeAudio?.pause();
    this.isStopped = false;
    this.currentStackCount = 0;
    this.onStackCountChange(0);
  }

  start(): void {
    if (this.isDebugging) {
      console.debug("HeartsteelChargeProcess::start");
    }
    // set tick interval to 750ms (or other settings)
    this.chargeIntervalCallback = window.setInterval(
      () => this.onChargeIntervalTick(),
      CHARGE_INTERVAL_MS,
    );
    // trigger initial tick
    this.onChargeIntervalTick();
  }

  stop(): void {
    if (this.isDebugging) {
      console.debug("HeartsteelChargeProcess::stop");
    }
    this.isStopped = true;
    // clear interval
    if (this.chargeIntervalCallback) {
      window.clearInterval(this.chargeIntervalCallback);
    }
  }

  private async onChargeIntervalTick(): Promise<void> {
    if (this.isStopped) {
      return;
    }
    if (this.isDebugging) {
      console.debug(
        "HeartsteelChargeProcess::onChargeIntervalTick",
        `count=${this.currentStackCount}`,
      );
    }
    // notify current stack
    this.onStackCountChange(this.currentStackCount);
    // get audio element
    let audioEl: HTMLAudioElement;
    if (this.currentStackCount < MAX_CHARGE_STACK_COUNT) {
      audioEl = heartResourcesProviderInstance!.getStackSFX(
        this.currentStackCount,
      );
    } else {
      audioEl = heartResourcesProviderInstance!.getThirdStackSFX(
        randomInteger(0, 2),
      );
    }
    if (this.isDebugging) {
      console.debug(
        "HeartsteelChargeProcess::onChargeIntervalTick sfx_audio_el=",
        audioEl,
      );
    }
    this.activeAudio = audioEl;

    // play sfx
    try {
      await playSoundWithSettings(audioEl);
    } catch (e) {
      console.error("failed to play sfx:", e);
      // throw exception?
    }
    // stop self when reached max charge stack count
    if (this.currentStackCount === MAX_CHARGE_STACK_COUNT) {
      this.stop();
      return;
    }
    // increase current stack for next tick
    this.currentStackCount += 1;
  }
}

class HeartsteelController {
  private readonly heroMaxHP: Ref<number>;

  private readonly chargeProcess: HeartsteelChargeProcess;

  // 庞然吞食：伤害 = 70 + 6% × 最大生命值
  private readonly triggerDamageBase = 70;
  private readonly triggerDamagePercentageMaxHP = 0.06;
  // 永久生命值收益 = 实际造成伤害的 10%
  private readonly triggerHPConversionRate = 0.1;

  private activeAudio: HTMLAudioElement | undefined = undefined;

  readonly itemBaseHP = 900;
  readonly itemBonusHP = ref(0);
  readonly currentChargeStack = ref(0);

  constructor(heroMaxHP: Ref<number>) {
    this.heroMaxHP = heroMaxHP;

    this.chargeProcess = new HeartsteelChargeProcess();
    this.chargeProcess.isDebugging = true;
    this.chargeProcess.onStackCountChange = (n: number) => {
      this.currentChargeStack.value = n;
    };
  }

  start(): void {
    this.chargeProcess.start();
  }

  trigger(): boolean {
    if (this.currentChargeStack.value < this.chargeProcess.maxStackCount) {
      return false;
    }
    // play trigger sfx
    const audioEl = heartResourcesProviderInstance!.getTriggerSFX(
      randomInteger(0, 2),
    );
    this.activeAudio = audioEl;
    playSoundWithSettings(audioEl).catch((e) => {
      console.error(e);
    });
    // grant bonus hp (10% of damage dealt)
    this.itemBonusHP.value += this.triggerGrantBonusHP;
    // restart heartsteel charge process
    this.chargeProcess.reset();
    this.chargeProcess.start();
    return true;
  }

  release(): void {
    this.activeAudio?.pause();
  }

  /** 庞然吞食被动伤害：70 + 6% × 最大生命值 */
  get triggerDamage(): number {
    return (
      this.triggerDamageBase
      + this.heroMaxHP.value * this.triggerDamagePercentageMaxHP
    );
  }

  /** 触发后永久获得的最大生命值：实际伤害的 10% */
  get triggerGrantBonusHP(): number {
    return this.triggerDamage * this.triggerHPConversionRate;
  }
}

export {
  type HeartsteelResourcesProvider,
  installHeartsteelResourcesProvider,
  HeartsteelChargeProcess,
  HeartsteelController,
};

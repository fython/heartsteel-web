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
  resources: HeartsteelResourcesProvider
): void {
  console.debug("installHeartsteelResourcesProvider:", resources);
  heartResourcesProviderInstance = resources;
}

const MAX_CHARGE_STACK_COUNT = 4;
const CHARGE_INTERVAL_MS = 750;

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
      CHARGE_INTERVAL_MS
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
        `count=${this.currentStackCount}`
      );
    }
    // notify current stack
    this.onStackCountChange(this.currentStackCount);
    // get audio element
    let audioEl: HTMLAudioElement;
    if (this.currentStackCount < MAX_CHARGE_STACK_COUNT) {
      audioEl = heartResourcesProviderInstance!.getStackSFX(
        this.currentStackCount
      );
    } else {
      audioEl = heartResourcesProviderInstance!.getThirdStackSFX(
        randomInteger(0, 2)
      );
    }
    if (this.isDebugging) {
      console.debug(
        "HeartsteelChargeProcess::onChargeIntervalTick sfx_audio_el=",
        audioEl
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
  private readonly heroMaxHP: Readonly<Ref<number>>;

  private readonly chargeProcess: HeartsteelChargeProcess;

  private readonly triggerGrantBonusHPBase = 12.5;
  private readonly triggerGrantBonusHPPercentageMaxHP = 0.01 * 0.6;

  private activeAudio: HTMLAudioElement | undefined = undefined;

  readonly itemBaseHP = 800;
  readonly itemBonusHP = ref(0);
  readonly currentChargeStack = ref(0);

  constructor(heroMaxHP: Ref<number>) {
    this.heroMaxHP = readonly(heroMaxHP);

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
      randomInteger(0, 2)
    );
    this.activeAudio = audioEl;
    playSoundWithSettings(audioEl).catch((e) => {
      console.error(e);
    });
    // grant bonus hp
    this.itemBonusHP.value += this.triggerGrantBonusHPBase;
    // restart heartsteel charge process
    this.chargeProcess.reset();
    this.chargeProcess.start();
    return true;
  }

  release(): void {
    this.activeAudio?.pause();
  }

  get triggerGrantBonusHP(): number {
    return (
      this.triggerGrantBonusHPBase +
      this.heroMaxHP.value * this.triggerGrantBonusHPPercentageMaxHP
    );
  }
}

export {
  type HeartsteelResourcesProvider,
  installHeartsteelResourcesProvider,
  HeartsteelChargeProcess,
  HeartsteelController,
};

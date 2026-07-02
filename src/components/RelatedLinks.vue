<script setup lang="ts">
import { inject, ref } from "vue";
import { Share2, ExternalLink, Settings } from "@lucide/vue";
import { useMainSettings } from "@/game/main-settings";
import type MainController from "@/game/main-controller";
import SimpleModal from "@/components/SimpleModal.vue";
import VolumeSlider from "@/components/VolumeSlider.vue";
import { getLocale, setLocale, localeOptions, type Locale } from "@/i18n";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const qrcodeVisible = ref(false);
const licenseVisible = ref(false);
const currentLocale = ref<Locale>(getLocale());

const onLocaleChange = (event: Event) => {
  const newLocale = (event.target as HTMLSelectElement).value as Locale;
  setLocale(newLocale);
  currentLocale.value = newLocale;
};

interface LibrariesLicenseInfo {
  name: string;
  sourceUrl?: string;
  licenses: string;
}

const mainController = inject<MainController>("main-controller");

const librariesLicenseInfo: LibrariesLicenseInfo[] = [
  {
    name: "Vue.js",
    sourceUrl: "https://github.com/vuejs/vue",
    licenses: `The MIT License (MIT)

Copyright (c) 2013-present, Yuxi (Evan) You

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.`,
  },
  {
    name: "lodash",
    sourceUrl: "https://github.com/lodash/lodash",
    licenses: `The MIT License

Copyright JS Foundation and other contributors <https://js.foundation/

Based on Underscore.js, copyright Jeremy Ashkenas,
DocumentCloud and Investigative Reporters & Editors <http://underscorejs.org/>

This software consists of voluntary contributions made by many
individuals. For exact contribution history, see the revision history
available at https://github.com/lodash/lodash

The following license applies to all parts of this software except as
documented below:

====

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`,
  },
  {
    name: "random-int",
    sourceUrl: "https://github.com/sindresorhus/random-int",
    licenses: `MIT License

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (https://sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
  },
  {
    name: "Kanit",
    sourceUrl: "https://github.com/cadsondemak/kanit",
    licenses: `These fonts are licensed under the Open Font License.`,
  },
  {
    name: "Noto Sans Simplified Chinese",
    sourceUrl: "https://github.com/googlefonts/noto-cjk",
    licenses: `These fonts are licensed under the Open Font License.`,
  },
  {
    name: "Roboto Condensed",
    sourceUrl: "https://github.com/googlefonts/roboto",
    licenses: `These fonts are licensed under the Apache License, Version 2.0.`,
  },
];

const { vibrateEnabled } = useMainSettings();
</script>

<template>
  <div class="related-links">
    <div class="fake-a" @click="qrcodeVisible = true">
      <Share2 :size="14" />
      {{ $t("relatedLinks.share") }}
    </div>
    <span class="divider">|</span>
    <a href="https://github.com/fython/heartsteel-web" target="_blank">
      <ExternalLink :size="14" />
      GitHub
    </a>
    <span class="divider">|</span>
    <div class="fake-a" @click="licenseVisible = true">
      <Settings :size="14" />
      {{ $t("relatedLinks.settingsAndHelp") }}
    </div>

    <SimpleModal
      v-model="qrcodeVisible"
      :esc-to-close="true"
    >
      <span class="modal__title">{{ $t("relatedLinks.shareViaQR") }}</span>
      <img
        class="qrcode-img"
        src="../assets/media/qrcode.png"
        alt="Heartsteel"
      />
    </SimpleModal>

    <SimpleModal
      v-model="licenseVisible"
      :esc-to-close="true"
    >
      <span class="modal__title">{{ $t("relatedLinks.settingsAndHelp") }}</span>
      <div class="license-content">
        <div class="settings">
          <div class="license-subtitle">{{ $t("relatedLinks.settings") }}</div>
          <div class="settings-row">
            <span class="settings-row-label">{{ $t("language.name") }}</span>
            <select :value="currentLocale" @change="onLocaleChange" class="language-select">
              <option v-for="opt in localeOptions" :key="opt.value" :value="opt.value">
                {{ t(opt.labelKey) }}
              </option>
            </select>
          </div>
          <div class="settings-row settings-row--volume">
            <span class="settings-row-label">{{ $t("relatedLinks.soundVolume") }}</span>
            <VolumeSlider />
          </div>
          <div class="settings-row">
            <input
              type="checkbox"
              v-model="vibrateEnabled"
              id="settings-vibrate-enabled"
            />
            <label for="settings-vibrate-enabled">{{ $t("relatedLinks.vibrateEnabled") }}</label>
          </div>
          <button @click="mainController?.clearHeartsteelBonus()">
            {{ $t("relatedLinks.clearData") }}
          </button>
        </div>

        <div class="how-to-play">
          <div class="license-subtitle">{{ $t("relatedLinks.howToPlay") }}</div>
          <p>
            {{ $t("relatedLinks.howToPlayDesc1") }}
          </p>
          <p>
            {{ $t("relatedLinks.howToPlayDesc2") }}<a
              href="https://www.bilibili.com/video/BV1jM411r77W"
              >{{ $t("relatedLinks.howToPlayVideoTitle") }}</a
            >{{ $t("relatedLinks.howToPlayDesc2Suffix") }}
          </p>
          <p>
            {{ $t("relatedLinks.howToPlayDesc3") }}
          </p>
        </div>

        <div class="game-data-usage">
          <div class="license-subtitle">{{ $t("relatedLinks.copyrightTitle") }}</div>
          <p>
            {{ $t("relatedLinks.copyrightDesc1") }}
          </p>
          <p>
            {{ $t("relatedLinks.copyrightDesc2") }}
          </p>
        </div>

        <div class="contact-me">
          <div class="license-subtitle">{{ $t("relatedLinks.contactMe") }}</div>
          <p>{{ $t("relatedLinks.contactDesc") }}</p>
          <p><a href="mailto:fythonx@gmail.com">fythonx@gmail.com</a></p>
        </div>

        <div class="open-source-licenses">
          <div class="license-subtitle">{{ $t("relatedLinks.openSourceLicenses") }}</div>
          <p>
            {{ $t("relatedLinks.openSourceDesc") }}<a href="https://github.com/fython/heartsteel-web" target="_blank"
              >GitHub</a
            >
          </p>

          <template v-for="item in librariesLicenseInfo" :key="item.name">
            <div class="project-name">
              {{ item.name }}
              <template v-if="item.sourceUrl">
                (<a :href="item.sourceUrl" target="_blank">Source</a>)
              </template>
            </div>
            <div class="project-license">
              <pre>{{ item.licenses }}</pre>
            </div>
          </template>
        </div>
      </div>
    </SimpleModal>
  </div>
</template>

<style lang="less" scoped>
.related-links {
  display: flex;
  text-transform: uppercase;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  font-family: "Roboto Condensed", "Noto Sans SC", sans-serif;

  .divider {
    margin: 0 4px;
  }

  .fake-a {
    text-decoration: underline;
  }

  a, .fake-a {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  a {
    color: #fff;
  }
}

.modal__title {
  font-size: 18px;
  font-weight: bold;
}

.qrcode-img {
  object-fit: contain;
}

.license-content {
  min-width: 250px;
  max-width: 500px;
  height: 100%;
  margin-top: 8px;
  padding-right: 8px;

  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 16px;

  font-size: 14px;

  .license-subtitle {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 2px;
  }

  .project-name {
    font-size: 14px;
    font-weight: bold;
    margin: 4px 0;
  }

  .project-license {
    overflow: auto;
    padding: 8px;
    background-color: #f0f0f0;
  }
}

.settings {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.settings-row {
  display: flex;
  align-items: center;
  gap: 8px;

  label {
    cursor: pointer;
  }
}

.language-select {
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #c09b6a;
  }
}

.settings-row--volume {
  flex-direction: column;
  align-items: stretch;
  gap: 4px;

  .settings-row-label {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }
}
</style>

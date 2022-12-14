<script setup lang="ts">
import { inject, ref } from "vue";
import { useMainSettings } from "@/game/main-settings";
import type MainController from "@/game/main-controller";

const qrcodeVisible = ref(false);
const licenseVisible = ref(false);

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
    name: "vue-final-modal",
    sourceUrl: "https://github.com/vue-final/vue-final-modal",
    licenses: `MIT License

Copyright (c) 2019 Hunter

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

const { soundEnabled, vibrateEnabled } = useMainSettings();
</script>

<template>
  <div class="related-links">
    <div class="fake-a" @click="qrcodeVisible = true">
      https://heartsteel.gwo.app
    </div>
    <span class="divider">|</span>
    <a href="https://github.com/fython/heartsteel-web" target="_blank">
      GitHub
    </a>
    <span class="divider">|</span>
    <div class="fake-a" @click="licenseVisible = true">?????? &amp; ??????</div>

    <vue-final-modal
      class="qrcode-share-modal"
      v-model="qrcodeVisible"
      :esc-to-close="true"
      classes="modal-container"
      content-class="modal-content"
    >
      <span class="modal__title">????????????????????? ????????????????????????</span>
      <img
        class="qrcode-img"
        src="../assets/media/qrcode.png"
        alt="Heartsteel ??????"
      />
    </vue-final-modal>

    <vue-final-modal
      class="license-modal"
      v-model="licenseVisible"
      :esc-to-close="true"
      classes="modal-container"
      content-class="modal-content"
    >
      <span class="modal__title">?????? &amp; ??????</span>
      <div class="license-content">
        <div class="settings">
          <div class="license-subtitle">??????</div>
          <input
            type="checkbox"
            v-model="soundEnabled"
            id="settings-sound-enabled"
          />
          <label for="settings-sound-enabled">????????????</label>
          <br />
          <input
            type="checkbox"
            v-model="vibrateEnabled"
            id="settings-vibrate-enabled"
          />
          <label for="settings-vibrate-enabled">????????????????????????????????????</label>
          <br />
          <button @click="mainController?.clearHeartsteelBonus()">
            ??????????????????????????????
          </button>
        </div>

        <div class="how-to-play">
          <div class="license-subtitle">??????</div>
          <p>
            ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
          </p>
          <p>
            ???????????????????????????<a
              href="https://www.bilibili.com/video/BV1jM411r77W"
              >??????????????????????????????????????????</a
            >??????????????????????????????????????????????????????????????????????????????
          </p>
          <p>
            ?????????????????? PWA
            ?????????????????????????????????????????????/?????????????????????????????????
          </p>
        </div>

        <div class="game-data-usage">
          <div class="license-subtitle">?????????????????????</div>
          <p>
            ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
          </p>
          <p>
            ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
            ???????????????????????????????????????????????????????????????????????????????????????????????????
          </p>
        </div>

        <div class="contact-me">
          <div class="license-subtitle">?????????</div>
          <p>???????????????????????????????????????????????????????????????????????????</p>
          <p><a href="mailto:fythonx@gmail.com">fythonx@gmail.com</a></p>
        </div>

        <div class="open-source-licenses">
          <div class="license-subtitle">????????????</div>
          <p>
            ????????????????????????????????????/????????????????????????????????????????????? MIT License
            ???????????????????????????
            <a href="https://github.com/fython/heartsteel-web" target="_blank"
              >GitHub</a
            >
            ???
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
    </vue-final-modal>
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

  a {
    color: #369d9b;
  }
}

:deep(.modal-container) {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.modal-content) {
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  padding: 1rem;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 64px);
  border-radius: 0.25rem;
  background: white;
  color: #1a1a1a;
  text-transform: none;
  font-family: "Kanit", "Noto Sans SC", sans-serif;

  .modal__title {
    font-size: 18px;
    font-weight: bold;
  }
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
</style>

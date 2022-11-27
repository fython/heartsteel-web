<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import { inject, ref } from "vue";
import { useMainSettings } from "@/game/main-settings";
import MainController from "@/game/main-controller";

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
    <div class="fake-a" @click="licenseVisible = true">设置 &amp; 帮助</div>

    <vue-final-modal
      class="qrcode-share-modal"
      v-model="qrcodeVisible"
      :esc-to-close="true"
      classes="modal-container"
      content-class="modal-content"
    >
      <span class="modal__title">通过二维码分享 “心之钢模拟器”</span>
      <img src="../assets/media/qrcode.png" alt="Heartsteel 网站" />
    </vue-final-modal>

    <vue-final-modal
      class="license-modal"
      v-model="licenseVisible"
      :esc-to-close="true"
      classes="modal-container"
      content-class="modal-content"
    >
      <span class="modal__title">设置 &amp; 帮助</span>
      <div class="license-content">
        <div class="settings">
          <div class="license-subtitle">设置</div>
          <input
            type="checkbox"
            v-model="soundEnabled"
            id="settings-sound-enabled"
          />
          <label for="settings-sound-enabled">启用音效</label>
          <br />
          <input
            type="checkbox"
            v-model="vibrateEnabled"
            id="settings-vibrate-enabled"
          />
          <label for="settings-vibrate-enabled">启用震动（针对移动设备）</label>
          <br />
          <button @click="mainController?.clearHeartsteelBonus()">
            清空当前层数以及存档
          </button>
        </div>

        <div class="how-to-play">
          <div class="license-subtitle">玩法</div>
          <p>
            购买心之钢后会模拟对附近敌人充能三秒，攻击按钮下方的进度充满时进行攻击，即可触发心之钢被动。
          </p>
          <p>
            游戏玩法灵感来自《<a
              href="https://www.bilibili.com/video/BV1jM411r77W"
              >半夜十二点，心之钢玩家的脑子</a
            >》视频，业余时间不多开发周期较长，如有雷同纯属巧合。
          </p>
          <p>
            本页面实现了 PWA
            应用特性，你可以在支持的浏览器/平台上安装到本地使用。
          </p>
        </div>

        <div class="game-data-usage">
          <div class="license-subtitle">版权及隐私声明</div>
          <p>
            本页面是一个由爱好者二次创作的模拟小游戏，仅提供免费、非商业用途的服务，与官方立场无关。
          </p>
          <p>
            其中所使用的网络游戏美术、音效素材来自于互联网部分维基站点允许使用的资源，请在二次使用前了解清楚素材来源的使用条款。
            游戏互动不涉及官方在线数据，亦不向第三方提交任何数据，请放心使用。
          </p>
        </div>

        <div class="contact-me">
          <div class="license-subtitle">联系我</div>
          <p>如果您有任何疑问或建议可以通过以下电子邮箱联系我：</p>
          <p><a href="mailto:fythonx@gmail.com">fythonx@gmail.com</a></p>
        </div>

        <div class="open-source-licenses">
          <div class="license-subtitle">开源协议</div>
          <p>
            本项目离不开这些开源软件/字体的伟大付出，同时我们将使用 MIT License
            发布本项目源代码于
            <a href="https://github.com/fython/heartsteel-web" target="_blank"
              >GitHub</a
            >
            上
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

::v-deep .modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep .modal-content {
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

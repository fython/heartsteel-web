<script setup lang="ts">
import { VueFinalModal } from "vue-final-modal";
import { ref } from "vue";

const qrcodeVisible = ref(false);
const licenseVisible = ref(false);
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
    <div class="fake-a" @click="licenseVisible = true">公告及许可</div>

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
      <span class="modal__title">公告及许可</span>
      <div class="license-content">
        <div class="game-data-usage">
          <div class="license-subtitle">公告</div>
          <p>
            本页面是一个由爱好者个人搭建的模拟小游戏，仅提供免费、非商业用途的服务。所使用的网络游戏美术、音效素材来自于互联网部分维基站点允许使用的资源，不涉及官方在线数据，亦不向第三方提交任何数据，请放心使用。
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
          <div class="project-name">Vue.js</div>
          <div class="project-license">
            <pre>
The MIT License (MIT)

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
THE SOFTWARE.</pre
            >
          </div>

          <div class="project-name">vue-final-modal</div>
          <div class="project-license">
            <pre>
MIT License

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
SOFTWARE.</pre
            >
          </div>

          <div class="project-name">lodash</div>
          <div class="project-license">
            <pre>
The MIT License

Copyright JS Foundation and other contributors &lt;https://js.foundation/

Based on Underscore.js, copyright Jeremy Ashkenas,
DocumentCloud and Investigative Reporters & Editors &lt;http://underscorejs.org/>

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
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</pre
            >
          </div>

          <div class="project-name">random-int</div>
          <div class="project-license">
            <pre>
MIT License

Copyright (c) Sindre Sorhus &lt;sindresorhus@gmail.com> (https://sindresorhus.com)

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
SOFTWARE.</pre
            >
          </div>

          <div class="project-name">Kanit / Noto Sans Simplified Chinese</div>
          <div class="project-license">
            <pre>These fonts are licensed under the Open Font License.</pre>
          </div>

          <div class="project-name">Roboto Condensed</div>
          <div class="project-license">
            <pre>
These fonts are licensed under the Apache License, Version 2.0.</pre
            >
          </div>
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

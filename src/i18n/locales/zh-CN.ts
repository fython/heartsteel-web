export default {
  // App.vue
  app: {
    passiveTitle: "被动 - 庞然吞食：",
    passiveDesc:
      "当 700 码内有一名敌方英雄时，会每秒叠加一层充能，最多叠加 3 层。对带有 3 层充能的目标进行攻击会造成 70 + 你 6% 最大生命值的额外物理伤害，并为你提供相当于 10% 该伤害的永久最大生命值。{del}（这里没有冷却 :P）",
    passiveDescDel: "对每个目标有 30 秒冷却时间。",
    yourHealth: "你的生命值：",
  },

  // PlayButton.vue
  playButton: {
    buy: "购买",
    soundTips: "（有音效请注意音量）",
  },

  // GameTips.vue
  tips: {
    prefix: "Tips: ",
  },

  // RelatedLinks.vue
  relatedLinks: {
    share: "分享",
    settingsAndHelp: "设置 & 帮助",
    shareViaQR: '通过二维码分享 "心之钢模拟器"',
    settings: "设置",
    soundVolume: "音效音量",
    vibrateEnabled: "启用震动（针对移动设备）",
    clearData: "清空当前层数以及存档",
    howToPlay: "玩法",
    howToPlayDesc1:
      "购买心之钢后会模拟对附近敌人每秒叠加一层充能，最多 3 层。攻击按钮下方的进度充满时进行攻击，即可触发心之钢被动。",
    howToPlayDesc2:
      "游戏玩法灵感来自《",
    howToPlayVideoTitle: "半夜十二点，心之钢玩家的脑子",
    howToPlayDesc2Suffix: "》视频，业余时间不多开发周期较长，如有雷同纯属巧合。",
    howToPlayDesc3:
      "本页面实现了 PWA 应用特性，你可以在支持的浏览器/平台上安装到本地使用。",
    copyrightTitle: "版权及隐私声明",
    copyrightDesc1:
      "本页面是一个由爱好者二次创作的模拟小游戏，仅提供免费、非商业用途的服务，与官方立场无关。",
    copyrightDesc2:
      "其中所使用的网络游戏美术、音效素材来自于互联网部分维基站点允许使用的资源，请在二次使用前了解清楚素材来源的使用条款。游戏互动不涉及官方在线数据，亦不向第三方提交任何数据，请放心使用。",
    contactMe: "联系我",
    contactDesc: "如果您有任何疑问或建议可以通过以下电子邮箱联系我：",
    openSourceLicenses: "开源协议",
    openSourceDesc:
      "本项目离不开这些开源软件/字体的伟大付出，同时我们将使用 MIT License 发布本项目源代码于 {link} 上",
  },

  // VolumeSlider.vue
  volume: {
    mute: "静音",
    unmute: "开启音效",
    volumeLabel: "音量: {percent}%",
  },

  // Language switcher
  language: {
    name: "语言",
    zhCN: "简体中文",
    zhTW: "繁體中文（台灣）",
    en: "English",
  },
};

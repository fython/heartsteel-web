export default {
  // App.vue
  app: {
    passiveTitle: "被動 - 龐然吞食：",
    passiveDesc:
      "當 700 碼內有一名敵方英雄時，會每秒疊加一層充能，最多疊加 3 層。對帶有 3 層充能的目標進行攻擊會造成 70 + 你 6% 最大生命值的額外物理傷害，並為你提供相當於 10% 該傷害的永久最大生命值。{del}（這裡沒有冷卻 :P）",
    passiveDescDel: "對每個目標有 30 秒冷卻時間。",
    yourHealth: "你的生命值：",
  },

  // PlayButton.vue
  playButton: {
    buy: "購買",
    soundTips: "（有音效請注意音量）",
  },

  // GameTips.vue
  tips: {
    prefix: "Tips: ",
  },

  // RelatedLinks.vue
  relatedLinks: {
    share: "分享",
    settingsAndHelp: "設定 & 說明",
    shareViaQR: "透過 QR Code 分享「心之鋼模擬器」",
    settings: "設定",
    soundVolume: "音效音量",
    vibrateEnabled: "啟用震動（針對行動裝置）",
    clearData: "清空目前層數以及存檔",
    howToPlay: "玩法",
    howToPlayDesc1:
      "購買心之鋼後會模擬對附近敵人每秒疊加一層充能，最多 3 層。攻擊按鈕下方的進度充滿時進行攻擊，即可觸發心之鋼被動。",
    howToPlayDesc2:
      "遊戲玩法靈感來自《",
    howToPlayVideoTitle: "半夜十二點，心之鋼玩家的腦子",
    howToPlayDesc2Suffix: "》影片，業餘時間不多開發週期較長，如有雷同純屬巧合。",
    howToPlayDesc3:
      "本頁面實現了 PWA 應用特性，你可以在支援的瀏覽器/平台上安裝到本機使用。",
    copyrightTitle: "版權及隱私聲明",
    copyrightDesc1:
      "本頁面是一個由愛好者二次創作的模擬小遊戲，僅提供免費、非商業用途的服務，與官方無立場關聯。",
    copyrightDesc2:
      "其中所使用的網路遊戲美術、音效素材來自於網際網路部分維基站點允許使用的資源，請在二次使用前了解清楚素材來源的使用條款。遊戲互動不涉及官方線上資料，亦不向第三方提交任何資料，請放心使用。",
    contactMe: "聯絡我",
    contactDesc: "如果您有任何疑問或建議可以透過以下電子信箱聯絡我：",
    openSourceLicenses: "開源協議",
    openSourceDesc:
      "本專案離不開這些開源軟體/字型偉大的付出，同時我們將使用 MIT License 發布本專案原始碼於 {link} 上",
  },

  // VolumeSlider.vue
  volume: {
    mute: "靜音",
    unmute: "開啟音效",
    volumeLabel: "音量: {percent}%",
  },

  // Language switcher
  language: {
    name: "語言",
    zhCN: "简体中文",
    zhTW: "繁體中文（台灣）",
    en: "English",
  },
};

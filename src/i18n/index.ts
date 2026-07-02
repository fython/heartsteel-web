import { createI18n } from "vue-i18n";
import zhCN from "./locales/zh-CN";
import zhTW from "./locales/zh-TW";
import en from "./locales/en";

export type Locale = "zh-CN" | "zh-TW" | "en";

const STORAGE_KEY = "heartsteel:locale";

function getStoredLocale(): Locale | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && ["zh-CN", "zh-TW", "en"].includes(stored)) {
      return stored as Locale;
    }
  } catch {
    // ignore
  }
  return null;
}

function getBrowserLocale(): Locale {
  const lang = navigator.language;
  if (lang.startsWith("zh")) {
    if (lang === "zh-TW" || lang === "zh-Hant" || lang.includes("TW") || lang.includes("HK")) {
      return "zh-TW";
    }
    return "zh-CN";
  }
  if (lang.startsWith("en")) {
    return "en";
  }
  return "zh-CN";
}

const initialLocale = getStoredLocale() || getBrowserLocale();

// Set initial document language
document.documentElement.lang = initialLocale;

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: "zh-CN",
  messages: {
    "zh-CN": zhCN,
    "zh-TW": zhTW,
    en: en,
  },
});

export function setLocale(locale: Locale): void {
  i18n.global.locale.value = locale;
  window.localStorage.setItem(STORAGE_KEY, locale);
  document.documentElement.lang = locale;
}

export function getLocale(): Locale {
  return i18n.global.locale.value as Locale;
}

export const localeOptions: { value: Locale; labelKey: string }[] = [
  { value: "zh-CN", labelKey: "language.zhCN" },
  { value: "zh-TW", labelKey: "language.zhTW" },
  { value: "en", labelKey: "language.en" },
];

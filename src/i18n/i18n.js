import Vue from "vue";
import VueI18n from "vue-i18n";
import { allLanguageContent, getLang } from "./langData";
// 官网: http://kazupon.github.io/vue-i18n/zh/

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: getLang("en"),
  // 没有匹配的语言默认英语
  fallbackLocale: "en",
  formatFallbackMessages: true,
  messages: allLanguageContent,
});

export default i18n;

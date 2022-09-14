import allLanguageContent from "./langs";

const navigatorLanguage = navigator.language; // 浏览器语言
// 判断语言
const checkLang = function (lang) {
  let _lang = "";

  if (lang) {
    const langArr = Object.keys(allLanguageContent);

    lang = lang.toLowerCase();

    langArr.forEach((item) => {
      // 和多语言预设code完全匹配 或者 对应国家的语言code 例如：es-MX, en-US
      if (lang === item || new RegExp(`${item}[_-][a-zA-Z]{2,}`).test(lang)) {
        _lang = item;
      }
    });
  }

  return _lang;
};
const getLang = (lang) => {
  // 默认传入参数 > 本地缓存 > 浏览器默认
  lang = lang || localStorage.Upseller_lang || navigatorLanguage;
  lang = checkLang(lang) || "en"; // 检测语言不通过，设置为默认语言

  return lang;
};

const getAllLangNames = function (allLanguageContent) {
  const obj = {};

  let key;
  for (key in allLanguageContent) {
    obj[key] = allLanguageContent[key]["lang_name"];
  }

  return obj;
};

const allLangNames = getAllLangNames(allLanguageContent);

export { allLanguageContent, getLang, allLangNames };

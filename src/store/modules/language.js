import utils from "../../utils/index";
import i18n from "../../i18n/i18n";
import { allLangNames } from "../../i18n/langData";

const getIsZh = function (val) {
  return val.includes("zh");
};

// 当前模块数据对象
const state = {
  lang: i18n.locale, // 默认为 浏览器语言
  isZh: getIsZh(i18n.locale), // 语言是否是中文
  allLangNames: allLangNames,
};

// 设置数据相关
const mutations = {
  SET_LANG: (state, lang) => {
    state.lang = lang;
  },
  SET_IS_ZH: (state) => {
    state.isZh = getIsZh(state.lang);
  },
};

const actions = {
  // 切换语言
  switchLang({ commit }, lang) {
    i18n.locale = lang;
    localStorage.setItem("lang", lang);
    commit("SET_LANG", lang);
    commit("SET_IS_ZH");

    if (lang === "zhHK") {
      lang = "zh-hk";
    }

    utils.setQueryString("lang", lang);
  },
};

export default {
  namespaced: true, // namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
  state,
  mutations,
  actions,
};

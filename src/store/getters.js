const getters = {
  // 语言
  vxLangCode: (state) => state.language.lang, // 所有语言 key ：语言名称
  vxAllLangNames: (state) => state.language.allLangNames,
  vxIsLogin: (state) => state.system.vxIsLogin,
  vxLoginTip: (state) => state.system.vxLoginTip,
  vxUserInfo: (state) => state.system.vxUserInfo,
  vxUserSite: (state) => state.system.vxUserSite,
  vxMobileDevices: (state) => state.system.vxMobileDevices, // 是否是移动端
  noticeCount: (state) => state.system.noticeCount,
};

export default getters;

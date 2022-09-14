// import reqs from '../../utils/network'

const state = {
  vxIsLogin: false,
  vxLoginTip: "", // 登录提示
  vxUserInfo: {},
  vxMobileDevices: false,
  vxUserSite: "US",
  noticeCount: {
    notificationCount: 0,
    repliesCount: 0,
    reactionCount: 0,
  },
};

const mutations = {
  UPDATE_LOGIN_STATUS(state, val) {
    state.vxIsLogin = val;
  },
  UPDATE_LOGIN_TIP(state, val) {
    state.vxLoginTip = val;
  },
  UPDATE_MOBILE_DEVICES(state, val) {
    state.vxMobileDevices = val;
  },
  UPDATE_USER_INFO(state, data) {
    state.vxUserInfo = data;
  },
  UPDATE_USER_SITE(state, val) {
    state.vxUserSite = val;
  },
  UPDATE_NOTICECOUNT(state, data) {
    state.noticeCount[data.type] = data.val;
  },
};

const actions = {
  updateLoginStatus({ commit }, value) {
    commit("UPDATE_LOGIN_STATUS", value);
  },
  updateLoginTip({ commit }) {
    commit("UPDATE_LOGIN_TIP", new Date().getTime());
  },
  updateMobileDevices({ commit }) {
    const MobileDevices = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );

    commit("UPDATE_MOBILE_DEVICES", MobileDevices);
  },
  updateUserInfo({ commit }, value) {
    commit("UPDATE_USER_INFO", value);
  },
  updateUserSite({ commit }, value) {
    commit("UPDATE_USER_SITE", value);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

const localDataKey = "id_local_data"; // 本地数据key

const get = function (key) {
  return localStorage[key];
};
const set = function (key, val) {
  localStorage[key] = val;
};

// 本地存储数据
const state = {
  localData: get(localDataKey), // 本地数据
};

// 设置数据
const mutations = {
  // 设置本地数据
  SET_LOCAL_DATA: (state, val) => {
    state.localData = val;
    set(localDataKey, val);
  },
};

// 异步请求相关处理动作
const actions = {
  getLocalDataAction() {},
};

export default {
  namespaced: true, // namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
  state,
  mutations,
  actions,
};

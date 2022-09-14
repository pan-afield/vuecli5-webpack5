import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n/i18n"; // i18n 多语言
import "lib-flexible/flexible";
import "vant/lib/index.less";
import "@/assets/iconfont/iconfont.css";
// 自定义工具类
import Utils from "./utils";
import Requests from "@/utils/network"; // 接口
import appConfig from "@/utils/appConfig";
import {
  Button,
  Popover,
  Popup,
  Field,
  Notify,
  Dialog,
  Icon,
  Toast,
  Search,
} from "vant";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Popup);
Vue.use(Field);
Vue.use(Notify);
Vue.use(Dialog);
Vue.use(Icon);
Vue.use(Toast);
Vue.use(Search);
Vue.use(Popover);

// 项目全局相关配置
Object.assign(Vue.prototype, {
  // 全局配置
  $appConfig: appConfig,
  // 日期处理
  $moment: window.moment,
  // 自写公共 工具库
  $utils: Utils,
  // 接口
  $http: Requests,
});

router.beforeEach((to, from, next) => {
  let isLogin = false;
  const cookie = document.cookie.split(";");
  const cookieObj = {};

  cookie.forEach((item) => {
    const cookieItem = item.trim().split("=");

    cookieObj[cookieItem[0]] = cookieItem[1];
  });

  if (cookieObj.userToken && +cookieObj.isTemp !== 2) {
    isLogin = true;

    if (cookieObj.userName)
      store.dispatch("system/updateUserInfo", {
        name: cookieObj.userName,
        photo: cookieObj.userPhoto,
      });
  }

  store.dispatch("system/updateLoginStatus", isLogin);
  store.dispatch("system/updateMobileDevices");
  // if (!isLogin && to.name !== 'Deal_Detail') path = '/web/deals/all.html'

  // if (path && to.fullPath !== path) {
  //     next({ path: path })
  // } else {
  next();
  // }
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");

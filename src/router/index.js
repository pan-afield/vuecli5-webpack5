import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

// 跳转重复路由时，清除页面报错 FIX: https://www.cnblogs.com/chenwan1218/p/13130410.html
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

/*
 * 路由参数说明
 * name：// 路由名称
 * path：// 路由路径
 * component：// 路由组件
 * meta： // 路由元数据
 *   title: '页面标题'
 * */

const constantRoutes = [
  {
    name: "Login_Page",
    path: "/",
    redirect: { name: "Home" },
  },
  // //登录后页面
  {
    name: "Web_Index",
    path: "/web",
    redirect: "/web/home.html",
    component: () => import("@/views/Index"),
    children: [
      // home页
      {
        name: "Home",
        path: "home.html",
        component: () => import("@/views/home/Index"),
        meta: {
          type: "home",
          module: "home",
          hasNav: true,
        },
      },
      //   // 标签列表页
      //   {
      //     name: "Label_Page",
      //     path: "label/list.html",
      //     component: () => import("@/views/home/LabelPage"),
      //     meta: {
      //       type: "labelPage",
      //       module: "",
      //       hasNav: true,
      //     },
      //   },
      //   // 优惠券列表页
      //   {
      //     name: "All_Deals",
      //     path: "deals/all.html",
      //     component: () => import("@/views/deals/AllDeals"),
      //     meta: {
      //       type: "allDeals",
      //       module: "deals",
      //       hasNav: true,
      //     },
      //   },
      //   // 优惠券详情页
      //   {
      //     name: "Deal_Detail",
      //     path: "deal/detail/:id.html",
      //     component: () => import("@/views/dealDetail/Index"),
      //     meta: {
      //       type: "dealDetail",
      //       module: "deals",
      //       hasNav: true,
      //     },
      //   },
      //   // 所有类目页
      //   {
      //     name: "All_Category",
      //     path: "categorys/all.html",
      //     component: () => import("@/views/allCategory/Index.vue"),
      //     meta: {
      //       type: "allCategory",
      //       module: "categorys",
      //       hasNav: true,
      //     },
      //   },
      //   // 搜索结果页
      //   {
      //     name: "Search_Result",
      //     path: "deal/search.html",
      //     component: () => import("@/views/search/Index"),
      //     meta: {
      //       type: "searchResult",
      //       module: "deals",
      //       hasNav: true,
      //     },
      //   },
      //   // 个人中心
      //   {
      //     name: "Personal_Center",
      //     path: "personal.html",
      //     component: () => import("@/views/user/Index"),
      //     meta: {
      //       type: "personalCenter",
      //       module: "",
      //       hasNav: true,
      //     },
      //   },
      //   // 关于
      //   {
      //     name: "About",
      //     path: "about.html",
      //     component: () => import("@/views/about/Index"),
      //     meta: {
      //       type: "about",
      //       module: "",
      //       hasNav: true,
      //     },
      //   },
      //   // 消息中心
      //   {
      //     name: "Message_Center",
      //     path: "message",
      //     redirect: "/web/message/notifications.html",
      //     component: () => import("@/views/messageCenter/Index"),
      //     children: [
      //       {
      //         name: "Message_Center_Notifications",
      //         path: "notifications.html",
      //         component: () => import("@/views/messageCenter/notification/Index"),
      //         meta: {
      //           type: "messageCenterNotification",
      //           module: "message",
      //           hasNav: true,
      //         },
      //       },
      //       {
      //         name: "Message_Center_Replies",
      //         path: "replies.html",
      //         component: () => import("@/views/messageCenter/replies/Index"),
      //         meta: {
      //           type: "messageCenterReplies",
      //           module: "message",
      //           hasNav: true,
      //         },
      //       },
      //       {
      //         name: "Message_Center_Reactions",
      //         path: "reactions.html",
      //         component: () => import("@/views/messageCenter/reaction/Index"),
      //         meta: {
      //           type: "messageCenterReaction",
      //           module: "message",
      //           hasNav: true,
      //         },
      //       },
      //     ],
      //   },
      //   // 帮助页
      //   {
      //     name: "Help",
      //     path: "help/index.html",
      //     component: () => import("@/views/help/Index"),
      //     meta: {
      //       type: "help",
      //       module: "",
      //       hasNav: true,
      //     },
      //   },
      // 404
      {
        name: "Page404",
        path: "404.html",
        component: () => import("@/views/errorPage/404"),
        meta: {
          title: "404",
        },
      },
    ],
  },

  // 404页必须放在末尾！！！
  { path: "*", redirect: "/web/404.html" },
];

const createRouter = () =>
  new VueRouter({
    mode: "history", // 路由模式 是否带#号
    routes: constantRoutes,
    scrollBehavior: () => ({ y: 0 }), // 切换路由滚动条回到顶部
  });

const router = createRouter();

export default router;

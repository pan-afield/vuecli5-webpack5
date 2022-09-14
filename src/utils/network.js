import api from "./http.js";

const user = {
  userRemoveAct(json) {
    return api.get("/myActivity/remove", json);
  },
  userReplyPage(json) {
    return api.postForm("/myActivity/reply-page", json);
  },
  userReactionPage(json) {
    return api.postForm("/myActivity/reaction-page", json);
  },
  userHistoryPage(json) {
    return api.postForm("/myActivity/history-page", json);
  },
  userCoupon(json) {
    return api.postForm("/myDeals/page", json);
  },
  userFavorite(json) {
    return api.postForm("/myCollection/page", json);
  },
  // 清空我的收藏
  userRemoveFavorite(json) {
    return api.post("/myCollection/remove", json);
  },
  userRegister(json) {
    return api.post("/user/add", json);
  },
  userLogin(json) {
    return api.postForm("/user/login", json);
  },
  sendLoginEmail(json) {
    return api.get("/user/send-login-email", json);
  },
  getUserInfo(json) {
    return api.postForm("/user/getuserinfo", json);
  },
  updateUserInfo(json) {
    return api.post("/user/updateuserinfo", json);
  },
  updatePassword(json) {
    return api.postForm("/user/updatepwd", json);
  },
  // 获取优惠券发布人信息
  getCompanyInfo(json) {
    return api.get("/user/getUserDealsStatistics", json);
  },
  // 发送验证码
  sendEmailCode(json) {
    return api.get("/user/send-email-code", json);
  },
  // 忘记密码
  forgotPassword(json) {
    return api.postForm("/user/forget-password", json);
  },
  // 邮箱验证重复
  checkEmail(json) {
    return api.postForm("/user/checkemail", json);
  },
  // 消息中心 - 获取统计数据
  getMessageCount(json) {
    return api.get("/message/get-type-count", json);
  },
  // 消息中心 - 获取详细数据
  getMessageList(json) {
    return api.post("/message/buyer-message-page-list", json);
  },
  // 个人信息
  dealsReviewUserInfo(json) {
    return api.get("/user/get-user-statistics", json);
  },
  // 获取cos签名
  getSign(json) {
    return api.post("/cos/getSign", json);
  },
  // 图片文件上传到腾讯云
  uploadImgToCos({ url, headers, file }) {
    return api.putCos(url, headers, file);
  },
  // 获取cos签名
  savePhoto(json) {
    return api.postForm("/cos/save-photo", json);
  },
  // 校验密码
  onCheckEmail(json) {
    return api.get("/user/check-password", json);
  },
  // 发送修改邮件
  sendUpdateEmail(json) {
    return api.get("/user/send-update-email", json);
  },
  // 修改邮箱
  onUpdateEmail(email, code) {
    return api.post(`/user/update-email?newEmail=${email}&code=${code}`);
  },
};

const deals = {
  // 用户举报
  userDealsReport(json) {
    return api.post("/user-feedback/deals", json);
  },
  // 首页banner列表数据
  getBannerList(json) {
    return api.get("/banner/list-banner", json);
  },
  // 获取动态标签数据
  getActiveTagList(json) {
    return api.get("/tag-deals/list-by-phone", json);
  },
  // 获取foryou列表
  getForYouList(json) {
    return api.post("/deals/list-foryou", json);
  },
  // 获取Top Discount标签数据
  getTopDiscount(json) {
    return api.get("/tag-deals/list-by-fixed-tag", json);
  },
  // 获取Last Chance标签数据
  getLastChance(json) {
    return api.post("/tag-deals/deals-page-by-tag", json);
  },
  // 首页banner列表数据
  getPageByTagId(json) {
    return api.post("/tag-deals/deals-page-by-tagid", json);
  },
  // 评论
  dealsReview(json) {
    return api.get("/deals/review", json);
  },
  // 互动
  dealsInteract(json) {
    return api.get("/deals/interact", json);
  },
  // 评论信息
  dealsListReview(json) {
    // reviewId为1查看更多
    return api.get("/deals/list-review", json);
  },
  // 类目面包屑
  dealsFullCategory(json) {
    return api.get("/deals/list-full-category", json);
  },
  // 商品类目
  dealsCategory(json) {
    return api.get("/deals/listCategory", json);
  },
  // 统计数据
  dealsPageCount(json) {
    return api.postForm("/deals/pageCount", json);
  },
  // 优惠券列表
  dealsPageList(json) {
    return api.postForm("/deals/pageC", json);
  },
  // 最优惠的前20个优惠券
  getRecommendDeals(json) {
    return api.get("/deals/list-recommend-deals", json);
  },
  // 收藏优惠券
  dealsCollect(json) {
    return api.get("/deals/collect", json);
  },
  // 优惠券加减热度
  dealsHotChange(json) {
    return api.get("/deals/hot", json);
  },
  // 认领优惠券
  claimCoupon(json) {
    return api.get("/deals/claimCoupon", json);
  },
  // 认领优惠券
  dealDetail(json) {
    return api.get("/deals/detail", json);
  },
  // 获取热销商品
  tagDealsList(json) {
    return api.get("/tag-deals/list", json);
  },
  // 按标签id刷新优惠卷列表
  getTagItemDeals(json) {
    return api.get("/tag-deals/tag-deals-detail", json);
  },
  // 获取搜索热词
  getSearchHotWord(json) {
    return api.get("/deals/search-hot-word", json);
  },
  // 获取搜索词补充
  getSearchSuggest(json) {
    return api.get("/deals/suggest-search-string", json);
  },
  // 获取亚马逊评论数据
  getAmazonReviewInfo(json) {
    return api.get("/deals/deals-review", json);
  },
  // 获取亚马逊评论数据
  getAmazonReviewImg(json) {
    return api.get("/deals/list-review-img", json);
  },
  // 获取全部优惠券领取记录
  getAllCouponRecord(json) {
    return api.get("/claim-record/claim-record-24-hour", json);
  },
  // 获取指定优惠券的领取记录
  getCouponRecord(json) {
    return api.post("/claim-record/list-by-dealsid", json);
  },
};

const requests = {
  ...user,
  ...deals,
};

export default requests;

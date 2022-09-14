<template>
  <nav class="head_nav">
    <div class="nav_content flex center_align">
      <van-icon
        name="wap-nav"
        size="20"
        color="#a5afb5"
        @click="navDrawerShow"
      />
      <van-icon
        class="ml_20"
        name="search"
        size="20"
        color="#a5afb5"
        @click="getSearchWord"
      />
      <div class="logo">
        <img src="../../assets/image/logo/logo_s2.png" alt="" @click="goHome" />
      </div>
      <div v-if="vxIsLogin" class="flex_item_right mr_16">
        <van-popover
          v-model="showPopover"
          trigger="click"
          :actions="actions"
          @select="onSelect"
        >
          <template #reference>
            <img class="avatar" :src="vxUserInfo.photo" />
          </template>
        </van-popover>
      </div>
      <span v-else class="f_white f_16" @click="loginModalShow">{{
        $t('Comm.Login.Sign_In')
      }}</span>

      <!-- <span class="cl_9">|</span> -->

      <div
        v-if="vxIsLogin"
        class="notice_box"
        @click="goMessageCenter({ key: 'Notifications' })"
      >
        <span class="icon_notification f_24 f_white" />
        <div
          v-if="
            noticeCount.notificationCount > 0 ||
            noticeCount.reactionCount > 0 ||
            noticeCount.repliesCount > 0
          "
          class="dot"
        />
        <!-- <div v-if="notificationCount > 0 || reactionCount > 0 || repliesCount > 0" class="dot" /> -->
      </div>
      <van-popup
        class="left_popup"
        :visible.sync="navDrawerVisible"
        :options="leftPopupOption"
      >
        <img src="../../assets/image/logo/logo_s1.png" alt="" />

        <template v-if="siteVisible">
          <div class="mt_24 f_12 cl_9">
            {{ $t('Comm.Nav.Please_Choose_Country') }}
          </div>

          <template v-for="item in countries">
            <div
              :key="item"
              class="site_item flex center_align"
              @click="siteChange({ key: item })"
            >
              <img
                :src="require(`../../assets/image/flags/${item}.png`)"
                alt=""
              />
              <span class="ml_8">{{ item }}</span>
              <span v-if="item === site" class="icon_mobile_check site_check" />
            </div>
          </template>

          <div class="site_back" @click="siteVisible = false">
            {{ $t('Comm.Nav.Back') }}
          </div>
        </template>

        <template v-else>
          <ul class="nav_list">
            <li
              :class="{ active: navName === 'home' }"
              @click="navActiveChange('home')"
            >
              <img src="../../assets/image/icon/home.png" alt="" />
              <span>{{ $t('Comm.Nav.Home') }}</span>
            </li>
            <li
              :class="{ active: navName === 'deals' }"
              @click="navActiveChange('deals')"
            >
              <img src="../../assets/image/icon/deals.png" alt="" />
              <span>{{ $t('Comm.Nav.Deals') }}</span>
            </li>
            <li
              :class="{ active: navName === 'categorys' }"
              @click="navActiveChange('categorys')"
            >
              <img src="../../assets/image/icon/categorys.png" alt="" />
              <span>{{ $t('Comm.Nav.Categories') }}</span>
            </li>
          </ul>
          <ul
            class="scroll"
            :style="{ height: `calc(${mobileHeight}px - 296px)` }"
          >
            <li
              v-for="item in categoryList"
              :key="item.id"
              @click.stop="searchCategorys(item)"
            >
              {{ item.nameLocal }}
            </li>
          </ul>
          <div
            class="current_site flex center_align"
            @click="siteVisible = true"
          >
            <img
              :src="require(`../../assets/image/flags/${site}.png`)"
              alt=""
            />
            <span class="ml_5">{{ site }}</span>
            <span class="icon_mobile_sidebar_arrow flex_item_right" />
          </div>
        </template>
      </van-popup>
      <van-popup
        class="right_popup"
        :visible.sync="searchDrawerVisible"
        :options="rightPopupOption"
      >
        <div class="search_head">
          <van-search
            v-model="searchValue"
            shape="round"
            :placeholder="$t('Comm.Nav.Search_Products')"
            @search="globalSearch"
            @input="searchChange"
          />
          <span
            class="ml_15 f_white f_16"
            @click="searchDrawerVisible = false"
            >{{ $t('Comm.Nav.Back') }}</span
          >
        </div>

        <div class="search_box">
          <ul v-if="searchSuggestShow" class="mt_12">
            <li
              v-for="item in searchSuggestList"
              :key="item"
              class="word_local"
              @click="searchByWord(item)"
            >
              {{ item }}
            </li>
          </ul>

          <template v-else>
            <template v-if="localWordList.length">
              <div class="f_16 fw_500">
                {{ $t('Comm.Nav.Search_History') }}
              </div>
              <ul class="mt_12">
                <li
                  v-for="item in localWordList"
                  :key="item"
                  class="word_local"
                  @click="searchByWord(item)"
                >
                  {{ item }}
                </li>
              </ul>
            </template>
            <template v-if="hotWordList.length">
              <div class="search_hot">
                <img
                  class="hot_icon"
                  src="../../assets/image/svg/fire.svg"
                  alt=""
                />
                <span class="f_16 fw_500 f_primary">{{
                  $t('Comm.Nav.Hot_Search')
                }}</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in hotWordList"
                  :key="item"
                  class="hot_item"
                  @click="searchByWord(item)"
                >
                  <span class="icon_number_bg hot_index"
                    ><span>{{ index + 1 }}</span></span
                  >
                  <span>{{ item }}</span>
                </li>
              </ul>
            </template>
          </template>
        </div>
      </van-popup>
    </div>
    <NewLogin ref="login" />
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import NewLogin from '../login/NewLogin'
import VanPopup from '../modal/VanPopup.vue'

export default {
  name: 'HeadNav',
  components: { NewLogin, VanPopup },
  data() {
    return {
      showPopover: false,
      // 通过 actions 属性来定义菜单选项
      actions: [
        { text: this.$t('Comm.Nav.My_Profile') },
        { text: this.$t('Comm.Nav.Log_Out') }
      ],
      navName: 'home',
      searchValue: '',
      userPhoto: '',
      navDrawerVisible: false,
      leftPopupOption: { position: 'left', width: '245px' },
      rightPopupOption: { position: 'right' },
      siteVisible: false,
      searchDrawerVisible: false,
      // countries: ['US', 'UK', 'DE', 'FR', 'IT', 'ES'], // 国家数据
      countries: ['US'], // 国家数据
      site: 'US',
      mobileHeight: '',
      categoryList: [],
      searchWordShow: true, // pc端显示搜索词
      searchSuggestShow: false, // 搜索补全是否显示
      searchSuggestList: [],
      localWordList: [], // 本地记录搜索词
      hotWordList: [], // 热门搜索词
      noticeStyle: {
        width: '160px'
      },
      timer: null
    }
  },
  computed: {
    ...mapGetters([
      'vxIsLogin',
      'vxUserInfo',
      'vxMobileDevices',
      'vxUserSite',
      'noticeCount'
    ])
  },
  watch: {
    vxUserSite() {
      this.getDealsCategory()
    }
    // vxIsLogin(newVal) {
    //   if (newVal) {
    //     this.getMessageCount();
    //     this.timer = setInterval(() => {
    //       this.getMessageCount();
    //     }, 10000);
    //   } else {
    //     clearInterval(this.timer);
    //   }
    // },
  },
  created() {
    if (this.vxMobileDevices) this.mobileHeight = window.innerHeight
    const throttleFunc = this.$utils.throttle(() => {
      this.mobileHeight = window.innerHeight
    }, 1000)
    window.onresize = () => {
      throttleFunc()
    }
    this.getDealsCategory()

    // 获取消息通知数量
    // if (this.vxIsLogin) {
    //   this.getMessageCount();
    //   this.timer = setInterval(() => {
    //     this.getMessageCount();
    //   }, 10000);
    // }
  },
  mounted() {
    // const _this = this;

    this.navName = this.$route.meta.module || 'home'

    // !this.vxMobileDevices &&
    //   document.addEventListener("click", function (e) {
    //     if (_this.searchWordShow && !_this.$refs.searchBox.contains(e.target))
    //       _this.searchWordShow = false;
    //   });
  },
  methods: {
    // 用户操作
    onSelect(action) {
      if (action.text === 'My Profile') {
        // 个人档案
        this.$utils.$pageGo('router', { name: 'Personal_Center' })
      } else {
        // 退出登录
        document.cookie = 'userToken=;path=/;expires=' + new Date().getTime()
        document.cookie = 'userPhoto=;path=/;expires=' + new Date().getTime()
        if (this.$route.name === 'Home') {
          window.location.reload()
        } else {
          this.$utils.$pageGo('router', { name: 'Home' })
        }
      }
    },
    goHome() {
      this.navName = 'home'
      this.$utils.$pageGo('router', { name: 'Home' })
    },
    // 选择类目
    async searchCategorys(item) {
      if (this.vxMobileDevices) this.navDrawerVisible = false
      this.navName = 'categorys'
      this.$utils.$pageGo('router', {
        name: 'All_Deals',
        query: { type: 'categorys', id: item.id }
      })
    },
    // 获取类目
    async getDealsCategory() {
      let res = null

      try {
        res = await this.$http.dealsCategory({ site: this.vxUserSite, isC: 1 })
      } catch (e) {
        this.$message.error(e.message)
      }

      this.categoryList = res && res.length ? res : []
    },
    // 获取本地搜索词和热门搜索
    getSearchWord() {
      const searchWord = localStorage.getItem('searchWord')

      if (this.vxMobileDevices) this.searchValue = ''
      if (searchWord) this.localWordList = searchWord.split(',')
      this.getSearchHotWord()
    },
    // 获取搜索热词
    async getSearchHotWord() {
      let res = null

      try {
        res = await this.$http.getSearchHotWord()
      } catch (e) {
        this.$message.error(e.message)
      }

      this.hotWordList = res || []
      this[
        this.vxMobileDevices ? 'searchDrawerVisible' : 'searchWordShow'
      ] = true
    },
    // 搜索内容变化回调
    searchChange() {
      this.searchSuggestShow = this.searchValue
      this.getSearchSuggest()
    },
    // 获取搜索词补充
    async getSearchSuggest() {
      let res = null

      try {
        res = await this.$http.getSearchSuggest({
          searchString: this.searchValue.trim()
        })
      } catch (e) {
        this.$message.error(e.message)
      }

      this.searchSuggestList = res || []
    },
    // 选择历史搜索词或热门搜索
    searchByWord(searchWord) {
      this.searchValue = searchWord
      this.searchWordShow = false
      this.globalSearch()
    },
    // 打开登录弹层
    loginModalShow() {
      this.$refs.login.modalShow()
    },
    // 切换登录注册弹层
    modalReplace(modalName) {
      this.$refs[modalName].modalShow()
    },
    // 导航点击跳转
    navActiveChange(name) {
      this.navName = name
      if (this.navDrawerVisible) this.navDrawerVisible = false
      if (name === 'home') {
        this.$utils.$pageGo('router', { name: 'Home' })
      } else if (name === 'deals') {
        this.$utils.$pageGo('router', { name: 'All_Deals' })
      } else if (name === 'categorys') {
        this.$utils.$pageGo('router', {
          name: 'All_Category',
          query: { type: 'categorys' }
        })
      }
    },
    // 全局搜索
    globalSearch() {
      if (this.searchValue) {
        let wordArr = []
        const searchWord = localStorage.getItem('searchWord')

        this.searchValue = this.searchValue.trim()
        if (searchWord) {
          wordArr = searchWord.split(',')
          if (wordArr.length > 4) wordArr.splice(4)
          if (wordArr.indexOf(this.searchValue) === -1)
            wordArr.push(this.searchValue)
        } else {
          wordArr = [this.searchValue]
        }
        localStorage.setItem('searchWord', wordArr)

        if (this.vxMobileDevices) {
          this.searchDrawerVisible = false
        } else {
          this.searchWordShow = false
        }
        this.$utils.$pageGo('router', {
          name: 'Search_Result',
          query: { keyword: this.searchValue }
        })
        this.navName = 'deals'
        this.searchSuggestShow = false
      }
    },
    // 移动端导航显示
    navDrawerShow() {
      this.siteVisible = false
      this.navDrawerVisible = true
    },
    // 切换站点
    siteChange(item) {
      this.site = item.key
      this.$store.dispatch('system/updateUserSite', item.key)
    },
    // 用户操作
    // userOperation({ key }) {
    //   if (key === "myProfile") {
    //     // 个人档案
    //     this.$utils.$pageGo("router", { name: "Personal_Center" });
    //   } else if (key === "loginOut") {
    //     // 退出登录
    //     document.cookie = "userToken=;path=/;expires=" + new Date().getTime();
    //     document.cookie = "userPhoto=;path=/;expires=" + new Date().getTime();
    //     if (this.$route.name === "Home") {
    //       window.location.reload();
    //     } else {
    //       this.$utils.$pageGo("router", { name: "Home" });
    //     }
    //   }
    // },
    // 跳转到消息中心页面
    goMessageCenter(item) {
      if (
        (this.$route.name === 'Message_Center_Notifications' &&
          item.key === 'Notifications') ||
        (this.$route.name === 'Message_Center_Replies' &&
          item.key === 'Replies') ||
        (this.$route.name === 'Message_Center_Reactions' &&
          item.key === 'Reactions')
      ) {
        this.$router.go(0)
      } else {
        this.$utils.$pageGo('router', { name: 'Message_Center_' + item.key })
      }
    },
    // 获取消息中心信息数据
    async getMessageCount() {
      let res = null
      try {
        res = await this.$http.getMessageCount()
      } catch (e) {
        this.$message.error(e.message)
      }
      if (res) {
        this.$store.commit('system/UPDATE_NOTICECOUNT', {
          type: 'notificationCount',
          val: res.buyerNotification
        })
        this.$store.commit('system/UPDATE_NOTICECOUNT', {
          type: 'repliesCount',
          val: res.buyerReplies
        })
        this.$store.commit('system/UPDATE_NOTICECOUNT', {
          type: 'reactionCount',
          val: res.buyerReaction
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
/deep/.left_popup {
  .van-popup {
    padding: 24px;
    text-align: left;
  }
}
.user_name {
  display: inline-block;
  max-width: 80px;
  line-height: 32px;
}

.user_down_icon {
  position: absolute;
  top: 11px;
  right: -15px;
}

.hot_index {
  position: relative;
  display: inline-block;
  height: 20px;
  margin-right: 5px;
  line-height: 20px;

  &::before {
    display: inline-block;
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: #fef2d1;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    line-height: 22px;
    color: #fff;
    text-align: center;
  }
}

.hot_item:nth-child(1) .hot_index::before {
  color: #e03e4d;
}

.hot_item:nth-child(2) .hot_index::before {
  color: #f58221;
}

.hot_item:nth-child(3) .hot_index::before {
  color: #fac161;
}

.notice {
  font-size: 20px;
  color: white;
}

.head_nav {
  background: #303235;
  height: 50px;
  line-height: 50px;
}

.nav_content {
  width: 100vw;
  padding: 0 12px;
  align-items: center;
}

.logo {
  flex: 1;
  font-size: 22px;
  color: #fff;
  text-align: center;
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 14px;
}

.nav_list {
  margin-top: 18px;
  margin-bottom: 0;

  li {
    font-size: 16px;
    font-weight: 500;
    line-height: 42px;

    span {
      vertical-align: middle;
    }
  }
}

.scroll {
  height: calc(100vh - 296px);
  overflow-y: scroll;

  li {
    padding-left: 28px;
    overflow: hidden;
    font-size: 14px;
    font-weight: 400;
    line-height: 42px;
    color: #666;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.current_site {
  position: absolute;
  bottom: 24px;
  width: 197px;
  padding: 0 12px;
  line-height: 30px;
  background: #f1f1f1;
  border-radius: 4px;
}

.site_item {
  line-height: 42px;

  &:not(:last-child) {
    border-bottom: 1px solid #f3f3f3;
  }
}

.site_check {
  margin-left: auto;
  font-size: 18px;
  color: #20bbd5;
}

.site_back {
  position: absolute;
  bottom: 24px;
  width: 197px;
  line-height: 30px;
  color: #333;
  text-align: center;
  background: #f1f1f1;
  border-radius: 4px;
}

.right_popup {
  text-align: left;
  /deep/.van-popup {
    background: #f1f1f1;
  }
  .search_head {
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 24px;
    line-height: 60px;
    background: #303235;

    /deep/ .van-search {
      display: inline-block;
      flex: 1;
      border-radius: 50%;
      .van-cell {
        padding: 5px 8px;
      }
    }
  }

  .search_box {
    padding: 20px 24px;

    .word_local {
      display: inline-block;
      padding: 0 12px;
      margin: 0 12px 8px 0;
      font-size: 12px;
      line-height: 30px;
      color: #666;
      background: #fff;
      border-radius: 15px;
    }
  }

  .search_hot {
    height: 60px;
    padding: 0 12px;
    margin-top: 14px;
    line-height: 60px;
    background: url('../../assets/image/search_hot_bg.png') no-repeat;
    background-size: cover;

    .hot_icon {
      width: 18px;
      height: 18px;
      vertical-align: text-bottom;
    }
  }

  .hot_item {
    position: relative;
    padding: 0 12px;
    line-height: 40px;
    background: #fff;

    &:not(:last-child)::after {
      position: absolute;
      content: '';
      bottom: 0;
      left: 12px;
      width: calc(100vw - 72px);
      height: 1px;
      background: #f1f1f1;
    }
  }
}

.login {
  font-family: 'SF UI Text Light';
}

.notice_box {
  position: relative;
  margin-left: 16px;

  .dot {
    position: absolute;
    top: 18px;
    left: 15px;
    width: 6px;
    height: 6px;
    background-color: #d82323ed;
    border-radius: 50%;
  }
}
</style>

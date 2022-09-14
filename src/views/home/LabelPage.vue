<template>
  <div class="deals_container">
    <div v-if="bannerUrl" class="label_banner">
      <img :src="bannerUrl" alt="" />
    </div>

    <!--优惠券列表-->
    <div class="deal_Box">
      <template v-if="dealList && dealList.length">
        <template v-for="(item, index) in dealList">
          <DealItem
            :key="item.id"
            :deal-item="item"
            @dealItemUpdate="dealItemUpdate"
            @copyAndJump="copyAndJump"
          />

          <div
            v-if="
              index === 3 ||
              (dealList.length < 4 &&
                index === dealList.length - 1 &&
                vxMobileDevices)
            "
            :key="'banner' + item.id"
            class="banner_box"
            @click="jumpToFb"
          >
            <img
              :src="
                require(`../../assets/image/banner_${
                  vxMobileDevices ? 2 : 1
                }.png`)
              "
              alt=""
            />
          </div>
        </template>
        <div v-if="isLoading" class="w_full f_18 mb_12 lh_36 cl_9 fw_600 t_c">
          {{ $t('Loading more...') }}
        </div>
      </template>

      <a-list v-else :data-source="[]" />
    </div>

    <!--置顶和置底-->
    <div
      v-if="vxMobileDevices"
      class="scroll_box scroll_box_mobile"
      :style="{ right: scrollToShow ? '16px' : '-50px' }"
    >
      <div class="scroll_item" @click="scrollTo('top')">
        <span class="icon_top" />
      </div>
      <div class="scroll_item" @click="scrollTo('bottom')">
        <span class="icon_bottom" />
      </div>
    </div>
    <div
      v-else
      class="scroll_box scroll_box_pc"
      :style="{ bottom: fixBottom + 'px' }"
    >
      <div class="scroll_item" @click="scrollTo('top')">
        <span class="icon_arrow_up" />
      </div>
      <div class="scroll_item" @click="scrollTo('bottom')">
        <span class="icon_arrow_down" />
      </div>
    </div>

    <!--复制折扣码-->
    <CouponCopy ref="couponCopy" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DealItem from '../deals/DealItem'
import CouponCopy from '../deals/CouponCopy'

let scrollToTimeOut = null

export default {
  name: 'LabelPage',
  components: { DealItem, CouponCopy },
  data() {
    return {
      pageNo: 1,
      totalPage: 0,
      isLoading: false,
      tagId: '',
      dealList: [],
      bannerUrl: '',
      scrollToShow: false,
      fixBottom: 50
    }
  },
  computed: {
    ...mapGetters(['vxMobileDevices', 'vxUserSite'])
  },
  created() {
    this.tagId = this.$route.query.id
    this.getPageByTagId()
  },
  mounted() {
    document
      .querySelector('.main_content')
      .addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    document
      .querySelector('.main_content')
      .removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 获取优惠券列表
    async getPageByTagId() {
      let res = null

      if (this.pageNo > 1) this.isLoading = true
      try {
        res = await this.$http.getPageByTagId({
          pageNo: this.pageNo,
          pageSize: 20,
          tagId: this.tagId
        })
      } catch (e) {
        this.$message.error(e.message)
      }

      if (res) {
        this.bannerUrl = this.vxMobileDevices ? res.tagPhoneImg : res.tagPcImg
        if (res.dealsVoPage) {
          this.totalPage = res.dealsVoPage.pages
          if (res.dealsVoPage.list)
            this.dealList = this.dealList.concat(res.dealsVoPage.list)
        }
      }
      this.isLoading = false
    },
    // 监听滚动加载下一页
    handleScroll() {
      const _this = this
      const $foot = document.querySelector('.footContent')
      const top = $foot.getBoundingClientRect().top // 元素顶端到可见区域顶端的距离
      const clientHei = document.documentElement.clientHeight // 浏览器可见区域高度。
      if (top <= clientHei && this.pageNo < this.totalPage && !this.isLoading) {
        _this.pageNo += 1
        _this.getPageByTagId()
      }

      this.footFixCount()
      this.scrollToShow = true
      clearTimeout(scrollToTimeOut)
      scrollToTimeOut = setTimeout(() => {
        this.scrollToShow = false
      }, 2000)
    },
    // 计算置顶位置
    footFixCount() {
      const $foot = document.querySelector('.footContent')
      const top = $foot.getBoundingClientRect().top // 元素顶端到可见区域顶端的距离
      const clientHei = document.documentElement.clientHeight // 浏览器可见区域高度。
      this.footShow = top <= clientHei

      if (this.vxMobileDevices) {
        this.fixBottom = 50
      } else {
        this.fixBottom = this.footShow ? clientHei - top + 16 : 50
      }
    },
    // 置顶或置底
    scrollTo(type) {
      document
        .querySelector('.main_content')
        .removeEventListener('scroll', this.handleScroll)
      document.querySelector('.main_content').style[
        '-webkit-overflow-scrolling'
      ] = 'auto'

      if (type === 'top') {
        // document.querySelector('.deals_container').scrollIntoView(true)
        document.querySelector('.main_content').scrollTop = 0
      } else {
        document.querySelector('.page_foot').scrollIntoView(true)
      }

      this.footFixCount()
      document.querySelector('.main_content').style[
        '-webkit-overflow-scrolling'
      ] = 'touch'
      setTimeout(() => {
        document
          .querySelector('.main_content')
          .addEventListener('scroll', this.handleScroll)
      }, 200)
    },
    // 收藏或领取优惠券回调修改状态
    dealItemUpdate(id, key, val) {
      this.dealList.forEach((item) => {
        if (+item.id === +id) {
          if (key === 'coupon') {
            item.isClaim = 1
            item.couponCode = val
          } else {
            item[key] = val
          }
        }
      })
    },
    // 复制
    copyAndJump(id, code, url, store) {
      this.$refs.couponCopy.modalShow(id, code, url, store)
    },
    // 加入fb群组
    jumpToFb() {
      window.open('https://www.facebook.com/groups/updeals/', '_blank')
    }
  }
}
</script>

<style scoped lang="scss">
.label_banner {
  width: 100%;
  text-align: center;

  img {
    max-height: 108px;
  }
}

.deal_Box /deep/ .ant-list {
  width: 100%;
  height: 100%;
  background: #fff;
}

.banner_box {
  cursor: pointer;

  img {
    width: 100%;
  }
}

.scroll_box {
  position: fixed;
  z-index: 9;

  .scroll_item {
    color: #9a9a9a;
    text-align: center;
    cursor: pointer;
    background: #fff;
  }
}

@media screen and (max-width: 768px) {
  .label_banner img {
    max-height: 54px;
  }

  .deal_Box {
    min-height: calc(100vh - 222px);
    padding: 16px 12px 0;

    /deep/ .ant-list {
      margin-top: 12px;
    }

    .banner_box {
      margin-bottom: 12px;
    }
  }

  .scroll_box_mobile {
    bottom: 50px;
    width: 42px;
    transition: all 0.5s ease 0s;

    .scroll_item {
      width: 42px;
      height: 42px;
      font-size: 20px;
      line-height: 42px;
      border-radius: 21px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.18);

      &:last-child {
        margin-top: 12px;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .deal_Box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 1200px;
    min-height: calc(100vh - 352px);
    margin: 20px auto 0;

    .deal_item {
      width: 592px;
      margin-bottom: 16px;
    }

    .banner_box {
      width: 1200px;
      margin-bottom: 16px;
    }
  }

  .scroll_box_pc {
    left: calc(50% + 616px);
    width: 64px;

    .scroll_item {
      width: 64px;
      height: 64px;
      font-size: 20px;
      line-height: 64px;
      border-radius: 4px;

      &:last-child {
        margin-top: 8px;
      }
    }
  }
}
</style>

<template>
  <div>
    <div class="head_nav_box">
      <HeadNav />
    </div>

    <div class="main_content">
      <router-view />
      <Footer />
      <CookieTip />
      <IntroduceTip />
    </div>
  </div>
</template>

<script>
import HeadNav from '@/components/layout/HeadNav'
import Footer from '@/components/layout/Footer'
import CookieTip from '@/components/layout/CookieTip'
import IntroduceTip from '@/components/layout/IntroduceTip'

export default {
  name: 'RootView',
  components: { HeadNav, Footer, CookieTip, IntroduceTip },
  watch: {
    $route() {
      window.location.reload()
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .head_nav {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100vw;
}

.main_content {
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: auto;
}

.head_nav_box {
  height: 50px;
}

.main_content {
  height: calc(100vh - 50px);
}
</style>

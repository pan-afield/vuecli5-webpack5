<template>
  <div v-if="cookieTip" class="tip_cookie">
    <div class="tip_text">
      {{
        $t(
          "UpDeals uses cookies from third-parties or affiliate networks to enhance your experience. We may be paid a commission if you buy a product or service after clicking one of our links. If you continue without changing your browser settings you agree to their use."
        )
      }}
    </div>

    <div class="tip_operat">
      <a class="read_more" href="javascript:" @click="jumpToAbout">{{
        $t("Read More")
      }}</a>
      <van-button type="primary" @click="agreeClause">{{
        $t("OK")
      }}</van-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CookieTip",
  data() {
    return {
      cookieTip: true,
    };
  },
  computed: {
    ...mapGetters(["vxMobileDevices"]),
  },
  created() {
    this.cookieTip = !localStorage.getItem("cookieClause");
  },
  methods: {
    agreeClause() {
      localStorage.setItem("cookieClause", 1);
      this.cookieTip = false;
    },
    jumpToAbout() {
      this.$utils.$pageGo("window", {
        href: this.$utils.$localHref("/about.html"),
        query: { type: "privacy" },
      });
    },
  },
};
</script>

<style scoped lang="less">
.tip_cookie {
  position: fixed;
  bottom: 0;
  z-index: 99;
  width: 100vw;
  color: #fff;
  background: rgba(0, 0, 0, 0.8);
}

.read_more {
  color: #fff;
  text-decoration: underline;
}

.tip_cookie {
  padding: 20px 24px 40px;
}

.tip_operat {
  display: flex;
  justify-content: center;
  margin-top: 16px;

  .read_more {
    flex: 1;
    text-align: center;
  }

  .van-button {
    width: 150px;
    height: 28px;
    line-height: 28px;
  }
}
</style>

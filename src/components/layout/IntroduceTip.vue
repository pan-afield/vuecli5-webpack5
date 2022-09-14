<template>
  <div v-if="visible" class="introduce_box">
    <div class="introduce_cont">
      <img
        :src="
          require(`../../assets/image/welcome_${
            vxMobileDevices ? 'mobile' : 'pc'
          }.png`)
        "
        alt=""
      />
      <div class="close" @click="tipClose">
        {{ $t("Close") }}({{ second }}s)
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "IntroduceTip",
  data() {
    return {
      visible: false,
      second: 0,
      countDown: null,
    };
  },
  computed: {
    ...mapGetters(["vxMobileDevices"]),
  },
  created() {
    const pageName = this.$route.name;
    const pageArr = [
      "Personal_Center",
      "Message_Center_Notification",
      "Message_Center_Replies",
      "Message_Center_Reaction",
    ];

    this.visible =
      !localStorage.getItem("introduce") && !pageArr.includes(pageName);
    if (this.visible) {
      this.second = 5;
      this.countDown = setInterval(() => {
        this.second--;
        if (this.second < 0) this.tipClose();
      }, 1000);
    }
  },
  methods: {
    tipClose() {
      clearInterval(this.countDown);
      localStorage.setItem("introduce", 1);
      this.visible = false;
    },
  },
};
</script>

<style scoped lang="less">
.introduce_box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.7);

  .close {
    width: 105px;
    height: 40px;
    margin: 24px auto 0;
    font-weight: 500;
    line-height: 40px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    background: #000;
    border-radius: 20px;
  }
}

@media screen and (max-width: 768px) {
  .introduce_cont {
    padding: 0 16px;

    > img {
      width: 100%;
    }
  }
}

@media screen and (min-width: 768px) {
  .introduce_cont {
    width: 1200px;
    margin: 0 auto;

    > img {
      width: 574px;
    }
  }
}
</style>

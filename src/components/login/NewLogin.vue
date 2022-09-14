<template>
  <div class="new_login">
    <VanPopup
      :visible.sync="visible"
      :options="modalOptions"
      @handleCancel="modalClose"
    >
      <div class="t_c">
        <img src="../../assets/image/logo/logo_b1.png" alt="" />
      </div>

      <div class="sign_text fw_500 t_c">
        Sign in to avoid missing out on great deals
      </div>

      <a
        class="login_btn"
        :href="$utils.$location.origin + '/api/oauth/render/facebook'"
      >
        <div><img src="../../assets/image/icon/facebook.png" alt="" /></div>
        <span>Continue with Facebook</span>
      </a>
      <a
        class="login_btn"
        :href="$utils.$location.origin + '/api/oauth/render/google'"
      >
        <div><img src="../../assets/image/icon/google.png" alt="" /></div>
        <span>Continue with Google</span>
      </a>

      <div class="mt_10 t_c cl_9">
        We'll never post without your permission.
      </div>

      <div class="or_box t_c">
        <span class="or_cont">OR</span>
        <div class="or_line" />
      </div>

      <div
        class="email_box"
        :class="{ error: emailError }"
        :style="{ 'border-color': borderColor }"
      >
        <van-field v-model="email" @focus="emailFocus" @blur="emailBlur" />
        <span class="placeholder" :class="{ top: tipTop }">Email</span>
      </div>
      <div v-if="emailError" class="f_red">Please enter a valid email</div>

      <van-button class="sign_btn" type="primary" @click="sendLoginEmail"
        >Sign in With Email</van-button
      >
    </VanPopup>

    <VerifyAccount ref="verify" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VanPopup from "../modal/VanPopup";
import VerifyAccount from "./VerifyAccount";

export default {
  name: "NewLogin",
  components: { VanPopup, VerifyAccount },
  data() {
    return {
      visible: false,
      email: "",
      borderColor: "#d9d9d9",
      tipTop: false,
      emailError: false,
    };
  },
  computed: {
    ...mapGetters(["vxLoginTip"]),
    modalOptions() {
      return {
        closeable: true,
        borderRadius: "4px",
        width: "315px",
        height: "518px",
      };
    },
  },
  watch: {
    vxLoginTip() {
      this.modalShow();
    },
  },
  methods: {
    modalShow() {
      this.email = "";
      this.borderColor = "#d9d9d9";
      this.tipTop = false;
      this.emailError = false;
      this.visible = true;
    },
    emailFocus() {
      this.borderColor = "#fa7b0c";
      this.tipTop = true;
      this.emailError = false;
    },
    emailBlur() {
      const flag = this.$utils.valReg(this.email, "email");

      this.borderColor = "#d9d9d9";
      this.tipTop = this.email.trim();
      this.emailError = !flag;
    },
    async sendLoginEmail() {
      if (this.emailError) return;

      let res = null;

      try {
        res = await this.$http.sendLoginEmail({
          email: this.email,
          frontDomain: window.location.origin,
        });
      } catch (e) {
        this.$message.error(e.message);
      }

      if (res) {
        this.modalClose();
        this.$refs.verify.modalShow(this.email);
      }
    },
    modalClose() {
      this.visible = false;
    },
  },
};
</script>

<style scoped lang="less">
.new_login {
  .van-popup {
    padding: 24px 16px 32px;
  }

  .login_btn {
    display: flex;
    margin-top: 20px;
    align-items: center;
    color: #272727;
    border: 1px solid #d9d9d9;
    border-radius: 4px;

    > span {
      flex: 1;
      text-align: center;
    }
    padding: 0 12px;
    font-size: 14px;
  }
  .sign_text {
    margin-top: 18px;
    font-size: 22px;
  }

  .or_box {
    position: relative;
    height: 21px;
    margin: 18px 0 14px;

    .or_cont {
      position: absolute;
      left: 50%;
      z-index: 2;
      width: 60px;
      margin-left: -30px;
      color: #bbb;
      background: #fff;
    }

    .or_line {
      position: absolute;
      top: 10px;
      z-index: 1;
      width: 100%;
      height: 1px;
      background: #ccc;
    }
  }

  .email_box {
    position: relative;
    display: flex;
    height: 48px;
    line-height: 48px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;

    &.error {
      border-color: red !important;
    }

    /deep/.van-field__control {
      border: none;
    }

    /deep/.van-field__body {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      height: 46px;
      line-height: 46px;
      background: transparent;
      border: none;
    }

    .placeholder {
      position: absolute;
      top: 11px;
      left: 12px;
      z-index: 1;
      height: 24px;
      padding: 0 5px;
      line-height: 24px;
      color: #999;
      background: #fff;
      transition: all ease-in-out 0.3s;

      &.top {
        top: -12px;
        z-index: 3;
      }
    }
  }

  .sign_btn {
    width: 100%;
    height: 48px;
    margin-top: 20px;
    line-height: 46px;
  }
}
</style>

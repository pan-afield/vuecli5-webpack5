<template>
  <VanPopup
    :visible.sync="visible"
    :options="modalOptions"
    @handleCancel="modalClose"
  >
    <div class="t_c">
      <img src="../../assets/image/logo/logo_b1.png" alt="" />
    </div>

    <div class="sign_text fw_500 t_c">Verify Your Account</div>

    <div class="mt_20 mb_20 t_c">
      <img src="../../assets/image/svg/envelope.svg" alt="" />
    </div>

    <div class="cl_6 f_16 t_c">
      <div>We've sent a verification email to {{ email }}.</div>
      <div>Please verify your email to sign in UpDeals.</div>
    </div>
  </VanPopup>
</template>

<script>
import { mapGetters } from "vuex";
import VanPopup from "../modal/VanPopup";

export default {
  name: "VerifyAccount",
  components: { VanPopup },
  data() {
    return {
      visible: false,
      email: "",
    };
  },
  computed: {
    ...mapGetters(["vxMobileDevices"]),
    modalOptions() {
      return {
        closeable: true,
        borderRadius: "4px",
        width: "315px",
        height: "400px",
      };
    },
  },
  methods: {
    modalShow(email) {
      this.email = email;
      this.visible = true;
    },
    modalClose() {
      this.visible = false;
    },
  },
};
</script>

<style scoped></style>

<template>
  <div class="page_foot">
    <div class="foot_content footContent">
      <img
        src="../../assets/image/logo/logo_s2.png"
        alt=""
        @click="$utils.$pageGo('router', { name: 'All_Deals' })"
      />

      <div class="hot_box">
        <div class="hot_search_title">{{ $t("Hot Searches") }}</div>

        <ul class="hot_search_list">
          <li
            v-for="item in hotWordList"
            :key="item"
            @click="searchByWord(item)"
          >
            {{ item }}
          </li>
        </ul>

        <div class="flex foot_about">
          <div class="pointer" @click="jumpTo('about')">
            {{ $t("About US") }}
          </div>
          <div class="pointer ml_30" @click="jumpTo('privacy')">
            {{ $t("Privacy Policy") }}
          </div>
          <!--<div>Post a Deal</div>-->
        </div>

        <div class="t_l mt_22">
          <a class="email" href="mailto:support@updeals.com"
            >{{ $t("E-mail") }}: support@updeals.com</a
          >
        </div>

        <div class="third_party_account">
          <span
            class="icon_footer_facebook pointer account"
            @click="goAccount('fb')"
          />
          <span
            class="icon_footer_twitter pointer account"
            @click="goAccount('tw')"
          />
          <span
            class="icon_footer_ins pointer account"
            @click="goAccount('ig')"
          />
          <span
            class="icon_footer_telegram pointer account"
            @click="goAccount('tg')"
          />
        </div>
      </div>

      <div class="foot_company">
        <div>{{ $t("© 2022 Updeals.com, All rights reserved.") }}</div>
        <div>
          {{
            $t(
              "Affiliate disclosure: Updeals.com uses affiliate programs for monetization. This means that we may receive a commission. when you purchase a product that is clicked through one of the outbound links within this website. As an Amazon Associate, we may earn commissions from qualifying purchases from Amazon.com."
            )
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HomeFooter",
  data() {
    return {
      hotWordList: [],
    };
  },
  computed: {
    ...mapGetters(["vxMobileDevices"]),
  },
  created() {
    this.getSearchHotWord();
  },
  methods: {
    jumpTo(type) {
      this.$utils.$pageGo("router", { name: "About", query: { type: type } });
    },
    async getSearchHotWord() {
      let res = null;

      try {
        res = await this.$http.getSearchHotWord();
      } catch (e) {
        this.$message.error(e.message);
      }

      this.hotWordList = res || [];
    },
    searchByWord(item) {
      let wordArr = [];
      const searchWord = localStorage.getItem("searchWord");

      if (searchWord) {
        wordArr = searchWord.split(",");
        if (wordArr.length > 4) wordArr.splice(4);
        if (wordArr.indexOf(this.searchValue) === -1) wordArr.push(item);
      } else {
        wordArr = [item];
      }
      localStorage.setItem("searchWord", wordArr);
      this.$utils.$pageGo("router", {
        name: "Search_Result",
        query: { keyword: item },
      });
    },
    // 前往第三方账号
    goAccount(type) {
      if (type === "tw") {
        window.open(`https://twitter.com/updeals_us`, "_blank");
      } else if (type === "fb") {
        window.open(`https://www.facebook.com/groups/updeals/`, "_blank");
      } else if (type === "tg") {
        window.open(`https://t.me/updeals`, "_blank");
      } else {
        window.open(`https://www.instagram.com/updeals_us/`, "_blank");
      }
    },
  },
};
</script>

<style scoped lang="less">
.page_foot {
  color: @cl_white;
  background: #303235;

  .hot_box {
    color: rgba(255, 255, 255, 0.65);
    border-top: 1px solid #646668;
    border-bottom: 1px solid #646668;
  }

  .hot_search_list {
    display: flex;
    flex-wrap: wrap;
  }

  .foot_company {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.3);
    text-align: center;
  }

  .email {
    color: rgba(255, 255, 255, 0.65);
  }

  .third_party_account {
    flex: 1;
    text-align: right;

    span {
      margin-left: 20px;
    }

    .account {
      display: inline-block;
      width: 24px;
      height: 24px;
      font-size: 16px;
      line-height: 24px;
      color: #d4d4d6;
      text-align: center;
      background: #3d424d;
      border-radius: 4px;

      &:hover {
        color: #fff;
        background: #484c59;
      }
    }
  }

  .foot_about {
    margin-top: 42px;
    color: rgba(255, 255, 255, 0.65);

    .hover_change {
      margin-right: 32px;

      &:hover {
        color: #fff;
      }
    }
  }
}
.foot_content {
  text-align: left;
  padding: 20px 15px 0;

  .hot_box {
    padding: 32px 0;
    margin-top: 20px;

    .hot_search_title {
      margin-bottom: 25px;
      font-size: 16px;
      font-weight: 500;
      color: #fff;
    }
  }

  .hot_search_list {
    margin: 20px 0;

    & > li {
      width: 50%;
      margin-bottom: 22px;
    }
  }

  .foot_about {
    margin-top: 34px;
  }

  .foot_company {
    padding: 16px 0;
  }

  .third_party_account {
    margin-top: 32px;
    text-align: center;
  }
}
</style>

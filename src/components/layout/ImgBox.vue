<template>
  <div
    class="img_box_out"
    :style="{
      width: imgSize + 'px',
      'min-width': imgSize + 'px',
      height: imgSize + 'px',
    }"
  >
    <a-popover v-if="bigShow && imgSrc" placement="rightTop">
      <template slot="content">
        <div v-if="productLink" :class="linkClass">
          <a :href="productLink" target="_blank">{{ linkText }}</a>
        </div>
        <div
          class="img_big"
          :style="{ width: bigSize + 'px', height: bigSize + 'px' }"
        >
          <img :src="bigImgSrc" loading="lazy" />
        </div>
      </template>

      <img class="pointer" :src="imgSrc" loading="lazy" @error="imgError" />
    </a-popover>

    <img v-else :src="imgSrc" loading="lazy" @error="imgError" />
  </div>
</template>

<script>
export default {
  name: "ImgBox",
  props: {
    options: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      imgSrc:
        this.options.imgSrc ||
        "https://www.bigseller.com/static/images/bk/list_default_img.jpg?v=1", // 小图地址
      imgSize: this.options.imgSize || 60, // 小图尺寸
      bigShow: (this.options.bigShow && this.options.imgSrc) || false, // 是否展示大图
      bigImgSrc: this.options.bigImgSrc || this.options.imgSrc || "", // 大图地址
      bigSize: this.options.bigSize || 300, // 大图尺寸
      productLink: this.options.productLink || "", // 产品链接
      linkText: this.options.linkText || "", // 产品链接文案
      linkClass: this.options.linkClass || "", // 产品链接样式
    };
  },
  watch: {
    options: {
      handler(data) {
        this.init(data);
      },
      deep: true,
    },
  },
  methods: {
    init(data) {
      this.imgSrc =
        data.imgSrc ||
        "https://www.bigseller.com/static/images/bk/list_default_img.jpg?v=1";
      this.imgSize = data.imgSize || 60;
      this.bigShow = (data.bigShow && data.imgSrc) || false;
      this.bigImgSrc = data.bigImgSrc || data.imgSrc || "";
      this.bigSize = data.bigSize || 300;
    },
    imgError() {
      this.bigShow = false;
    },
  },
};
</script>

<style scoped lang="less">
.img_box_out {
  display: flex;
  align-items: center;
  justify-content: center;
}

.img_big {
  text-align: center;
  vertical-align: middle;
}

img {
  max-width: 100%;
  max-height: 100%;
}
</style>

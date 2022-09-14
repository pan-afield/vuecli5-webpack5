<template>
  <a-upload
    name="avatar"
    :accept="accept"
    list-type="picture-card"
    class="avatar_uploader"
    :show-upload-list="false"
    :multiple="multiple"
    :before-upload="beforeUpload"
    :custom-request="customRequest"
  >
    <div v-if="imageUrl" class="image_box">
      <img :src="imageUrl" class="upload_img" alt="" />
    </div>
    <div v-else>
      <a-icon type="plus" />
    </div>

    <div class="camera_box">
      <span class="icon_camera" />
    </div>
  </a-upload>
</template>

<script>
export default {
  name: "ImgUploader",
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
      imgType: this.options.imgType,
      accept: this.options.accept || ".jpg,.jpeg,.png", // 图片格式
      acceptType: this.options.acceptType || ["image/png", "image/jpeg"], // 图片格式
      limitSize: this.options.size || 2 * 1024 * 1024, // 图片大小
      multiple: this.$utils.isDef(this.options.multiple)
        ? this.options.multiple
        : true, // 是否多选
      imageUrl: this.options.imageUrl || "", // 上传成功后的图片地址
      // imgSize: this.options.imgSize || 100, // 图片尺寸
      fileSuccess: [], // 上传成功的图片集合
      uploadArr: [], // 符合要求的图片集合
      errorMsg: "",
    };
  },
  watch: {
    "options.imageUrl": {
      handler: function (newVal) {
        this.imageUrl = newVal;
      },
      deep: true,
    },
  },
  methods: {
    beforeUpload(file, fileList) {
      if (!this.errorMsg) {
        if (this.acceptType.indexOf(file.type) === -1) {
          this.errorMsg = "图片格式错误";
        } else if (file.size > this.limitSize) {
          this.errorMsg = "图片最大支持2MB";
        } else {
          this.uploadArr.push(file);
        }
      }

      if (this.errorMsg) {
        if (file.uid === fileList[fileList.length - 1].uid) {
          this.$message.error(this.errorMsg);
          this.errorMsg = "";
        }
        return false;
      }
    },
    async customRequest(file) {
      let res = null;

      try {
        res = await this.$http.getSign({
          fileName: file.file.name,
          imgType: this.imgType,
        });
      } catch (e) {
        this.$message.error("获取签名出错");
      }

      if (res) this.uploadToTencent(res, file);
    },
    async uploadToTencent(data, file) {
      let res = null;

      try {
        res = await this.$http.uploadImgToCos({
          url: data.url,
          headers: { Authorization: data.sign },
          file: file.file,
        });
      } catch (e) {
        this.$message.error("图片上传失败");
      }

      if (res) {
        this.fileSuccess.push(data.url);
        if (this.fileSuccess.length === this.uploadArr.length) {
          this.$message.success("Uploaded successfully");
          this.$emit("success", this.fileSuccess);
          this.uploadArr = [];
          this.fileSuccess = [];
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../assets/style/base_vars";

.avatar_uploader::v-deep .ant-upload {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1px;
  margin: 0 !important;

  &.ant-upload-select-picture-card {
    background: transparent;
    border: none;
  }
}

.image_box {
  width: 100%;
  height: 100%;

  .upload_img {
    max-width: 100%;
    max-height: 100%;
  }
}

.camera_box {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 24px;
  height: 24px;
  background: #e1e1e1;
  border-radius: 12px;
}
</style>

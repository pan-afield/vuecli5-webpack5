<template>
  <section class="van_popup">
    <van-popup
      v-model="selfVisible"
      :position="this.options.position || 'center'"
      :style="{
        width: this.options.width || '100%',
        height: this.options.height || '100%',
        'border-radius': this.options.borderRadius || 0
      }"
      :closeable="this.options.closeable"
      :round="this.options.round || true"
      :get-container="this.options.getContainer"
      :overlay-class="this.options.overlayClass"
      @close="closePopup"
      @closed="handleCancel"
      @opened="handleOk"
    >
      <template>
        <slot />
      </template>
    </van-popup>
  </section>
</template>

<script>
export default {
  name: 'BaseVanPopup',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      selfVisible: this.visible || false // 是否显示，默认显示
    }
  },
  watch: {
    visible(val) {
      this.selfVisible = val
    }
  },
  methods: {
    handleOk() {
      this.$emit('handleOk')
    },
    handleCancel() {
      this.$emit('handleCancel')
    },
    closePopup() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

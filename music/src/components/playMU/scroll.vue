<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    click: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
      });
    },
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    scrollToElement(el, time) {
      this.scroll && this.scroll.scrollToElement(el, time);
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
    });
  },
};
</script>

<style>
</style>
<template>
  <div class="go-top">
    <div class="bg-goTop" @click="gotop" v-show="isShow"></div>
  </div>
</template>

<script>
export default {
  name: "GoTop",
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    gotop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
    isShowCom() {
      if (window.pageYOffset > 700) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
  },
  created() {
      window.addEventListener('scroll', this.isShowCom)
    }
};
</script>

<style scoped lang="less">
.go-top {
  position: absolute;
  .bg-goTop {
    z-index: 999;
    position: fixed;
    right: 20px;
    bottom: 100px;
    width: 50px;
    height: 50px;
    background: url("../../assets/images/gotop.png") no-repeat center;
    cursor: pointer;
  }
}
</style>
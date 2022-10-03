<template>
  <div class="banner">
      <el-carousel :interval="3000" type="card" height="220px">
        <el-carousel-item v-for="banner in banners" :key="banner.imageUrl">
          <el-image :src="banner.imageUrl" class="imgbox"></el-image>
        </el-carousel-item>
      </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {
      banners: [],
      isLoading: true,
    };
  },
  components: {

  },
  created() {
    this._getBanner();
  },
  methods: {
    async _getBanner() {
      try {
        let res = await this.$api.getBanner();
        if (res.status === 200) {
          this.banners = res.data.banners;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="less">
.banner {
  margin-top: 20px;
  .imgbox {
    width: 550px;
  }
}
</style>

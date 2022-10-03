<template>
  <div class="rank">
    <div v-if="!isLoading"></div>
    <h2>云音乐特色榜</h2>
    <rank-list :rankData="this.topList.slice(0, 4)"></rank-list>
    <h2>云音乐特色榜</h2>
    <rank-list :rankData="this.topList.slice(4,)"></rank-list>

    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import loading from "./common/loading.vue";
import RankList from "./common/rankList.vue";
export default {
  name: "rank",
  components: {
    loading,
    RankList,
  },
  data() {
    return {
      topList: [],
      isLoading: true,
    };
  },
  methods: {
    async _getRankTopList() {
      let res = await this.$api.getRankTopList();
      if (res.status === 200) {
        this.isLoading = false;
        res.data.list.forEach((item) => {
          let topListObj = {};
          topListObj.picUrl = item.coverImgUrl;
          topListObj.name = item.name;
          topListObj.playCount = item.playCount;
          topListObj.id = item.id;
          this.topList.push(topListObj);
        });
      } else {
        this.$message.error("获取排行榜失败");
      }
    },
  },
  created() {
    this._getRankTopList();
  },
};
</script>

<style scoped lang="less">
.rank {
  min-width: 1200px;
  padding-bottom: 10px;
  padding-top: 80px;
  h2 {
    padding: 20px 0 20px 18px;
  }
}
</style>
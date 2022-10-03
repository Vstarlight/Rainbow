<template>
  <div class="recommend-songs">
    <h2 class="title">推荐歌单</h2>
    <songsheet></songsheet>
  </div>
</template>

<script>
import songsheet from"../common/songsheet.vue"
export default {
  name: "recommend-songs",
  components:{
    songsheet
  }
};
</script>

<style scoped>
.recommend-songs {
  margin-top: 15px;
}
.title {
  margin: 0 0 15px 0;
  font-size: 20px;
  color: #af191959;
}
</style>
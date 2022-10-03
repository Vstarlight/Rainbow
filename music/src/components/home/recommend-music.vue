<template>
  <div class="recommmend-music">
    <h2 class="title">推荐新歌曲</h2>
      <songlist></songlist>
  </div>
</template>

<script>
import songlist from "../common/songlist.vue";
export default {
  name: "recommend-music",
  components: {
    songlist,
  },
  data() {
    return {
      isLoading: true,
    }
  },
};
</script>

<style scoped>
.recommmend-music {
  margin-top: 15px;
}
.title {
  margin: 0 0 15px 0;
  font-size: 20px;
  color: #af191959;
}
</style>
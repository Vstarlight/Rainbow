<template>
  <div class="song-sheet-list">
    <div class="container">
      <div
        class="group"
        v-for="item in this.rankData"
        :key="item.id"
        @click="playListDetail(item.id)"
      >
        <a>
          <span>
            <i class="iconfont iconbofang"></i>
            {{ formatNumber(item.playCount) }}
          </span>
          <el-image
            lazy
            :src="item.picUrl || item.coverImgUrl"
            class="imagebox"
          ></el-image>
          {{ item.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "rankList",
  props: {
    rankData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    playListDetail(id) {
      this.$router.push(`/play-list-detail/${id}`);
      
    },
    formatNumber(playCount) {
      if (parseInt(playCount / 100000000) >= 1) {
        return parseInt(playCount / 100000000) + "亿";
      } else if (playCount > 10000) {
        return parseInt(playCount / 10000) + "万";
      } else {
        return parseInt(playCount);
      }
    },
  },
};
</script>

<style scoped lang="less">
.song-sheet-list {
  width: 100%;
  .container {
    display: flex;
    flex-wrap: wrap;
    .group {
      flex: 0 0 12.5%;
      width: 12.5%;
      padding: 0 20px 20px;
      max-width: 12.5%;
      position: relative;
      a {
        text-decoration: none;
        cursor: pointer;
        span {
          position: absolute;
          right: 26px;
          top: 22px;
          z-index: 3;
          background-color: #000;
          color: #fff;
          font-size: 12px;
          border-radius: 4px;
          .iconbofang {
            font-size: 1px;
          }
        }
        .imagebox {
          border-radius: 2px;
          margin-bottom: 10px;
          box-shadow: 0 0 5px rgba(1, 2, 2, 0.7);
        }
        h3 {
          color: #4a4a4a;
        }
      }
    }
  }
}
</style>

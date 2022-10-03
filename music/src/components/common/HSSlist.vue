<template>
  <div class="song-sheet-list">
    <div class="container">
      <div class="group" v-for="item in this.songSheetList" :key="item.id" @click="go(item.id)">
        <div class="wrapper">
          <a>
            <span>
              <i class="iconfont iconbofang"></i>
              {{ formatNumber(item.playCount) }}
            </span>
            <div class="bg">
              <el-image
                lazy
                :src="item.picUrl || item.coverImgUrl"
                class="imagebox"
              ></el-image>
            </div>
            <h3>{{ item.name }}</h3>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HSSlist",
  props: {
    songSheetList: {
      type: Array,
      default() {
        return;
      },
    },
  },
  methods: {
    formatNumber(playCount) {
      if (parseInt(playCount / 100000000) >= 1) {
        return parseInt(playCount / 100000000) + "亿";
      } else if (playCount > 10000) {
        return parseInt(playCount / 10000) + "万";
      } else {
        return parseInt(playCount);
      }
    },
    go(id){
      this.$router.push(`/play-list-detail/${id}`);
    }
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
        position: relative;
        cursor: pointer;
        span {
          position: absolute;
          right: 4px;
          top: 22px;
          background-color: #000;
          color: #fff;
          font-size: 12px;
          border-radius: 4px;
          z-index: 2;
          .iconbofang {
            font-size: 1px;
          }
        }
        .imagebox {
          border-radius: 2px;
          margin-bottom: 10px;
          box-shadow: 0 0 5px rgba(1, 2, 2, 0.7);
          z-index: 1;
          position: relative;
        }
        h3 {
          color: #4a4a4a;
        }
      }
    }
  }
}
</style>

<template>
  <div class="video-list">
    <li class="group" v-for="group in mvList" :key="group.index">
      <div class="cover-container">
        <span class="play-count">
          <i class="iconfont iconbofang"></i>
          {{ formatNumber(group.playCount) }}
        </span>
        <div class="cover">
          <el-image lazy :src="group.cover ||group.imgurl" class="imgbox"></el-image>
        </div>
        <div class="icon-wrapper">
          <i
            class="iconfont iconbofang2 play-button"
            @click="play(group.id)"
          ></i>
        </div>
        <div class="play-info">
          <span>{{ group.artistName }}</span>
          <span>{{ data_time(group.duration) }}</span>
        </div>
      </div>
      <h2>
        {{ group.name }}
      </h2>
    </li>
  </div>
</template>

<script>
export default {
  name: "MvVideoList",
  props: {
    mvList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    play(id) {
      {
        if (this.$route.path.indexOf("/video") !== -1) {
          // 进入video详情页
          this.$router.push(`/video-detail/${id}`);
        } else {
          // 进入mv详情页
          this.$router.push({
            path: `/mv-detail`,
            query:{id:id}
          });
        }
      }
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
    data_time(time) {
      let sec = time / 1000;
      let m = parseInt(sec / 60);
      if (m < 10) {
        m = "0" + m;
      }
      let s = parseInt(sec % 60);
      if (s < 10) {
        s = "0" + s;
      }
      return m + ":" + s;
    },
  },
};
</script>

<style scoped lang="less">
.video-list {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  .group {
    list-style: none;
    flex: 0 0 25%;
    max-width: 25%;
    padding: 0 15px 30px;
    .cover-container {
      position: relative;
      height: 150px;
      .cover {
        width: 100%;
        height: 100%;
        font-size: 0;
        .imgbox {
          width: 100%;
          height: 100%;
          border-radius: 6px;
        }
      }
      .play-count {
        z-index: 3;
        position: absolute;
        top: 6px;
        right: 10px;
        background-color: #000;
        color: #f7f7f7;
        padding: 1px 8px 1px 5px;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top-right-radius: 4px;
        border-bottom-left-radius: 4px;
        border-radius: 6px;
      }
      .icon-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 6px;
        .play-button {
          position: absolute;
          padding: 10px 10px 10px 12px;
          background-color: #fa2800;
          color: #f7f7f7;
          border-radius: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          cursor: pointer;
          border-radius: 6px;
        }
      }
      .play-info,
      .icon-wrapper:hover {
        .play-button {
          opacity: 1;
        }
      }
      .play-info {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 30px;
        background-color: rgba(0, 0, 0, 0.6);
        color: #f7f7f7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        z-index: 10;
        border-radius: 6px;
      }
    }
  }
  h2 {
    width: 70%;
    margin-top: 10px;
    font-weight: 300;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
  }
}
</style>
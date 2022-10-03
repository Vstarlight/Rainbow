<template>
  <div class="recommend-songs" v-if="newSongList.length > 0">
    <table class="container">
      <tr class="group" v-for="(item,index) in newSongList" :key="index">
        <td class="order-number">
          <play-button :playList="newSongList" :item="item" :index="index"></play-button>
        </td>
        <td class="image">
          <el-image lazy :src="item.picUrl" class="imagebox"></el-image>
        </td>
        <td class="singers">
          <h3>{{ item.song }}</h3>
          <span>{{ item.zhuanjiname}}</span>
        </td>
        <td class="album-name">《{{ item.singers }}》</td>
        <div class="transition">{{ data_time(item.tiem) }}</div>
      </tr>
    </table>
  </div>
</template>

<script>
import playButton from "../playMU/playButton.vue";
import { mapState } from "vuex";
export default {
  name: "songlist",
  components: {
    playButton,
  },
  computed: {
    ...mapState(["newSongList"]),
  },
  methods: {
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
.recommend-songs {
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .group {
      flex: 0 0 48.5%;
      display: flex;
      background-color: #fff;
      box-shadow: 0 0 20px rgb(193, 193, 194, 1);
      border-radius: 6px;
      margin-bottom: 20px;
      .order-number {
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .image {
        width: 55px;
        height: 100%;
        display: flex;
        align-items: center;
        .imagebox{
          width: 100%;
        }
      }
      .singers {
        width: 100px;
        padding: 10px 0 10px 30px;
        display: flex;
        flex-direction: column; // flex项目排列方式
        justify-content: space-around;
        align-items: flex-start;
        h3,
        span {
          width: 100%;
          overflow: hidden; // 超出部分隐藏
          white-space: nowrap; // 溢出不换行
          text-overflow: ellipsis; // 溢出部份用省略号显示
        }
      }
      .album-name {
        flex: 1;
        padding: 0 30px 0 75px;
        display: flex;
        align-items: center;
        font-weight: bold;
        line-height: 1.5em;
      }
      .transition {
        width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>

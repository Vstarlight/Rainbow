<template>
  <div class="play-list-container" v-if="searchData.length !== 0">
    <div class="handle clearfix">
      <span v-if="isShowCollection" @click="_setPlayListCollection" :class="{'active-collec': subscribed}">
        <i class="iconfont iconshoucang"></i>
        {{collec}}
      </span>
      <span class="active-handle" @click="playAll">
        <i class="iconfont iconplay"></i>
        播放全部
      </span>
    </div>
    <table class="play-list">
      <thead>
        <tr>
          <th class="index-th">序号</th>
          <th class="song-th">歌曲</th>
          <th class="singer-th">歌手</th>
          <th class="album-th">专辑</th>
          <th class="transition-th">时长</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in searchData" :key="item.id">
          <td>
            <play-button
              :item="item"
              :index="index"
              :playList="searchData"
            ></play-button>
          </td>
          <td>
            <div class="avatar">
              <div class="cover">
                 <el-image lazy :src="item.picUrl" class="imagebox" v-if="item.picUrl"></el-image>
              </div>
              <p>{{ item.song }}</p>
            </div>
          </td>
          <td>
            <p>
              {{ item.singer }}
            </p>
          </td>
          <td>
            <p>{{ item.album }}</p>
          </td>
          <td>{{ data_time(item.transitionTime) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import playButton from "./playButton.vue";
export default {
  name: "playList",
  data() {
    return {
      isShowCollection:false
    };
  },
  components: {
    playButton,
  },
  computed: {
    ...mapState(["searchData","playRecord"]),
    collec(){
      return this.subscribed ? "已收藏" : "未收藏"
    }
  },
  methods: {
    ...mapMutations([
      "setPlayList",
      "setCurrentSong",
      "play",
      "isPlayMutation",
    ]),
    //时间处理
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
    //播放全部
    playAll() {
      this.setPlayList(this.searchData);
      this.setCurrentSong(this.searchData[0]);
      setTimeout(() => {
        this.play();
        this.isPlayMutation(false)
      }, 20);
    },
    async _setPlayListCollection(){
      //获取登入状态
      let loginStatus =await this.$api.getLoginStatus()
      if (!loginStatus) {
        this.$message.info("请先登录")
        return this.$router.push("/login")
      }

    }
  },
};
</script>

<style lang="less"  scoped>
.play-list-container {
  .handle {
    span {
      float: right;
      padding: 6px 15px;
      background-color: #cecece;
      border-radius: 50px;
      margin-left: 10px;
      cursor: pointer;
    }

    .active-handle {
      color: #fff;
      background-color: #fa2800;
      margin-right: 15px;
      margin-bottom: 10px;
    }
    .active-collec {
      color: #fff;
      background-color: #fa2800;
    }
  }
  .play-list {
    text-align: -moz-left;
    text-align: -webkit-left;
    text-align: left;
    width: 100%;
    margin-top: 20px;
    tr {
      padding: 10px;
      line-height: 50px;
      cursor: pointer;
    }
    thead {
      tr {
        background-color: #fafafa;
        th {
          padding: 0 10px;
          color: #999;
          font-weight: 400;
        }
        & .index-th {
          width: 8%;
          text-align: center;
        }

        & .song-th {
          width: 30%;
        }

        & .singer-th {
          width: 25%;
        }

        & .album-th {
          width: 27%;
        }

        & .transition-th {
          width: 10%;
        }
      }
    }
    tbody {
      tr:nth-child(2n) {
        background-color: #f7f7f7;
      }
      tr > td:first-child {
        text-align: center;
      }
      tr:hover {
        background-color: #d2d2d2;
      }
      tr td {
        .avatar {
          display: flex;
          align-items: center;
          .cover {
            width: 40px;
            height: 40px;
            .imagebox{
              width: 100%;
              height: 100%;
              border-radius: 4px;
            }
          }
          P {
            margin-left: 15px;
            width: 60%;
          }
        }
        p {
          width: 80%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .clearfix::before {
    content: "";
    display: block;
    clear: both;
  }
  table {
    border-collapse: collapse;
  }
}
</style>
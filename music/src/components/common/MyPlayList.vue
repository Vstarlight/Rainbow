<template>
  <div class="play-list-container" v-if="playRecordList.length !== 0">
    <div class="handle clearfix">
      <span class="active-handle play-item" @click="bofang">
        <i class="iconfont iconplay"></i>
        播放全部
      </span>
      <span
        class="active-handle"
        @click="Iilike()"
        v-if="(!(this.$route.path.indexOf('/play-list-detail') === -1) )&& (!(this.myListx.includes(this.SongsId)))"
        :class="liang"
      >
        <i class="iconfont iconshoucang">
          {{ sc }}
        </i>
      </span>
    </div>
    <table class="play-listi">
      <thead>
        <tr>
          <th class="th-index">序号</th>
          <th class="th-name">歌曲</th>
          <th class="th-artist">歌手</th>
          <th class="th-album">专辑</th>
          <th class="th-duration">时长</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in playRecordList" :key="item.index">
          <td>
            <div class="num">
              <play-button
                :item="item"
                :index="index"
                :playList="playRecordList"
              ></play-button>
            </div>
          </td>
          <td>
            <div class="name-container">
              <div class="avatar">
                <img v-if="item.picUrl" :src="item.picUrl" alt="" />
              </div>
              <p class="itemsong">{{ item.song }}</p>
            </div>
          </td>
          <td>
            <div class="singer">
              <p class="singerp">{{ item.singer }}</p>
            </div>
          </td>
          <td>
            <div class="album">
              <p class="albump">{{ item.album }}</p>
            </div>
          </td>
          <td>
            <div class="tiem">
              <p class="tiemp">{{ data_time(item.tiem) }}</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import PlayButton from "../playMU/playButton.vue";
export default {
  name: "MyPlayList",
  props: {
    playRecordList: {
      type: Array,
    },
    SongsId: {
      type: Number,
    },
  },
  data() {
    return {
      sc: "",
      liang: "",
      t: null,
    };
  },
  components: {
    PlayButton,
  },
  computed: {
    ...mapState(["playList"]),
    ...mapGetters(["Ilike","myListx"]),
  },
  methods: {
    ...mapMutations([
      "setCurrentSong",
      "play",
      "isPlayMutation",
      "setPlayList",
    ]),
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
    bofang() {
      this.setPlayList(this.playRecordList);
      this.setCurrentSong(this.playRecordList[0]);
      setTimeout(() => {
        this.play();
      }, 20);
    },
    //是否收藏
    orsc() {
      this.Ilike.some((item) => {
        if (this.SongsId === item) {
          this.t = 2;
          this.sc = "已收藏";
          this.liang = "play-item ";
          return true;
        } else {
          this.t = 1;
          this.sc = "收藏";
          this.liang = "play-item2";
        }
      });
    },
    async Iilike() {
      try {
        let res = await this.$api.getSC(this.t, this.SongsId);
        if (res.data.code === 200) {
          if (this.t === 1) {
            setTimeout(() => {}, 500);
            this.t = 2;
            this.sc = "已收藏";
            this.liang = "play-item";
            this.Ilike.push(this.SongsId);
            this.$message.success("收藏成功🙂");
          } else {
            setTimeout(() => {}, 500);
            this.t = 1;
            this.sc = "收藏";
            this.liang = "play-item2";
            this.Ilike.pop();
            this.$message.error("取消收藏😭");
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.orsc();
  },
};
</script>

<style lang="less" scoped>
.iconshoucang {
  font-size: 14px;
}
p {
  font-size: 14px;
}
.play-list-container {
  width: 100%;
}
.handle {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 15px 0;
}
.active-handle {
  background: #f2f2f2;
  color: #333333;
  padding: 7px 15px;
  border-radius: 50px;
  cursor: pointer;
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s;
}
i {
  margin-right: 5px;
}
.play-item {
  background: #fa2800;
  color: #fff;
}
.play-item2 {
  background: #f2f2f2;
  color: rgb(0, 0, 0);
}
.play-list-container {
  .play-listi {
    width: 100%;
    thead {
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: #fafafa;
      color: #999;
      th {
        padding: 0 9px;
        text-align: left;
        font-weight: 300;
        white-space: nowrap;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        &.th-index {
          width: 10%;
          text-align: center;
        }
        &.th-name {
          width: 40%;
        }
        &.th-artist {
          width: 25%;
        }
        &.th-album {
          width: 15%;
        }
        &.th-duration {
          width: 15%;
          text-align: right;
          padding-right: 40px;
        }
      }
    }
  }
}
tbody {
  width: 100%;
  tr:nth-child(2n) {
    background-color: #f7f7f7;
  }
  tr:hover {
    background-color: #d2d2d2;
  }
  tr {
    height: 50px;
    td {
      padding: 0 9px;
      height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
    }
  }
}
.name-container {
  display: flex;
  align-items: center;
  width: 234px;
  .avatar {
    width: 35px;
    height: 35px;
    border-radius: 5px;
    flex-shrink: 0;
    margin-right: 10px;
    img {
      width: 100%;
      border-radius: 5px;
    }
  }
}
.itemsong {
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.singer {
  width: 176px;
}
.singerp {
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.albump {
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.album {
  width: 156px;
}
table {
  border-collapse: collapse;
}
.num {
  width: 30px;
}
.Ilike {
  font-size: 15px;
  display: inline;
}
</style>
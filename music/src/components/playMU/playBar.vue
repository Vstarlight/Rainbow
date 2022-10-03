<template>
  <div class="play-bar">
    <div class="centent">
      <div class="avatar">
         <el-image lazy :src="currentSong.picUrl" class="imagebox"></el-image>
      </div>
      <div class="info">
        <h2>{{ currentSong.song || currentSong.name }}</h2>
        <p>{{ currentSong.singers }}</p>
      </div>

      <!-- 播放 -->
      <div class="controller">
        <i class="iconfont iconnext" @click="playPrevSong"></i
        ><!-- 上一曲 -->
        <i class="iconfont iconbofang4" v-show="isPlay" @click="startPlay"></i
        ><!-- 开始播放 -->
        <i class="iconfont iconbofang3" v-show="!isPlay" @click="pausePlay"></i
        ><!-- 暂停播放 -->
        <i class="iconfont iconprev" @click="playNextSong"></i
        ><!-- 下一曲 -->
      </div>

      <!-- 音乐滑块 -->
      <div
        class="play-progress"
        @mousedown="isSetProgress = true"
        @mouseup="isSetProgress = false"
      >
        <span class="current-time">{{ currentTime | formatCurrentTime }}</span>
        <el-slider
          v-model="progress"
          :format-tooltip="formatToolTip"
          @change="setProgress"
        ></el-slider>
        <span class="total-time">{{ data_time(currentSong.tiem) }}</span>
      </div>

      <!-- 音量建 -->
      <div class="volnum-control">
        <i :class="isMutedIcon" @click="mutedClick"></i>
        <el-slider class="sliderback"
          v-model="volumeSlider"
          @change="setVolume(volumeSlider)"
        ></el-slider>
      </div>

      <!-- 播放方式 -->
      <div class="icon-button">
        <i
          class="iconfont iconxunhuan"
          :class="{ 'active-icon': playMode === 'orderPlay' }"
          @click="orderPlay"
        ></i
        ><!-- 循环 -->
        <i
          class="iconfont icondanquxunhuan"
          :class="{ 'active-icon': playMode === 'oneLoop' }"
          @click="oneLoop"
        ></i
        ><!-- 单曲循环 -->
        <i
          class="iconfont iconplay-random"
          :class="{ 'active-icon': playMode === 'randomPlay' }"
          @click="randomPlay"
        ></i>
        <i class="iconfont icongeci" @click="openLyric"></i
        ><!-- 歌词 -->
        <i class="iconfont iconplaylsit" @click="openPlayRecord"></i
        ><!-- 播放列表 -->
      </div>

      <audio
        :src="playUrl"
        ref="audio"
        :muted="isMuted"
        @timeupdate="timeupdate"
        @ended="end"
        @error="error"
      ></audio>

      <transition name="fade">
        <div class="play-list" v-show="isOpenPlayRecord">
          <h2 class="play-lista-h2">
            播放记录
            <i class="iconfont iconlajitong" @click="deleteAlll"></i>
          </h2>
          <div class="play-list-table">
            <table>
              <thead></thead>
              <tbody>
                <tr v-for="(item, index) in playRecord" :key="item.id">
                  <td class="num">
                    <play-button :item="item" :index="index"></play-button>
                  </td>
                  <td class="song">
                    {{ item.song }}
                    <i
                      class="iconfont iconerror"
                      v-if="item.error"
                      title="播放源错误!"
                    ></i>
                  </td>
                  <td class="delete">
                    <i
                      class="iconfont icondelete"
                      @click="removeItemm(index)"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </transition>

      <transition name="fade">
        <div class="lyric" v-show="isOpenLyric">
          <h2>歌词</h2>
          <scroll ref="lyricList">
            <div v-if="nolyric">暂无歌词, 请欣赏歌曲</div>
            <div v-if="!nolyric && currentLyric">
              <div class="lyric-wrapper">
                <p
                  ref="lyricLine"
                  v-for="(item, index) in currentLyric.lines"
                  :class="currentLineNum === index ? 'active-lyric-text' : ''"
                  :key="index"
                >
                  {{ item.txt }}
                </p>
              </div>
            </div>
          </scroll>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import Lyric from "lyric-parser";
import scroll from "./scroll.vue";
import playButton from "./playButton.vue";
export default {
  name: "playBar",
  data() {
    return {
      audio: null,

      //进度条
      progress: 0,

      //禁音
      isMuted: false,

      //个人拖动进度条
      isSetProgress: false,

      //设置个人进度条
      isSetProgress: false,

      //当前播放时长
      currentTime: 0,

      //音量
      volumeSlider: 80,

      //控制播放列表隐藏显示
      isOpenPlayRecord: false,

      //控制歌词显示隐藏
      isOpenLyric: false,

      //是否显示歌词
      nolyric: false,

      //当前歌词对象
      currentLyric: null,

      // 当前行号
      currentLineNum: 0,
    };
  },
  components: {
    playButton,
    scroll,
  },
  computed: {
    ...mapState(["currentSong", "playRecord"]),
    ...mapGetters(["isPlay", "playMode", "playList"]),
    //音乐URL计算
    playUrl() {
      return `https://music.163.com/song/media/outer/url?id=${this.currentSong.id}.mp3`;
    },
    //近音
    isMutedIcon() {
      return this.isMuted ? "iconfont iconjingyin" : "iconfont iconshengyin";
    },
  },
  filters: {
    formatCurrentTime(time) {
      let m = parseInt(time / 60);
      let s = parseInt(time % 60);
      if (s < 10) {
        s = "0" + s;
      }
      if (m < 10) {
        m = "0" + m;
      }
      return m + ":" + s;
    },
  },
  methods: {
    ...mapMutations([
      "isPlayMutation",
      "getAudio",
      "setPlayPrevSong",
      "setPlayNextSong",
      "setPlayMode",
      "ChangeOneLoop",
      "ChangeRandomPlay",
      "deleteAll",
      "setCurrentSongError",
      "removeItem",
    ]),
    //时间格式化
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

    //开始播放
    startPlay() {
      this.isPlayMutation(!this.isPlay);
      this.audio.play();
      this.lyricTogglePlay();
    },

    //暂停播放
    pausePlay() {
      this.isPlayMutation(!this.isPlay);
      this.audio.pause();
      this.lyricTogglePlay();
    },

    //静音事件
    mutedClick() {
      if (this.isMuted) {
        this.isMuted = false;
        this.audio.muted = false;
        this.volumeSlider = 80;
      } else {
        this.isMuted = true;
        this.audio.muted = true;
        this.volumeSlider = 0;
      }
    },

    //上一曲
    playPrevSong() {
      this.setPlayPrevSong();
      this.isPlayMutation(false);
      setTimeout(() => {
        this.audio.play();
      }, 20);
    },

    //下一曲
    playNextSong() {
      this.setPlayNextSong();
      this.isPlayMutation(false);
      setTimeout(() => {
        this.audio.play();
      }, 20);
    },

    //格式化进度条时间
    formatToolTip(val) {
      let time = ((this.currentSong.tiem / 1000) * val) / 100;
      let m = parseInt(time / 60);
      let s = parseInt(time % 60);
      if (s < 10) {
        s = "0" + s;
      }
      if (m < 10) {
        m = "0" + m;
      }
      return m + ":" + s;
    },

    //设置改变后进度条
    setProgress(percent) {
      this.isSetProgress = true;
      this.$refs.audio.currentTime =
        ((percent / 100) * this.currentSong.tiem) / 1000;
      setTimeout(() => {
        this.isSetProgress = false;
      }, 20);

      //歌词改变
      if (this.currentLyric) {
        this.currentLyric.seek(this.$refs.audio.currentTime * 1000);
      }
      //播放
      this.$refs.audio.play();
      //设置播放暂停隐藏
      this.isPlayMutation(false);
    },

    //监听进度条时间的改变
    timeupdate(e) {
      if (!this.isSetProgress) {
        this.currentTime = e.target.currentTime;
        this.progress =
          (100 * e.target.currentTime) / (this.currentSong.tiem / 1000);
      }
    },

    //控制音量大小
    setVolume(volumeSlider) {
      this.$refs.audio.volume = volumeSlider / 100;
      if (volumeSlider === 0) {
        this.isMuted = true;
      } else {
        this.isMuted = false;
      }
    },

    //顺序播放
    orderPlay() {
      this.setPlayMode("oneLoop");
    },
    // 单曲循环播放
    oneLoop() {
      this.setPlayMode("randomPlay");
    },
    // 循环播放
    randomPlay() {
      this.setPlayMode("orderPlay");
    },

    //音乐播放完
    end() {
      if (this.playMode === "orderPlay") {
        this.playNextSong();
        setTimeout(() => {
          this.audio.play();
        }, 20);
      } else if (this.playMode === "oneLoop") {
        this.ChangeOneLoop(this.currentSong);
        this.isPlayMutation(false);
        setTimeout(() => {
          this.audio.play();
        }, 20);
        //歌词逻辑
        if (this.currentLyric && this.$refs.lyricList) {
          this.currentLyric.seek(0);
          this.currentLyric.stop();
          this.$refs.lyricList.scrollTo(0, 0, 500);
          this.currentLyric.play();
        }
      } else if (this.playMode === "randomPlay") {
        let res = Math.round(
          Math.random() * Math.abs(this.playList.length - 1) +
            Math.min(this.playList.length - 1, 0)
        );
        console.log(res);
        this.ChangeRandomPlay(res);
        this.isPlayMutation(false);
        setTimeout(() => {
          this.audio.play();
        }, 20);
      }
    },

    //播放错误
    error() {
      this.$message.error("抱歉, 媒体下载发生了错误!");
      this.setCurrentSongError(true);
      this.playNextSong();
      setTimeout(() => {
        this.audio.play();
      }, 20);
    },

    //打开播放列表
    openPlayRecord() {
      this.isOpenPlayRecord = !this.isOpenPlayRecord;
      this.isOpenLyric = false;
    },

    //清空播放记录
    deleteAlll() {
      this.deleteAll();
    },

    //删除播放记录中的某一个
    removeItemm(index) {
      this.removeItem(index);
    },

    //获取歌词
    async getCurrentSongLyric(currentsongid) {
      let res = await this.$api.getCurrentSongLyric(currentsongid);
      if (res.status === 200) {
        if (res.data.nolyric) {
          this.nolyric = true;
          return;
        }
        let lyric = res.data.lrc.lyric;
        this.initLyric(lyric);
        //获取到歌词然后滚动到顶部
        if (this.$refs.lyricList) {
          this.$refs.lyricList.scrollTo(0, 0, 500);
        }
      }
    },

    //点击歌词icon弹窗
    openLyric() {
      this.isOpenLyric = !this.isOpenLyric;
      this.isOpenPlayRecord = false;
    },

    //歌词滚动开始
    initLyric(lyric) {
      this.currentLyric = new Lyric(lyric, this.handleLyric);
      if (!this.isPlay) {
        this.currentLyric.play();
      }
    },

    //歌词对象配置
    handleLyric({ lineNum, txt }) {
      if (this.$refs.lyricList) {
        this.$refs.lyricList.refresh();
      }
      this.currentLineNum = lineNum;
      if (lineNum > 7) {
        let lineEl = this.$refs.lyricLine[lineNum - 7];
        if (this.$refs.lyricList) {
          this.$nextTick(() => {
            this.$refs.lyricList.scrollToElement(lineEl, 1000); // 滚动到元素
          });
        }
      } else {
      }
    },

    //歌词的暂停/播放
    lyricTogglePlay() {
      setTimeout(() => {
        // 歌词的播放/暂停
        if (this.currentLyric) {
          this.currentLyric.togglePlay();
        }
      }, 20);
    },
  },
  mounted() {
    this.audio = this.$refs.audio;
    this.getAudio(this.$refs.audio);
  },
  created() {
    this.getCurrentSongLyric(this.currentSong.id);
  },
};
</script>

<style lang="less" scoped>

.play-list-table tr td .iconerror {
  color: #fa2800;
  margin-left: 10px;
  cursor: pointer;
}
.play-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  min-width: 1230px;
  background-color: #fff;
  box-shadow: 0 -5px 40px rgba(2, 10, 18, 0.1);
  z-index: 99;
  .centent {
    width: 1350px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    height: 75px;
    position: relative;
    .play-list {
      position: absolute;
      bottom: 90px;
      right: 0px;
      width: 400px;
      height: 550px;
      box-shadow: 0 5px 40px rgba(2, 10, 18, 0.1);
      background-color: #fff;
      border-radius: 4px;
      z-index: 1000;
    }
    .play-list {
      padding: 20px;
      h2 {
        padding: 10px 10px 20px 10px;
        font-weight: 400;
        i {
          float: right;
          margin-right: 12px;
        }
      }
      & i:hover {
        color: #fa2800;
      }
      .play-list-table {
        height: 90%;
        padding-bottom: 20px;
        width: 100%;
        overflow: auto;
        table {
          width: 100%;
          margin-top: 10px;
          tbody {
            tr td {
              width: 40px;
              height: 40px;
            }
            .num {
              text-align: center;
            }
            .song {
              padding-left: 10px;
              width: 70%;
              overflow: hidden;
            }
            .delete {
              width: 60px;
              text-align: center;
              i {
                font-size: 14px;
                font-weight: 400;
              }
            }
          }
        }
      }
    }
    .avatar {
      width: 65px;
      height: 65px;
      margin: 0 20px 0 20px;
      border: 0;
      flex: 0 0 auto;
      .imagebox{
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
    }
    .info {
      width: 120px;
      h2,
      p {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
      }
      h2 {
        padding-bottom: 10px;
        font-size: 14px;
        color: #333;
      }
      p {
        color: #999;
        font-size: 12px;
      }
    }
    .controller {
      width: 120px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 20px;
      .iconfont {
        padding: 10px;
        font-size: 20px;
      }
      .iconbofang4,
      .iconbofang3 {
        font-size: 30px;
      }
    }
    .play-progress {
      display: flex;
      align-items: center;
      margin: 0 40px;
      .el-slider {
        width: 280px;
        margin: 0 30px;
        .el-slider__runway {
          height: 3px;
          .el-slider__bar {
            height: 3px;
            background-color: #fa2800 !important;
          }
          .el-slider__button-wrapper {
            top: -17px;
            .el-slider__button {
              width: 10px !important;
              height: 10px;
              border-color: #fa2800;
            }
          }
        }
      }
    }
    .volnum-control {
      display: flex;
      align-items: center;
      margin-left: 10px;
      i {
        font-size: 26px;
        font-weight: 700;
        color: #fa2800;
      }
      .el-slider {
        width: 130px;
        margin: 0 20px;
        .el-slider__runway {
          height: 3px;
          .el-slider__bar {
            height: 3px;
            background-color:#fa2800 !important;
          }
          .el-slider__button-wrapper {
            top: -17px;
            .el-slider__button {
              width: 10px !important;
              height: 10px;
              border-color: #fa2800 !important;
            }
          }
        }
      }
    }
    .icon-button {
      margin-left: 150px;
      i {
        padding: 6px;
        font-size: 20px;
        margin-right: 20px;
      }
      .iconxunhuan,
      .icondanquxunhuan,
      .iconplay-random {
        display: none;
      }
      .active-icon {
        display: inline !important;
      }
    }
    .lyric {
      position: absolute;
      bottom: 90px;
      right: 0px;
      width: 400px;
      height: 550px;
      box-shadow: 0 5px 40px rgba(2, 10, 18, 0.1);
      background-color: #fff;
      border-radius: 4px;
      z-index: 1000;
    }
    .lyric {
      padding: 20px 30px;
      h2 {
        padding-bottom: 20px;
        background-color: #fff;
      }
      .wrapper {
        height: 460px;
        overflow: auto;
        .content {
          div {
            width: 100%;
            p {
              color: #4a4a4a;
              font-size: 14px;
              font-weight: 300;
              line-height: 24px;
              margin: 5px 0;
              text-align: center;
            }
            .active-lyric-text {
              color: #fa2800;
              font-size: 18px;
            }
          }
        }
      }
    }
    i:active {
      color: #fa2800;
      opacity: 0.8;
    }
    i {
      cursor: pointer;
    }
  }
}
@-webkit-keyframes play {
  from {
    -webkit-transform: translateY(0px);
  }
  to {
    -webkit-transform: translateY(15px);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
  transform: translate(0, 0);
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translate(0, -100px);
}
.wrapper::-webkit-scrollbar {
  display:none
}

</style>
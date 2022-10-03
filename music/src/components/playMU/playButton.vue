<template>
  <div class="play-button" :class="addclass()">
    <span class="num" ref="num">{{ index + 1 }}</span>
    <i class="iconfont iconbofang1" @click="starPlay(item, index)"></i>
    <i class="iconfont iconzantingtingzhi" @click="pausePlay()"></i>
    <div class="playing-transition" ref="playing-transition">
      <div class="line" style="animation-delay: -1.2s"></div>
      <div class="line"></div>
      <div class="line" style="animation-delay: -1.5s"></div>
      <div class="line" style="animation-delay: -0.9s"></div>
      <div class="line" style="animation-delay: -0.6s"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations,mapState } from "vuex";
export default {
  name: "playButton",
  props: {
    playList: {
      type: Array,
      default() {
        return [];
      },
    },
    item: {
      type: Object,
      default() {
        return {};
      },
    },
    index: {
      type: Number,
      default: -1,
    },
  },
  computed: {
    ...mapGetters(["currentSong", "isPlay"]),
    ...mapState(["playRecord"]),
  },
  methods: {
    ...mapMutations([
      "setPlayList",
      "isPlayMutation",
      "setCurrentSong",
      "addPlayRecord",
      "pause",
      "play",
    ]),
    //开始播放
    starPlay(item) {
      this.setPlayList(this.playList); //当前歌曲变为全局播放列表
      this.isPlayMutation(false); //显示播放按键
      this.setCurrentSong(item); //歌曲数据
      this.RePlayRecord(); //加入播放记录
      setTimeout(() => {
        this.play(); //开始播放
      }, 20);
    },
    //暂停播放
    pausePlay() {
      this.isPlayMutation(true);
      this.pause(); //歌曲暂停
    },
    //去重播放记录
    RePlayRecord() {
      let index = this.playRecord.findIndex(
        (item) => this.currentSong.id === item.id
      );
      if (index !== -1) {
        this.playRecord.splice(index, 1);
        this.playRecord.unshift(this.currentSong);
      } else {
        this.playRecord.unshift(this.currentSong);
      }
    },

    //play样式
    addclass(){
      return (this.currentSong.id === this.item.id && !this.isPlay) ? 'playing': ''
    }
  },
};
</script>

<style scoped lang="less">
.play-button {
  .iconbofang1,
  .iconzantingtingzhi,
  .playing-transition {
    display: none;
  }
  i {
    color: #fa2800;
    font-size: 20px;
  }
}
tr:hover {
  .play-button {
    .num {
      display: none;
    }
    .iconbofang1 {
      display: block;
    }
  }
  .playing {
    .playing-transition {
      display: none;
    }
    .iconzantingtingzhi {
      display: block;
    }
    .iconbofang1 {
      display: none;
    }
  }
}
.playing {
  .iconbofang1 {
    display: none;
  }
  .playing-transition {
    display: flex;
  }
  .num {
    display: none;
  }
}
.playing:hover {
  .playing-transition {
    display: none;
  }
}
.playing {
  display: flex;
  justify-content: center;
  .playing-transition {
    overflow: hidden;
    height: 16px;
    min-width: 18px;
    .line {
      width: 2px;
      height: 100%;
      background-color: #fa2800;
      margin-left: 2px;
      animation: play 0.9s linear infinite alternate;
    }
  }
}

.avatar {
  display: flex;
  align-items: center;
  img {
    width: 35px;
    height: 35px;
    border-radius: 6px;
    margin-right: 10px;
  }
  P {
    width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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
</style>
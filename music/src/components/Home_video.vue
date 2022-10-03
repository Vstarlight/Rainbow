<template>
  <div class="video">
    <div v-if="!isLoading">
      <home-video-tag-bar
        :categoryList="categoryList"
        @switchHotTags="switchHotTags"
        :tags="tags"
        :mainTag="mainTag"
        @tagClick="tagClick"
        @loadingVideo="loadingVideo"
      ></home-video-tag-bar>
      <home-video-list
        :videoList="videos"
        v-if="videos.length !== 0"
      ></home-video-list>
      <div class="button-wrapper">
        <div
          class="prev button"
          @click="prevPage"
          :class="{ 'active-button': offset === 0 }"
        >
          <span class="titi">上一页</span>
        </div>
        <div
          class="next button"
          @click="nextPage"
          :class="{ 'active-button': !more }"
        >
          <span class="titi">下一页</span>
        </div>
      </div>
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import HomeVideoTagBar from "./common/HomeVideoTagBar.vue";
import HomeVideoList from "./common/HomeVideoList.vue";
import Loading from "./common/loading.vue";
export default {
  name: "Home_video",
  components: {
    HomeVideoTagBar,
    HomeVideoList,
    Loading,
  },
  data() {
    return {
      // 视频列表
      videos: [],
      // 视频分类列表
      categoryList: [],
      // 视频标签列表
      tags: [],
      // 主要标签
      mainTag: "全部",
      // 当前加载页码
      offset: 0,
      // 当前视频的 id
      currentId: "",
      // 是否还下一页
      more: true,
      isLoading: true,
    };
  },
  methods: {
    prevPage() {
      this.offset -= 1;
      if (this.currentId) {
        this._getVideoList();
      } else {
        this._getAllVideoList();
      }
    },
    nextPage() {
      this.offset += 1;
      if (this.currentId) {
        this._getVideoList();
      } else {
        this._getAllVideoList();
      }
    },
    //全部视频标签
    async _getVideoTagList() {
      let res = await this.$api.getVideoTagList();
      if (res && res.data.code === 200) {
        this.categoryList = res.data.data;
      }
    },

    //热门标签
    async _getVideoCategoryList() {
      let res = await this.$api.getVideoCategoryList();
      if (res && res.data.code === 200) {
        this.tags = res.data.data;
      }
    },
    //获取视频（热门和全部标签视频）
    async _getAllVideoList() {
      let params = {
        offset: this.offset,
        timeStamp: new Date().valueOf(),
      };
      let res = await this.$api.getAllVideoList(params);
      if (res && res.data.code === 200) {
        let list = res.data.datas;
        this.videos = this.handleVideoList(list);
        this.isLoading = false;
      }
    },
    //切换标签
    switchHotTags(tag) {
      this.offset = 0;
      this.mainTag = tag.name;
      console.log(tag.name);
      this.currentId = tag.id;
      this._getVideoList();
    },
    //

    tagClick(group) {
      this.offset = 0;
      this.mainTag = group.name;
      this.currentId = group.id;
      this._getVideoList();
    },
    // 加载全部
    loadingVideo() {
      this.mainTag = "全部";
      // 获取全部视频列表
    },
    // 获取视频标签/分类下的视频
    async _getVideoList() {
      let params = {
        offset: this.offset,
        id: this.currentId,
        timeStamp: new Date().valueOf(),
      };
      let res = await this.$api.getVideoList(params);
      if (res && res.data.code === 200) {
        let list = res.data.datas;
        this.videos = this.handleVideoList(list);
      }
    },
    // 处理获取到的视频数据
    handleVideoList(list) {
      let ret = [];
      list.map((item) => {
        let obj = {};
        if (item.data.creator) {
          obj.artistName = item.data.creator.nickname;
          obj.playCount = item.data.playTime;
          obj.cover = item.data.coverUrl;
          obj.id = item.data.vid;
          obj.name = item.data.title;
          obj.duration = item.data.durationms;
        } else if (item.data.liveData) {
          obj.artistName = item.data.liveData.liveRoom.coverTag;
          obj.playCount = item.data.liveData.liveRoom.popularity;
          obj.cover = item.data.liveData.liveRoom.coverUrl;
          obj.id = item.data.liveData.liveRoom.liveId;
          obj.name = item.data.liveData.liveRoom.title;
        }
        ret.push(obj);
      });
      return ret;
    },
  },
  created() {
    this._getVideoTagList();
    this._getVideoCategoryList();
    this._getAllVideoList();
  },
};
</script>

<style scoped lang="less">
.video {
  padding-top: 85px;
  .video-list {
    margin-top: 20px;
  }
  .button-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    .button {
      padding: 6px 14px;
      background-color: #fa2800;
      margin: 0 10px;
      color: #f7f7f7;
      border-radius: 4px;
      cursor: pointer;
    }
    .active-button {
      background-color: rgba(250, 40, 0, 0.36);
    }
  }
}
.titi{
  font-size: 14px;
}
</style>

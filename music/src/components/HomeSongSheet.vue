<template>
  <div class="song-sheet">
    <div v-if="!isLoading">
      <tag-bar
        :mainTag="mainTag"
        :songSheetParams="songSheetParams"
        :hotTags="hotTag"
        :categoryType="categoryType"
        :videoPage="true"
        @transitionClick="transitionClick"
        @switchHotTags="switchHotTags"
        @chooseType="chooseType"
      ></tag-bar>
      <song-sheet-list :songSheetList="songSheetList"></song-sheet-list>
      <el-pagination
        :page-size="songSheetParams.limit"
        layout="total, prev, pager, next"
        @current-change="currentChange"
        :total="total"
      ></el-pagination>
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import loading from "./common/loading.vue";
import TagBar from "./common/HomeSSTagBar.vue";
import SongSheetList from "./common/HSSlist.vue";
export default {
  name: "HomeSongSheet",
  components: {
    loading,
    TagBar,
    SongSheetList,
  },
  data() {
    return {
      mainTag: "全部",
      isLoading: true,
      hotTag: [],
      categoryType: [
        {
          key: 0,
          icon: "iconfont iconyuzhong",
          value: "语种",
          tags: null,
        },
        {
          key: 1,
          icon: "iconfont iconfengge",
          value: "风格",
          tags: null,
        },
        {
          key: 2,
          icon: "iconfont iconchangjing",
          value: "场景",
          tags: null,
        },
        {
          key: 3,
          icon: "iconfont iconqinggan",
          value: "情感",
          tags: null,
        },
        {
          key: 4,
          icon: "iconfont iconzhuti",
          value: "主题",
          tags: null,
        },
      ],
      songSheetParams: {
        order: "hot",
        cat: "全部",
        limit: 40,
        offset: 0,
      },
      songSheetList: [],
      total: 0,
    };
  },
  methods: {
    //获取热门标签
    async _getHotTag() {
      let res = await this.$api.getHotSongSheet();
      if (res.status === 200) {
        this.hotTag = res.data.tags;
      } else {
        this.$message.error("热门标签获取失败");
      }
    },
    //获取全部标签
    async _AllTag() {
      let res = await this.$api.getSongSheetCategory();
      if (res.status === 200) {
        this.AllTag_classification(res.data.sub, 5);
      } else {
        this.$message.error("获取全部标签失败");
      }
    },
    //全部标签分类
    AllTag_classification(sub, count) {
      for (let i = 0; i < count; i++) {
        let itemArr = [];
        for (let j = 0; j < sub.length; j++) {
          if (sub[j].category === i) {
            itemArr.push(sub[j]);
          }
        }
        this.categoryType[i].tags = itemArr;
      }
    },
    //获取歌单
    async getSongSheet() {
      let res = await this.$api.getSongSheet(this.songSheetParams);
      if (res.status === 200) {
        this.songSheetList = res.data.playlists;
        this.total = res.data.total;
        this.isLoading = false;
      } else {
        this.$message.error("获取歌单失败");
      }
    },
    switchHotTags(tag) {
      this.songSheetParams.cat = tag.name;
      // 请求数据
      this.getSongSheet();
    },
    chooseType(type) {
      if (type === this.songSheetParams.order) {
        return;
      }
      this.songSheetParams.order = type;
      // 请求数据
      this.getSongSheet();
    },
    loadingVideo() {
      this.songSheetParams.order = "全部";
      this.getSongSheet();
    },
    // 弹窗点击事件
    transitionClick(tagName) {
      this.mainTag = tagName;
      this.songSheetParams.cat = tagName;
      // 请求数据
      this.getSongSheet();
    },
    currentChange(currentPage) {
        this.songSheetParams.offset = currentPage - 1
        // 请求数据
        this.getSongSheet()
      },
  },

  created() {
    this._getHotTag();
    this._AllTag();
    this.getSongSheet();
  },
};
</script>

<style scoped lang="less">
.song-sheet {
  min-width: 1200px;
  padding-top: 85px;
  padding-bottom: 30px;
  position: relative;

  .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
  .el-pagination /deep/ button {
    background-color: #f4f4f4;
    border-radius: 4px;
    margin: 0 4px;
  }
  .el-pagination /deep/ ul > li {
    background-color: #f4f4f4;
    border-radius: 4px;
    margin: 0 4px;
  }
  .el-pagination /deep/ .el-pager li.active {
    background-color: #fa2800;
    color: #fff;
  }
  .el-pagination /deep/ .el-pager li:hover {
    color: #fa2800;
  }
}
</style>

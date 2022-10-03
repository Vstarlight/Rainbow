<template>
  <div class="search-page">
    <div class="bg">
      <div class="input-wrapper">
        <input type="text" v-model="Tbarkeywrod" />
        <i class="el-icon-search" @click="search"></i>
      </div>
    </div>
    <div class="nav-bar">
      <h1>搜索结果</h1>
      <ul>
        <li
          v-for="item in navList"
          :key="item.id"
          :class="{ 'active-nav-bar': item.path === currentPath }"
          @click="changeTag(item.path, item.type)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <router-view
      v-if="!isLoading"
      :searchData="searchData"
      class="search-child-pages"
    ></router-view>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import loading from "./common/loading.vue";
export default {
  name: "search",
  components: {
    loading,
  },
  data() {
    return {
      searchData: [],
      navList: [
        { label: "单曲", id: 1, path: "songs", type: 1 },
        { label: "专辑", id: 2, path: "album", type: 10 },
        { label: "歌手", id: 3, path: "sings", type: 100 },
        { label: "歌单", id: 4, path: "play-list", type: 1000 },
        { label: "MV", id: 8, path: "mv", type: 1004 },
      ],
      /*inputValue: this.$route.params.keywords,*/
      currentPath: "songs",
      isLoading: true,
      Tbarkeywrod: null,
    };
  },
  computed: {
    keywords() {
      this.Tbarkeywrod = this.$route.params.keywords;
      return this.$route.params.keywords;
    },
  },
  watch: {
    Tbarkeywrod(newvlue, oldvule) {
      let path = this.$route.path.replace(/\/search\/.+\//, "");
      let type;
      this.navList.map((item) => {
        if (item.path === path) {
          type = item.type;
        }
      });
      this._getSearchData(newvlue, type);
    },
  },
  //获取搜索数据
  created() {
    let path = this.$route.path.replace(/\/search\/.+\//, "");
    let type;
    this.navList.map((item) => {
      if (item.path === path) {
        type = item.type;
      }
    });
    this._getSearchData(this.keywords, type);
  },
  methods: {
    ...mapMutations(["setSearchData", "setHistorySearch"]),
    //获取搜索数据
    async _getSearchData(value, type) {
      try {
        let params = {
          keywords: value,
          limit: 30,
          type: type,
        };
        let res = await this.$api.getSearchData(params);
        if (res.data.code === 200) {
          if (params.type === 1) {
            this.searchData = [];
            res.data.result.songs.map((item) => {
              let obj = {};
              obj.id = item.id;
              obj.song = item.name;
              if (item.al) {
                obj.picUrl = item.al.picUrl;
              }
              obj.singer = item.ar.map((it) => it.name).join("/");
              obj.album = item.al.name;
              obj.transitionTime = item.dt;
              this.searchData.push(obj);
            });
          } else if (params.type === 10) {
            this.searchData = res.data.result.albums;
          } else if (params.type === 100) {
            this.searchData = res.data.result.artists;
          } else if (params.type === 1000) {
            this.searchData = res.data.result.playlists;
          } else if (params.type === 1004) {
            this.searchData = res.data.result.mvs;
          }
          this.setSearchData(this.searchData);
          setTimeout(() => {
            this.isLoading = false;
          }, 20);
        }
      } catch (err) {
        console.log(err);
      }
    },
    //搜索按钮搜索
    search() {
      this.$router.push(`/search/${this.Tbarkeywrod}/${this.currentPath}`);
      let path = this.$route.path.replace(/\/search\/.+\//, "");
      let type;
      this.navList.map((item) => {
        if (item.path === path) {
          type = item.type;
        }
      });
      this._getSearchData(this.Tbarkeywrod, type);
      this.setHistorySearch(this.Tbarkeywrod);
    },
    //切换标签
    changeTag(path, type) {
      this.currentPath = path;
      if (this.$route.path.indexOf(path) !== -1) {
        return;
      }
      this.$router.push(`/search/${this.keywords}/${path}`);
      this._getSearchData(this.keywords, type);
    },
  },
};
</script>

<style scoped lang="less">
.search-page {
  padding: 65px 0 30px !important;
  min-width: 1230px;
  .bg {
    width: 100%;
    height: 300px;
    background-image: url("../assets/images/bg.jpg");
    background-size: cover;
    background-attachment: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    .input-wrapper {
      width: 700px;
      background-color: #fff;
      border-radius: 4px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      input {
        width: 550px;
        height: 50px;
        margin-left: 10px;
        margin-right: 30px;
        outline: none;
        font-size: 14px;
        border: none;
      }
      i {
        padding: 15px;
        font-size: 20px;
        margin-left: 35px;
        cursor: pointer;
      }
    }
  }
  .nav-bar {
    display: flex;
    align-items: center;
    padding: 30px 0 0 80px;
    margin-bottom: 30px;
    h1 {
      font-size: 24px;
      color: #af191959;
    }
    ul {
      margin-left: 50px;
      display: flex;
      li {
        padding: 10px 16px;
        margin-right: 10px;
        border-bottom: 3px solid #fff;
        cursor: pointer;
        list-style-type: none;
      }
      .active-nav-bar {
        border-bottom: 3px solid #fa2800;
      }
    }
  }
  .search-child-pages {
    padding: 0 80px;
  }
}
</style>
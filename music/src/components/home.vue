<template>
  <div class="home">
    <div>
      <div v-if="!isLoading">
        <banner></banner>
        <recommendsongs></recommendsongs>
        <recommendmusic></recommendmusic>
        <recommendsinger></recommendsinger>
      </div>
      <loading v-if="isLoading"></loading>
    </div>
  </div>
</template>

<script>
import banner from "./home/banner.vue";
import recommendsongs from "./home/recommend-songs.vue";
import recommendmusic from "./home/recommend-music.vue";
import recommendsinger from "./home/recommend-singer.vue";
import loading from "./common/loading.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "home",
  components: {
    banner,
    recommendsongs,
    recommendmusic,
    recommendsinger,
    loading,
  },
  data() {
    return {
      limit: 24,
      songs: [],
      isLoading: true,
      IlikeSongsList:[],//我收藏的id
      myList:[]//我创建
    };
  },
  computed:{
    ...mapGetters(["profile"])
  },
  created() {
    this._getRecommendSongSheet();
    this.getnewsongs();
    this.getsinger();
    this.GetUserSongSheet()
  },
  methods: {
    ...mapMutations(["oursongSheetList", "newSongList", "singerList","Ilike","myListx"]),
    async _getRecommendSongSheet() {
      let res = await this.$api.getRecommendSongeSheet(this.limit);
      if (res.status === 200) {
        this.oursongSheetList(res.data.result);
      }
    },
    async getnewsongs() {
      let res = await this.$api.getNewSongs();
      if (res.status === 200) {
        res.data.result.forEach((item) => {
          let songobj = {};
          songobj.id = item.id;
          songobj.song = item.name;
          songobj.picUrl = item.picUrl;
          songobj.singers = item.song.album.artists[0].name;
          songobj.tiem = item.song.duration;
          songobj.zhuanjiname = "《" + item.song.album.name + "》";
          this.songs.push(songobj);
        });
        this.newSongList(this.songs);
      }
    },
    async getsinger() {
      let res = await this.$api.getRecommendSinger();
      if (res.status === 200) {
        this.singerList(res.data.artists);
        this.isLoading = false;
      }
    },
    async GetUserSongSheet() {
      try {
        let res = await this.$api.GetUserSongSheet(this.profile.userId);
        if (res.data.code === 200) {
          let list = res.data.playlist;
          list.map((item,index) => {
            if (list[index].subscribed) {
              this.IlikeSongsList.push(item.id);
            }else{
              this.myList.push(item.id)
            }
          });
          window.localStorage.setItem("Ilike", JSON.stringify(this.IlikeSongsList));
          window.localStorage.setItem("myList", JSON.stringify(this.myList));
          this.myListx(this.myList)
          this.Ilike(this.IlikeSongsList);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="less">
.home {
  width: 100%;
  min-width: 1200px;
  padding-bottom: 20px;
  padding-top: 60px;
}
::-webkit-scrollbar {
  width: 0px;
}
</style>
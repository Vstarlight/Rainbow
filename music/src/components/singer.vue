<template>
  <div class="singer">
    <div v-if="!isloding">
      <singer-tar
        :singerData="singerData"
        @searchSinger="searchSinger"
        :activeIndex="activeIndex"
      ></singer-tar>
      <singer-img :singers="singers"></singer-img>
    </div>
    <loading v-if="isloding"></loading>
  </div>
</template>

<script>
import loading from "./common/loading.vue";
import SingerTar from "./common/singerTar.vue";
import SingerImg from "./common/SingerImg";
export default {
  name: "singer",
  components: {
    loading,
    SingerTar,
    SingerImg,
  },
  data() {
    return {
      isloding: true,
      singerData: {
        type: [
          { value: -1, label: "全部" },
          { value: 1, label: "男歌手" },
          { value: 2, label: "女歌手" },
          { value: 3, label: "乐队" },
        ],
        area: [
          { value: -1, label: "全部" },
          { value: 7, label: "华语" },
          { value: 96, label: "欧美" },
          { value: 8, label: "日本" },
          { value: 16, label: "韩国" },
          { value: 0, label: "其他" },
        ],
        initial: [
          { value: -1, label: "热门" },
          { value: "a", label: "A" },
          { value: "b", label: "B" },
          { value: "c", label: "C" },
          { value: "d", label: "D" },
          { value: "e", label: "E" },
          { value: "f", label: "F" },
          { value: "h", label: "H" },
          { value: "i", label: "I" },
          { value: "g", label: "G" },
          { value: "k", label: "K" },
          { value: "m", label: "M" },
          { value: "l", label: "L" },
          { value: "n", label: "N" },
          { value: "o", label: "O" },
          { value: "p", label: "P" },
          { value: "q", label: "Q" },
          { value: "r", label: "R" },
          { value: "s", label: "S" },
          { value: "t", label: "T" },
          { value: "u", label: "U" },
          { value: "v", label: "V" },
          { value: "w", label: "W" },
          { value: "x", label: "X" },
          { value: "y", label: "Y" },
          { value: "z", label: "Z" },
          { value: 0, label: "其他" },
        ],
      },
      activeIndex: {
        type: 0,
        area: 0,
        initial: 0,
      },
      singerParams: {
        limit: 50,
        offset: 0,
        type: -1,
        area: -1,
        initial: -1,
      },
      singers: [],
    };
  },
  methods: {
    searchSinger(index, key) {
      console.log(index, key);
      this.activeIndex[key] = index;
      this.singerParams[key] = this.singerData[key][index].value;
      console.log(this.singerParams);
      this.getSingerImg();
    },
    async getSingerImg() {
      let res = await this.$api.getSingerCategory(this.singerParams);
      if (res.status === 200) {
        this.singers = res.data.artists;
        this.isloding = false;
      }
    },
  },
  created() {
    this.getSingerImg();
  },
};
</script>

<style scoped lang="less">
.singer {
  min-width: 1230px;
  padding-top: 85px;
  padding-bottom: 30px;
}
</style>

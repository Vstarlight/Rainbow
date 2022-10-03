<template>
  <div class="mv">
    <div v-if="!isLoading">
      <mv-tar
        :mvCategory="mvCategory"
        :activeIndex="activeIndex"
        @tag="tag"
      ></mv-tar>
      <mv-video-list :mvList="mvList"></mv-video-list>
    </div>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
import loading from "./common/loading.vue";
import MvTar from "./common/MvTar.vue";
import MvVideoList from "./common/MvVideoList.vue";
export default {
  name: "MV",
  components: {
    loading,
    MvTar,
    MvVideoList,
  },
  data() {
    return {
      isLoading: true,
      mvParamas: {
        area: "全部",
        type: "全部",
        order: "上升最快",
        limit: 20,
        offset: 0,
      },
      mvCategory: {
        area: [
          { value: "全部" },
          { value: "内地" },
          { value: "港台" },
          { value: "欧美" },
          { value: "日本" },
          { value: "韩国" },
        ],
        type: [
          { value: "全部" },
          { value: "官方版" },
          { value: "原生" },
          { value: "现场版" },
          { value: "网易出品" },
        ],
        order: [{ value: "上升最快" }, { value: "最热" }, { value: "最新" }],
      },
      activeIndex: {
        area: 0,
        type: 0,
        order: 0,
      },
      mvList: [],
    };
  },
  methods: {
    tag(index, key) {
      this.activeIndex[key] = index;
      this.mvParamas[key] = this.mvCategory[key][index].value;
      this.getSerchDara();
    },
    async getSerchDara() {
      let res = await this.$api.getAllMV(this.mvParamas);
      if (res.status === 200) {
        this.mvList = res.data.data;
        this.isLoading = false;
      }
    },
  },
  created(){
    this.getSerchDara()
  }
};
</script>

<style scoped lang="less">
.mv {
  min-width: 1230px;
  padding-top: 85px;
  padding-bottom: 30px;
}
</style>

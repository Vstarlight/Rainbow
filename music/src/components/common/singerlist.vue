<template>
  <div class="wrapper">
    <div class="group" v-for="item in singerList" :key="item.id" @click="TosingerData(item.id)">
      <a>
        <el-image lazy :src="item.picUrl" class="imagebox"></el-image>
        <h3>{{ item.name }}</h3>
        <span>单曲数{{ item.musicSize }}</span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "singerlist",
  computed: {
    ...mapState(["singerList"]),
  },
  methods:{
    TosingerData(id){
      this.$router.push(`/singer-detail/${id}`)
    }
  }
};
</script>

<style scoped lang="less">
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .group {
    flex: 0 0 10%;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    .imagebox {
      width: 90px;
      height: 90px;
      border-radius: 100%;
      box-shadow: 0 0 4px rgba(1, 2, 3, 0.7);
    }
    h3 {
      margin: 10px 0;
      color: #4a4a4a;
    }
    span {
      color: #fa2800;
      font-size: 12px;
    }
  }
}
</style>
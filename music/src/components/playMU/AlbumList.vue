<template>
  <ul>
    <li v-for="group in searchData" :key="group.id">
      <span class="box">
        <i class="iconfont iconbofang">{{group.subType || group.type}}</i>
      </span>
      <el-image lazy class="elimg" :src="group.picUrl"></el-image>
      <h2>{{ group.name }}</h2>
      <p>{{ time(group.publishTime) }}</p>
    </li>
  </ul>
</template>

<script>
import moment from "moment";
export default {
  name: "albumlist",
  props: {
    searchData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    time(tiem) {
      return moment(tiem).format("YYYY-MM-DD");
    },
  },
};
</script>

<style scoped lang="less">
ul {
  display: flex;
  flex-wrap: wrap;
  li {
    padding: 12px 10px;
    position: relative;
    list-style: none;
    .box {
      position: absolute;
      padding: 3px 5px;
      background-color: #000;
      z-index: 2;
      color: #fff;
      border-radius: 0 6px 0 6px;
      top: 16px;
      right: 16px;
      i {
        font-size: 12px;
      }
    }
    .elimg {
      width: 130px;
      height: 130px;
      border-radius: 4px;
      box-shadow: 0 5px 10px rgba(2, 10, 18, 0.3);
    }
    h2 {
      margin: 6px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 130px;
    }
  }
}
</style>
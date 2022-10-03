<template>
  <div class="category-container">
    <ul v-for="(group, key) in singerData" :key="group.index">
      <li
        v-for="(item, index) in group"
        :key="item.index"
        :class="{ 'active': index === activeIndex[key] }"
        @click="searchSinger(index, key)"
      >
        {{ item.label || item.value }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "singerTar",
  props: {
    singerData: {
      type: Object,
      default() {
        return {};
      },
    },
    activeIndex: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    searchSinger(index, key) {
      this.$emit("searchSinger", index, key);
    },
  },
};
</script>

<style scoped lang="less">
.category-container {
  ul {
    display: flex;
    li {
      list-style: none;
      padding: 6px 12px;
      background-color: #f4f4f4;
      border-radius: 50px;
      margin: 10px 4px;
      cursor: pointer;
      font-size: 12px;
    }
    .active {
      background-color: #fa2800;
      color: #fff;
    }
  }
}
</style>
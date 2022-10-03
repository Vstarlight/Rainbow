<template>
  <div class="search-songs">
    <gedan v-bind="$attrs"></gedan>
  </div>
</template>

<script>
import gedan from "../playMU/gedan.vue"
export default {
  name: "SearchPlayList",
  components: {
    gedan,
  },
};
</script>

<style>
</style>
<template>
  <div class="search-songs">
    <album-list v-bind="$attrs"></album-list>
  </div>
</template>

<script>
import AlbumList from "../playMU/AlbumList.vue";
export default {
  name: "SearchAlbum",
  components: {
    AlbumList,
  },
};
</script>

<style>
</style>
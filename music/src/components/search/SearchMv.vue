<template>
  <div class="search-songs">
    <mv v-bind="$attrs"></mv>
  </div>
</template>

<script>
import mv from "../playMU/MVlist.vue"
export default {
  name: "SearchMV",
  components: {
    mv,
  },
};
</script>

<style>
</style>
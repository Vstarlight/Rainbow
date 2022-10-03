<template>
  <div class="search-songs">
    <sings-list v-bind="$attrs"></sings-list>
  </div>
</template>

<script>
import SingsList from '../playMU/singsList.vue'
export default {
name:"SearchSings",
components:{   
SingsList
}
}
</script>

<style>

</style>
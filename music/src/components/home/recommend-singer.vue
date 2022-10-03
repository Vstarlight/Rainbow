<template>
    <div class="recommend-singer">
        <h2 class="title">推荐歌手</h2>
        <singerlist></singerlist>
    </div>
</template>

<script>
import singerlist from "../common/singerlist.vue"
export default {
    name:"recommend-singer",
    components:{
        singerlist
    }
}
</script>

<style>
.recommend-singer{
  margin-top: 15px;
}
.title {
  margin: 0 0 15px 0;
  font-size: 20px;
  color: #af191959;
}
</style>
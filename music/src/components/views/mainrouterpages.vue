<template>
  <div>
    <div class="mainrouterpages">
      <header-main
        v-if="!(this.$route.path.indexOf('/login') !== -1)"
      ></header-main>
      <router-view class="routerpage"></router-view>
      <fottermain
        v-if="!(this.$route.path.indexOf('/login') !== -1)"
      ></fottermain>
      <go-top></go-top>
      <playBar v-if="Object.keys(currentSong).length !== 0"></playBar>
    </div>
  </div>
</template>

<script>
import HeaderMain from "@/components/HeaderMain.vue";
import login from "@/components/login.vue";
import fottermain from "@/components/home/fottermain.vue";
import GoTop from "@/components/common/GoTop.vue";
import playBar from "@/components/playMU/playBar.vue";
import bg from "@/components/bg.vue"
import { mapState } from "vuex";
export default {
  name: "mainrouterpages",
  components: { HeaderMain, login, fottermain, GoTop, playBar },
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapState(["currentSong"]),
  },
};
</script>

<style scoped lang="less">

.mainrouterpages {
  position: relative;
  min-height: 100vh;
  min-width: 1200px;
  .routerpage {
    padding-left: 17%;
    padding-right: 17%;
    min-height: 473px;
  }
}
::-webkit-scrollbar {
  width: 0px;
}
</style>
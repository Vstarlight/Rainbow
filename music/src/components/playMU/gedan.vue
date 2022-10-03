<template>
  <div class="song-sheet-list">
    <div class="container">
        <div class="group" v-for="item in this.searchData" :key="item.id" @click="playListDetail(item.id)">
            <a href="">
                <span>
                    <i class="iconfont iconbofang"></i>
                    {{formatNumber(item.playCount)}}
                </span>
                <el-image class="imgbox" :src="item.picUrl || item.coverImgUrl"></el-image>
                <h3>{{item.name}}</h3>
            </a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:"gedan",
    props: {
    searchData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods:{
     playListDetail(id){
        this.$router.push(`/play-list-detail/${id}`)
      },
      formatNumber(num) {
      num = Number(num);
      if (num == 0) {
        return num + "";
      } else if (num > 1 && num < 10000) {
        return num + "";
      } else {
        return (num / 10000).toFixed(0) + "万";
      }
    },
  }
}
</script>

<style scoped lang="less">
.song-sheet-list{
  width: 100%;
  .container{
    display: flex;
    flex-wrap: wrap;
    .group{
      flex: 0 0 12.5%;
      width: 12.5%;
      padding:0 20px 20px;
      max-width: 12.5%;
      position: relative;
      a{
        text-decoration: none;
        span{
          position: absolute;
          right: 25px;
          top: 25px;
          background-color: #000;
          color: #fff;
          font-size: 12px;
          border-radius: 4px;
          z-index: 2;
          .iconbofang{
            font-size: 1px;
          }
        }
        .imgbox{
          border-radius: 2px;
          margin-bottom: 10px;
          box-shadow: 0 0 5px rgba(1,2,2, .7);
        }
        h3{
          color: #4a4a4a
        }
      }
    }
  }
}
</style>
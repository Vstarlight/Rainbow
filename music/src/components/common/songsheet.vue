<template>
  <div class="list">
    <div class="item" v-for="item of songSheetList" :key="item.id" @click="toDetail(item.id)">
      <div class="wrapper">
        <a>
          <div class="cover">
            <div class="image">
              <el-image
                :key="item.picUrl || item.coverImgUrl + '?param=300y300'"
                :src="item.picUrl || item.coverImgUrl + '?param=300y300'"
              >
                <div
                  slot="placeholder"
                  class="image-slot flex-center flex-column"
                >
                  <i class="el-icon-picture"></i>
                  <p>加载中<span>...</span></p>
                </div>
                <div slot="error" class="image-slot flex-center">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <div class="count">
              <i class="arrow"></i>
              <span class="wan">{{ formatNumber (item.playCount) }}</span>
            </div>
          </div>
        </a>
      </div>
      <div class="info">
        <h2 class="name">
          {{ item.name }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "songsheet",
  data() {
    return {};
  },
  methods: {
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
    toDetail(id){
      this.$router.push(`/play-list-detail/${id}`)
    }
  },
  computed: {
    ...mapState(["songSheetList"]),
  },
};
</script>

<style scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
}
.item {
  flex: 0 0 12.5%;
  max-width: 12.5%;
  padding: 0 10px 25px;
  cursor: pointer;
}
.wrapper {
  position: relative;
  padding-right: 10px;
}
.wrapper:before {
  content: "";
  width: 100%;
  height: 90%;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 14px;
  transition: all 0.4s;
}
.wrapper:after {
  content: "";
  width: 100%;
  height: 85%;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 16px;
  transition: all 0.4s;
}
.wrapper:before {
  right: 6px;
  transform: scale(0.85);
  transform-origin: 100% 50%;
  z-index: 2;
  border-radius: 2px;
  opacity: 0.9;
}
.wrapper:after {
  right: 1px;
  transform: scale(0.73);
  transform-origin: 100% 50%;
  z-index: 1;
  border-radius: 2px;
  opacity: 0.5;
}
.cover {
  position: relative;
  z-index: 2;
  padding-top: 100%;
  border-radius: 2px;
  background-color: #d9d9d9;
}
.image {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
.image:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  -webkit-box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.05) inset,
    -1px -1px 0 rgba(0, 0, 0, 0.05) inset;
  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.05),
    inset -1px -1px 0 rgba(0, 0, 0, 0.05);
}
img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}
.count {
  position: absolute;
  right: 16px;
  top: 1px;
  height: 24px;
  padding-left: 9px;
  background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png)
    no-repeat 0;
  background-size: cover;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.arrow {
  display: block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 4px 0 4px 6px;
  border-color: transparent transparent transparent #ffffff;
  margin-right: 5px;
}
.count:after {
  content: "";
  position: absolute;
  right: -14px;
  top: 0;
  width: 14px;
  height: 24px;
  background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png)
    no-repeat 100%;
  background-size: cover;
}
.name {
  margin-top: 12px;
  font-size: 14px;
  text-overflow: -o-ellipsis-lastline;
	overflow: hidden;				
	text-overflow: ellipsis;		
	display: -webkit-box;			
	-webkit-line-clamp: 2;		
	line-clamp: 2;					
	-webkit-box-orient: vertical;	
}
.wan{
    font-size: 4px;
}
</style>
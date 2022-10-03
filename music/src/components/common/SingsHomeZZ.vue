<template>
  <div class="album-box">
    <ul class="album-list">
      <li v-for="item of hotAlbums" :key="item.id" @click="toDetail(item.id)">
        <div class="wrapper">
          <div class="cover">
            <div class="image">
              <el-image :key="item.picUrl" :src="item.picUrl" lazy></el-image>
            </div>
            <div class="count">
              <i class="arrow"></i>
              <span>{{ item.subType || item.type }}</span>
            </div>
          </div>
        </div>
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="author">{{ item.artist.name }}</div>
          <div class="time author">
            {{ formatDate(item.publishTime, "YYYY-MM-DD") }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SingsHomeZZ",
  props: {
    hotAlbums: {
      typeof: Array,
    },
  },
  methods: {
    //日期格式
    formatDate(date) {
      let d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    },
  toDetail(id){
    this.$router.push(`/play-list-detail/${id}`)
  }
  },
};
</script>

<style lang="less" scoped>
.album-box {
  .album-list {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    li {
      padding: 0 15px 30px;
      flex: 0 0 16.666667%;
      max-width: 16.666667%;
      cursor: pointer;
      list-style: none;
      .wrapper {
        position: relative;
        padding-right: 10px;
        overflow: hidden;
        .cover {
          position: relative;
          z-index: 2;
          padding-top: 100%;
          border-radius: 2px;
          background-color: #d9d9d9;
          .image {
            position: absolute;
            top: 0;
            left: 0;
            overflow: hidden;
            width: 100%;
            height: 100%;
            border-radius: 2px;
            img {
              position: absolute;
              top: 50%;
              left: 50%;
              -webkit-transform: translate(-50%, -50%);
              -ms-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
              width: 100%;
            }
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
            .arrow {
              display: block;
              width: 0;
              height: 0;
              border-style: solid;
              border-width: 4px 0 4px 6px;
              border-color: transparent transparent transparent #ffffff;
              margin-right: 5px;
            }
            &:after {
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
          }
        }
        &::after {
          content: '';
          position: absolute;
          z-index: 1;
          right: 3px;
          top: 50%;
          -webkit-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          transform: translateY(-50%);
          width: 100%;
          padding-top: 100%;
          background-color: #000;
          border-radius: 50%;
          transition: all 0.4s;
        }
        &:hover {
          &::after {
            right: 0px;
          }
        }
      }
      .info {
        margin-top: 15px;
        .name {
          font-weight: 700;
          line-height: 18px;
          font-size: 14px;
          width: 140px; //宽度
          overflow: hidden; //超出文本隐藏
          text-overflow: ellipsis; ///超出部分省略号显示
          display: -webkit-box; //弹性盒模
          -webkit-box-orient: vertical; //上下垂
          -webkit-line-clamp: 1;
        }
        .author {
          margin-top: 5px;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>
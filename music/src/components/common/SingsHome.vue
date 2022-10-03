<template>
  <div class="singer-detail">
    <div class="singer-info">
      <div class="top">
        <div class="top-mask">
          <div class="singer-box">
            <div class="avatar">
              <img :src="singerDetail.img1v1Url" />
            </div>
            <p class="nickname">
              {{ singerDetail.name }}
            </p>
            <div class="follow" @click="gz">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-guanzhu"></use>
              </svg>
              关注TA
            </div>
            <div class="desc" v-html="singerDetail.briefDesc"></div>
            <div class="alltext">
              <p @click="drawer = true" type="primary">全部</p>
            </div>
            <ul class="info">
              <li>
                <p class="num">{{ singerDetail.musicSize }}</p>
                <p class="text">单曲数</p>
              </li>
              <li>
                <p class="num">{{ singerDetail.albumSize }}</p>
                <p class="text">专辑数</p>
              </li>
              <li>
                <p class="num">{{ singerDetail.mvSize }}</p>
                <p class="text">MV数</p>
              </li>
              <li v-show="singerDetail.followeds">
                <p class="num">{{ singerDetail.followeds }}</p>
                <p class="text">粉丝</p>
              </li>
            </ul>
          </div>
          <div class="bottom-trangle"></div>
        </div>
      </div>
      <div class="bottom">
        <ul class="nav">
          <li
            v-for="item of navList"
            :key="item.id"
            @click="change(item.id)"
            :class="active == item.id ? 'active' : ''"
          >
            {{ item.name }}
          </li>
        </ul>
        <div class="content">
          <play-list :songs="songs" v-if="active === 1"></play-list>
          <album v-if="active === 2" :hotAlbums="hotAlbums"></album>
          <mv v-if="active ==3" :mvList="mvList"></mv>
          <div class="info-box" v-if="active === 4">
            <h2 class="title">{{ singerDetail.name }}简介</h2>
            <div class="profile" v-html="singerDesc.briefDesc"></div>
            <div class="introduction">
              <div
                class="item"
                v-for="item of singerDesc.introduction"
                :key="item.ti"
              >
                <h3 class="sub-title">{{ item.ti }}</h3>
                <p v-html="item.txt"></p>
              </div>
            </div>
          </div>
          <div class="simi-box" v-if="active === 5">
            <ul class="singer-list" v-if="XsSinger.length > 0">
              <singer-item :singers="XsSinger"></singer-item>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false">
      <div class="box">
        <span v-html="singerDetail.briefDesc"></span>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import SingerItem from "../common/SingerImg.vue";
import playList from "../common/SingsHomePlayList.vue";
import album from "../common/SingsHomeZZ.vue";
import mv from "../common/MvVideoList.vue"
export default {
  name: "SingsHome",
  components: {
    SingerItem,
    playList,
    album,
    mv
  },
  data() {
    return {
      //歌手id
      ID: null,
      // 歌手基本信息
      singerDetail: [],
      drawer: false,
      navList: [
        {
          name: "作品",
          id: 1,
        },
        {
          name: "专辑",
          id: 2,
        },
        {
          name: "MV",
          id: 3,
        },
        {
          name: "歌手详情",
          id: 4,
        },
        {
          name: "相似歌手",
          id: 5,
        },
      ],
      //状态
      active: 1,

      //歌手简介
      singerDesc: {},

      //相识歌手
      XsSinger: [],

      //热门歌曲
      songs: [],

      //热门专辑
      hotAlbums: [],

      //mv
      mvList:null
    };
  },
  computed: {
    sex() {
      if (this.singerDetail.gender > 0) {
        return this.detail.gender === 1
          ? "#icon-xingbienan"
          : "#icon-xingbienv";
      } else {
        return "";
      }
    },
  },
  methods: {
    change(id) {
      this.active = id;
    },
    gz() {
      console.log(this.albumSizeS);
    },
    //初始化请求
    ALLgetData(id) {
      this.getsingerDetail(id);
      this.getsingJJ(id);
      this.getXsSinger(id);
      this.getSingerHot(id);
      this.getSingMV(id)
    },

    /// 获取歌手基本信息
    async getsingerDetail(id) {
      try {
        let res = await this.$api.getsingerDetail(id);
        if (res.data.code === 200) {
          this.singerDetail = res.data.artist;
        }
        let ress = await this.$api.getAlbum(id,this.singerDetail.albumSize) //获取专辑
        if (ress.data.code === 200) {
          this.hotAlbums=ress.data.hotAlbums;
        }
      } catch (error) {
        console.log(error);
      }
    },

    //获取歌手简介
    async getsingJJ(id) {
      try {
        let res = await this.$api.getsingJJ(id);
        if (res.data.code === 200) {
          if (res.data.introduction.length > 0) {
            res.data.introduction.map((item) => [
              (item.txt = item.txt.replace(/(\r\n|\n|\r)/gm, "<br />")),
            ]);
          }
          this.singerDesc = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },

    //获取相识歌手
    async getXsSinger(id) {
      try {
        let res = await this.$api.getXsSinger(id);
        if (res.data.code === 200) {
          let obj = [];
          obj = res.data.artists;
          obj.length = 18;
          this.XsSinger = obj;
        }
      } catch (error) {
        console.log(error);
      }
    },

    //获取热门歌曲
    async getSingerHot(id) {
      try {
        let res = await this.$api.getSingerHot(id);
        if (res.data.code === 200) {
          let list = res.data.hotSongs;
          list.map((item) => {
            let obj = {};
            obj.id = item.id;
            obj.picUrl = item.al.picUrl;
            obj.singer = item.ar.map((item) => item.name).join("/");
            obj.singers = item.ar.map((item) => item.name).join("/");
            obj.song = item.name;
            obj.album = item.al.name;
            obj.tiem = item.dt;
            this.songs.push(obj);
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    //获取歌手MV
    async getSingMV(id){
      try {
        let res= await this.$api.getSingMV(id)
        if (res.data.code ===200) {
          this.mvList=res.data.mvs
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    let id = this.$route.path.substring(15);
    this.ID = id;
    this.ALLgetData(id);
    
  },
};
</script>

<style lang="less" scoped>
.box {
  margin: 20px;
  span {
    font-size: 18px;
    line-height: 1.5;
    color: rgb(112, 110, 110);
  }
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.singer-detail {
  .singer-info {
    .top {
      position: relative;
      width: 180%;
      height: 580px;
      background: url(../../assets/images/top-bg.jpg);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      margin-left: -40%;
      .top-mask {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        .singer-box {
          height: 100%;
          position: relative;
          margin: 0 auto;
          padding-top: 10px;
          text-align: center;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          display: flex;
          justify-content: center;
          align-items: center;
          .avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            position: relative;
            overflow: hidden;
            transition: all 0.15s ease-in-out;
            -moz-transition: all 0.15s ease-in-out;
            -webkit-transition: all 0.15s ease-in-out;
            -o-transition: all 0.15s ease-in-out;
            &:hover {
              box-shadow: 0px 0px 20px 0px rgba(255, 255, 255, 0.8);
            }
            img {
              width: 120px;
              height: 120px;
              border-radius: 50%;
              background: #fff;
              border: 3px solid rgba(255, 255, 255, 0.6);
            }
          }
          .nickname {
            margin-top: 20px;
            font-size: 24px;
            font-weight: 700;
            color: #fff;
            line-height: 24px;
            .icon {
              font-size: 20px;
              z-index: 9;
            }
          }
          .follow {
            margin: 24px 0 30px;
            padding: 0;
            height: 36px;
            width: 96px;
            font-size: 12px;
            line-height: 36px;
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.6);
            cursor: pointer;
            border-radius: 18px;
            .icon {
              position: relative;
              font-size: 22px;
              top: 3px;
            }
          }
          &:hover {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid #fff;
          }
          .desc {
            margin: 0 auto 24px;
            width: 740px;
            height: 48px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.6);
            line-height: 24px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-weight: 700;
            line-height: 22px;
            text-overflow: ellipsis;
          }
          .alltext {
            margin-top: -20px;
            padding-bottom: 22px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            p {
              color: #fff;
            }
          }
          .info {
            margin: 0 auto;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            li {
              list-style: none;
              margin: 0 50px;
              text-align: center;
              .num {
                margin-bottom: 8px;
                font-size: 24px;
                line-height: 24px;
                color: #fff;
              }
              .text {
                font-size: 14px;
                line-height: 14px;
                color: rgba(255, 255, 255, 0.6);
              }
            }
          }
        }
        .bottom-trangle {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 137px;
          background-position: center;
          background: url(../../assets/images/arrow-lr.png);
          z-index: 1;
        }
      }
    }
    .bottom {
      max-width: 1200px;
      width: 100%;
      margin-right: auto;
      margin-left: auto;
      .nav {
        margin: 30px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        li {
          margin: 0 20px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          list-style: none;
        }
        .active {
          color: #fa2800;
        }
      }
      .content {
        background: #fff;
        .info-box {
          padding: 15px;
          .title {
            text-align: center;
            position: relative;
            margin-bottom: 30px;
            &::after {
              content: "";
              width: 40px;
              height: 2px;
              background: #fa2800;
              position: absolute;
              left: 50%;
              bottom: -10px;
              margin-left: -20px;
            }
          }
          .profile {
            line-height: 1.7;
            margin-bottom: 20px;
            text-align: center;
          }
          .introduction {
            .item {
              margin-bottom: 15px;
              .sub-title {
                margin-bottom: 10px;
              }
              p {
                line-height: 1.7;
              }
            }
          }
        }
      }
    }
  }
}
</style>
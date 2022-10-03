<template>
  <div class="personal-wrap">
    <div class="bg"></div>
    <div class="personal-main">
      <div class="center">
        <div class="card-headerC">
          <p class="pp">
            听歌排行
            <span class="textr">(累计听歌{{ Info.playlistCount }}首)</span>
          </p>
          <div class="work">
            <span
              class="textr"
              :class="type == 1 ? 'active' : ''"
              @click="changeType(1)"
              >最近一周</span
            >
            <span class="shu">丨</span>
            <span
              class="textr"
              :class="type == 0 ? 'active' : ''"
              @click="changeType(0)"
              >所有时间</span
            >
          </div>
        </div>
        <play-list
          v-if="(playRecordList.length !== 0 )&&( !isLoading)"
          :playRecordList="playRecordList"
        ></play-list>
        <loading v-if="isLoading"></loading>
        <div class="kong" v-if="playRecordList.length===0">
          <img src="../assets/images/empty.png" alt="" />
          <p>ta可能什么都不想让我们看到</p>
        </div>
      </div>
      <div class="letf">
        <div class="user-box">
          <div
            class="background"
            :style="{
              backgroundImage: 'url(' + Info.backgroundUrl + ')',
            }"
          ></div>
          <div class="card">
            <div class="avatar">
              <img :src="Info.avatarUrl" />
            </div>
            <div class="info">
              <p class="name">{{ Info.nickname }}</p>
              <div v-if="!(this.$route.query.id)">
                <img :src="this.VIPimg" alt="" class="vipimg" />
              </div>
            </div>
          </div>
          <div class="profile">
            <i :class="Lvimg(UserLV)" class="iconLV"></i>
            <div class="tag">等级:<i></i></div>
            <div class="tag">
              年龄:
              <span>{{ getAstro(Info.birthday) }}</span>
            </div>
            <i v-if="Info.gender === 2"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xingbienv"></use>
              </svg>
            </i>
            <i v-if="Info.gender === 1"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xingbienan"></use>
              </svg>
            </i>
            <div class="tag">
              <font class="flex-shrink">签名:</font>
              <span class="ellipsis">{{ Info.signature }}</span>
            </div>
          </div>
          <ul class="follow">
            <li>
              动态<span>{{ Info.eventCount }}</span>
            </li>
            <li>
              关注<span>{{ Info.follows }}</span>
            </li>
            <li>
              粉丝<span>{{ Info.followeds }}</span>
            </li>
          </ul>

          <div class="foot">
            <router-link tag="a" to="/">个人设置</router-link>
            <router-link tag="a" to="/">我的等级</router-link>
          </div>
        </div>
        <div class="right">
          <div class="my module1 shadow">
            <div class="card-header flex-row">
              <span>我创建的歌单</span>
            </div>
            <song-sheet-list :sheetList="myList"></song-sheet-list>
          </div>
          <div class="my collect module shadow">
            <div class="card-header flex-row">
              <span>我收藏的歌单</span>
            </div>
            <song-sheet-list :sheetList="collectList"></song-sheet-list>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SongSheetList from "../components/common/MySongSheetLits.vue";
import PlayList from "../components/common/MyPlayList.vue";
import loading from "../components/common/loading.vue";
import { mapGetters } from "vuex";
export default {
  name: "profile",
  components: {
    SongSheetList,
    PlayList,
    loading
  },
  data() {
    return {
      UserLV: null,
      myList: [],
      collectList: [],
      type: 1,
      playRecordList: [],
      VIPimg: "",
      isLoading:true,
      id:null,
      Info:{}
    };
  },
  computed: {
    ...mapGetters(["profile"]),
  },
  methods: {
    //获取用户信息
    async getUserInfo(id){
      try {
        let res=await this.$api.getUserInfo(id)
        if (res.data.code ===200) {
          console.log(res.data)
          this.UserLV=res.data.level
          this.Info.avatarUrl=res.data.profile.avatarUrl
          this.Info.backgroundUrl=res.data.profile.backgroundUrl
          this.Info.birthday=res.data.profile.birthday
          this.Info.nickname=res.data.profile.nickname
          this.Info.eventCount=res.data.profile.eventCount
          this.Info.followeds=res.data.profile.followeds
          this.Info.follows=res.data.profile.follows
          this.Info.playlistCount=res.data.profile.playlistCount
          this.Info.gender=res.data.profile.gender
          this.Info.signature=res.data.profile.signature
        }
      } catch (error) {
        console.log(error)
      }
    },

    //获取用户等级
    async GetUserLv() {
      try {
        let res = await this.$api.GetUserLv();
        if (res.data.code === 200) {
          this.UserLV = res.data.data.level;
        } else {
          this.$message.error("获取用户等级失败");
        }
      } catch (err) {
        console.log(err);
      }
    },
    //等级选择
    Lvimg(UserLV) {
      switch (true) {
        case UserLV === 0:
          return "iconfont icon-LV0";
        case UserLV === 1:
          return "iconfont icon-LV1";
        case UserLV === 2:
          return "iconfont icon-LV2";
        case UserLV === 3:
          return "iconfont icon-LV3";
        case UserLV === 4:
          return "iconfont icon-LV4";
        case UserLV === 5:
          return "iconfont icon-LV5";
        case UserLV === 6:
          return "iconfont icon-LV6";
        case UserLV === 7:
          return "iconfont icon-LV7";
        case UserLV === 8:
          return "iconfont icon-LV8";
        case UserLV === 9:
          return "iconfont icon-LV9";
        case UserLV === 10:
          return "iconfont icon-LV10";
      }
    },
    // 获取是几几后
    getAstro(timestamp) {
      let newDate = new Date();
      newDate.setTime(timestamp);
      let birthday = newDate.toLocaleDateString(timestamp);
      let birthdayArr = birthday.split("/");
      let year = birthdayArr[0].substring(birthdayArr[0].length - 2) + "后";
      let month = birthdayArr[1];
      let day = birthdayArr[2];
      return (
        year +
        " - " +
        "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯".substr(
          month * 2 - (day < "102223444433".charAt(month - 1) - -19) * 2,
          2
        ) +
        "座"
      );
    },
    //获取用户歌单
    async GetUserSongSheet(id) {
      try {
        let res = await this.$api.GetUserSongSheet(id);
        if (res.data.code === 200) {
          let list = res.data.playlist;
          let myList = []; //我的
          let collectList = []; //我是收藏的
          list.map((item, index) => {
            if (list[index].subscribed) {
              collectList.push(item);
            } else {
              myList.push(item);
            }
          });
          this.myList = myList;
          this.collectList = collectList;
        }
      } catch (error) {
        console.log(error);
      }
    },

    //获取用户播放记录
    async getUserRecord(id) {
      try {
        this.playRecordList = [];
        let res = await this.$api.getUserRecord(id, this.type);
        if (res.data.code === 200) {
          if (this.type == 1) {
            let list = res.data.weekData;
            list.map((item) => {
              let obj = {};
              obj.id = item.song.id;
              obj.picUrl = item.song.al.picUrl;
              obj.singer = item.song.ar.map((item) => item.name).join("/");
              obj.singers = item.song.ar.map((item) => item.name).join("/");
              obj.song = item.song.name;
              obj.album = item.song.al.name;
              obj.tiem = item.song.dt;
              this.playRecordList.push(obj);
            });
          } else {
            let list = res.data.allData;
            list.map((item) => {
              let obj = {};
              obj.id = item.song.id;
              obj.picUrl = item.song.al.picUrl;
              obj.singer = item.song.ar.map((item) => item.name).join("/");
              obj.singers = item.song.ar.map((item) => item.name).join("/");
              obj.song = item.song.name;
              obj.album = item.song.al.name;
              obj.tiem = item.song.dt;
              this.playRecordList.push(obj);
            });
          }
        }
        this.isLoading=false
      } catch (error) {
        console.log(error);
      }
    },
    //播放记录时间
    changeType(type) {
      this.type = type;
      this.getUserRecord();
    },
    //获取是否为vip
    async getVipUser() {
      try {
        let res = await this.$api.getVipUser();
        if (res.data.code === 200) {
          this.VIPimg = res.data.data.redVipDynamicIconUrl2;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    if (this.$route.query.id) {
      this.id=this.$route.query.id
    }else{
      this.Info=this.profile
      this.id=this.profile.userId
    }
    this.GetUserLv(this.id);
    this.GetUserSongSheet(this.id);
    this.getUserRecord(this.id);
    this.getVipUser(this.id);
    this.getUserInfo(this.id)
  },
};
</script>

<style lang="less" scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  position: absolute;
  left: 168px;
  top: 20px;
  font-size: 22px;
}
.textr {
  color: #666;
  font-size: 4px;
  cursor: pointer;
  font-weight: 300;
}
.active {
  color: #ff416c;
}

.pp {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.card-headerC {
  border-left: 3px solid #ff416c;
  height: 20px;
  padding-left: 1rem;
  margin-bottom: 15px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.iconsex1 {
  position: absolute;
  left: 170px;
  bottom: 24px;
  font-size: 12px;
  color: rgba(63, 63, 254, 0.696);
}
.iconsex2 {
  position: absolute;
  left: 170px;
  bottom: 24px;
  font-size: 12px;
  color: rgba(255, 2, 112, 0.838);
}
.iconLV{
  width: 24px;
  height: 24px;
  color: #ff416c;
  position: absolute;
  left: 88px;
  bottom: 42px;
  font-size: 24px;
}
.center {
  background-color: #ffffff;
  -webkit-box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
  box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);

  flex: 1;
  background: #fff;
  position: relative;
  margin-top: 40px;
  margin-right: 20px;
  border-radius: 5px;
  padding: 15px;
}
.personal-wrap {
  .bg {
    background: url("../assets/images/bg.jpg");
    width: 180%;
    height: 450px;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    margin-left: -50%;
  }
}
.personal-main {
  display: flex;
  align-items: flex-start;
  max-width: 1200px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}
.letf {
  width: 340px;
  position: relative;
  // top: -60px;
  margin-top: 40px;
  flex-shrink: 0;
}
.user-box {
  background: rgb(194, 16, 16);
  border-radius: 5px;
  padding-bottom: 30px;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
  box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
}
.background {
  width: 100%;
  height: 140px;
  position: relative;
  border-radius: 5px 5px 0 0;
  background-size: cover;
  background-position: center;
}
.background ::before {
  border-radius: 5px 5px 0 0;
}
.card {
  margin-top: -20px;
  padding: 0 15px 0 30px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.avatar {
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  z-index: 2;
  position: relative;
}
img {
  width: 64px;
  height: 64px;
  border-radius: 3px;
}
.info {
  width: 100%;
  padding-top: 20px;
  margin-left: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.name {
  font-weight: 600;
  font-size: 16px;
}
.sign-btn {
  padding: 3px 15px;
  font-size: 12px;
  color: #fff;
  border-radius: 30px;
  background: #fa2800;
  cursor: pointer;
  border: 1px solid #fa2800;
}
.sign-btn-active {
  background: #fa2800;
  cursor: pointer;
  border: 1px solid #fa2800;
}
.desc {
  padding: 0 40px;
  font-size: 13px;
  margin-top: 10px;
  color: #666;
}
.profile {
  padding: 0 40px;
  margin-top: 10px;
  position: relative;
}
.tag {
  position: relative;
  font-size: 13px;
  padding-left: 15px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.lv-icon {
  font-size: 22px;
  position: relative;
  top: 1px;
}
span {
  font-size: 13px;
}
.tag ::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #fa2800;
  position: absolute;
  top: 50%;
  left: 0px;
  margin-top: -3px;
}
.flex-shrink {
  flex-shrink: 0;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.follow {
  list-style: none;
  display: flex;
  margin: 0 30px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #f9f9ff;
  li {
    width: 33%;
    text-align: center;
    font-size: 14px;
    color: #958ebb;
    span {
      display: block;
    }
  }
}

.foot {
  width: 100%;
  padding: 0 30px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    display: block;
    width: 50%;
    text-align: center;
    margin: 0 3% 10px 3%;
    padding: 10px 0;
    background: #ff416c;
    background: linear-gradient(to right, #ff4b2b, #ff416c);
    color: #fff;
    border-radius: 5px;
    font-size: 14px;
    text-decoration: none;
  }
}
.my {
  padding-bottom: 5px;
}
.module {
  padding: 15px;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 20px;
}
.shadow {
  background-color: #ffffff;
  -webkit-box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
  box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
}
.card-header {
  border-left: 3px solid #ff416c;
  height: 20px;
  padding-left: 1rem;
  margin-bottom: 15px;
  font-weight: bold;
}
.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.module1 {
  padding: 15px;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 20px;
  margin-top: 20px;
}
.work {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.vipimg {
  width: 75px;
  height: 25px;
}
.shu {
  font-weight: 300;
  cursor: pointer;
}
</style>

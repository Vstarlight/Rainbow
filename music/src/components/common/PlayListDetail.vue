<template>
  <div class="playlist-detail">
    <div class="left">
      <div class="top">
        <div class="avatar">
          <img :src="datail.coverImgUrl" alt="" class="avatarimg" />
        </div>
        <div class="info">
          <div class="title">
            <p>{{ datail.name }}</p>
            <div></div>
          </div>
          <div class="user">
            <div class="avatar2">
              <img
                :src="creator.avatarUrl"
                alt=""
                class="avatarimg2"
                @click="toUser(creator.userId)"
              />
            </div>
            <p class="nickname" @click="toUser(creator.userId)">
              {{ creator.nickname }}
            </p>
            <p class="createTime">{{ formatDate(datail.createTime) }}创建</p>
          </div>
          <div class="tag" v-if="this.tagsa.length > 0">
            <p>标签:</p>
            <a v-for="item of datail.tags" :key="item" @click="tag(item)">{{
              item
            }}</a>
          </div>
          <div class="desc">
            <p class="ellipsis-two" v-html="datail.description"></p>
            <span
              @click="drawer = true"
              class="asdasd"
              v-if="txtLength(datail.description) > 50"
            >
              全部<i class="el-icon-arrow-down el-icon--right"> </i>
            </span>
          </div>
        </div>
      </div>
      <div class="content">
        <play-list-detail-list
          :playRecordList="songs"
          :SongsId="SongsId - 0"
        ></play-list-detail-list>
      </div>
    </div>
    <div class="right">
      <div class="like">
        <div class="card-header">
          <span>喜欢这个歌单的人</span>
        </div>
        <ul v-if="subscribers.length > 0">
          <li v-for="item of subscribers" :key="item.userId">
            <div class="avatar3" @click="toUser(item.userId)">
              <img
                :src="item.avatarUrl"
                :alt="item.nickname"
                :title="item.nickname"
              />
            </div>
          </li>
        </ul>
      </div>
      <div class="related">
        <div class="card-header">
          <span>相关推荐</span>
        </div>
        <ul>
          <li
            v-for="item of relatedList"
            :key="item.id"
            @click="toDetail(item.id)"
          >
            <div class="avatar4">
              <img
                :src="item.coverImgUrl"
                :alt="item.nickname"
                :title="item.nickname"
              />
            </div>
            <div class="info">
              <h2 class="ellipsis" :title="item.name">{{ item.name }}</h2>
              <span>By.{{ item.creator.nickname }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="comment">
        <div class="card-header">
          <span>精彩评论</span>
        </div>
        <ul v-if="comments.length > 0">
          <li class="item" v-for="item of comments" :key="item.time">
            <div class="avatar5" @click="toUser(item.user.userId)">
              <img
                :src="item.user.avatarUrl"
                :alt="item.user.nickname"
                :title="item.user.nickname"
              />
            </div>
            <div class="info">
              <h2 @click="toUser(item.user.userId)">
                {{ item.user.nickname }}<small>· {{ formatMsgTime(item.time) }}</small>
              </h2>
              <p>{{ item.content }}</p>
            </div>
          </li>
        </ul>
        <p class="no-data-text" v-else style="padding-bottom: 10px">
          还没有人评论
        </p>
      </div>
    </div>

    <el-drawer
      :title="title"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      :size="size"
    >
      <div class="box">
        <span v-html="datail.description" class="slot_span"></span>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import PlayListDetailList from "../common/MyPlayList.vue";
export default {
  name: "PlayListDetail",
  components: {
    PlayListDetailList,
  },
  computed: {
    txtLength() {
      return function (txt) {
        if (txt) {
          return txt.length;
        }
      };
    },
  },
  data() {
    return {
      //弹窗相关
      size: "20%",
      title: null,
      xiangxi: null,
      drawer: false,
      direction: "rtl",

      //标签
      tagsa: [],
      //歌单详细
      datail: {},
      //歌单创建者信息
      creator: {},
      //歌曲列表
      songs: [],
      SongsId: null,
      //收藏歌单的人
      subscribers: [],

      //相关推荐
      relatedList: [],

      // 评论
      comments: [],
    };
  },
  methods: {
    //关闭侧边栏
    handleClose(done) {
      done();
    },
    //时间格式
    formatDate(date) {
      let d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    },
    //日期格式
    formatMsgTime(dateTimeStamp) {
      var result = "";
      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var month = day * 30;
      var now = new Date().getTime();
      var diffValue = now - dateTimeStamp;
      if (diffValue < 0) return;
      var monthC = diffValue / month;
      var weekC = diffValue / (7 * day);
      var dayC = diffValue / day;
      var hourC = diffValue / hour;
      var minC = diffValue / minute;
      if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前";
      } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
      } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
      } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
      } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
      } else {
        result = "刚刚";
      }
      return result;
    },
    //用户详细
    toUser(id) {
      this.$router.push({path:`/user`,query:{id:id}})
    },
    toDetail(id){
        this.$router.push({path:`/play-list-detail/${id}`})
      location.reload();
    },
    //标签跳转
    tga(item) {
      console.log(item);
    },
    //获取歌单详情
    async getPlayListDetail(id, s) {
      let timestamp = new Date().valueOf();
      try {
        let res = await this.$api.getPlayListDetail(id, s, timestamp);
        if (res.data.code === 200) {
          if (res.data.playlist.description !== null) {
            res.data.playlist.description =
              res.data.playlist.description.replace(/(\r\n|\n|\r)/gm, "<br />");
          }
          this.datail = res.data.playlist;
          this.title = res.data.playlist.name;
          this.xiangxi = res.data.playlist.description;
          this.creator = res.data.playlist.creator;
          this.tagsa = res.data.playlist.tags;
          res.data.playlist.tracks.forEach((item) => {
            let obj = {};
            obj.id = item.id;
            obj.song = item.name;
            obj.singer = item.ar.map((singer) => singer.name).join("/");
            obj.singers = item.ar.map((singer) => singer.name).join("/");
            obj.album = item.al.name;
            obj.picUrl = item.al.picUrl;
            obj.tiem = item.dt;
            obj.error = false;
            this.songs.push(obj);
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    //获取歌单收藏的人
    async getSongsLikeList(id) {
      try {
        let res = await this.$api.getSongsLikeList(id);
        if (res.data.code === 200) {
          this.subscribers = res.data.subscribers;
        }
      } catch (error) {
        console.log(error);
      }
    },

    //相关推荐
    async getRelatedPlaylist(id) {
      try {
        let res = await this.$api.getRelatedPlaylist(id);
        if (res.data.code === 200) {
          this.relatedList = res.data.playlists;
        }
      } catch (error) {
        console.log(error);
      }
    },

    //获取精彩评论
    async getCommentPlaylist(id) {
      try {
        let res = await this.$api.getCommentPlaylist(id);
        if (res.data.code === 200) {
          if (res.data.hotComments.length > 0) {
            this.comments = res.data.hotComments;
          } else {
            this.comments = res.data.comments;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    Allget(id) {
      this.getPlayListDetail(id, 100);
      this.getSongsLikeList(id);
      this.getRelatedPlaylist(id);
      this.getCommentPlaylist(id);
    },
  },
  created() {
    let id = this.$route.path.substring(18);
    this.SongsId = id;
    this.Allget(id);
  },
};
</script>

<style scoped lang="less">
#el-drawer__header {
  font-size: 20px !important;
}
.box {
  padding: 20px !important;
}
.slot_span {
  font-size: 16px;
  letter-spacing: 3px;
}
.playlist-detail {
  display: flex;
  align-items: flex-start;
  margin-right: auto;
  margin-left: auto;
  max-width: 1200px;
  width: 100%;
  padding-top: 80px;
  padding-left: 0% !important;
  padding-right: 0% !important;
}
.left {
  flex: 1;
  width: 950px;
  padding: 15px;
  border-radius: 8px;
  margin-right: 20px;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
  box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
}
.top {
  display: flex;
}
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 8px;
  position: relative;
  margin-right: 30px;
  flex-shrink: 0;
}
.avatar::before {
  content: "";
  width: 95%;
  height: 95%;
  background: rgba(0, 0, 0, 0.2);
  display: block;
  position: absolute;
  top: 15px;
  right: -5px;
  z-index: 0;
  border-radius: 8px;
}
.avatarimg {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  position: relative;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  width: 100%;
  font-size: 24px !important;
  font-weight: 700;
  line-height: 24px;
  margin-bottom: 20px;
  margin-top: 10px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #4a4a4a;
}
.user {
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.avatar2 {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  margin-right: 15px;
  cursor: pointer;
}
.avatarimg2 {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
}
.nickname {
  font-size: 14px;
  margin-right: 30px;
  cursor: pointer;
}
.nickname:hover {
  color: #fa2800;
}
.createTime {
  font-size: 14px;
  color: #808080;
}
.tag {
  display: flex;
  flex-direction: row;
  align-items: center;
  a {
    color: #fff;
    background: #fa2800;
    margin-right: 15px;
    font-size: 12px;
    cursor: pointer;
    padding: 4px 12px;
    border-radius: 15px;
  }
  p {
    color: #4a4a4a;
  }
}
.desc {
  display: flex;
  flex-direction: column;
  line-height: 1.6;
  margin-top: 15px;
  span {
    flex-shrink: 0;
    color: #fa2800;
    cursor: pointer;
  }
  p {
    line-height: 1.6;
    font-weight: 400;
    flex: 1;
    font-size: 14px;
  }
}
.ellipsis-two {
  overflow: hidden;
  text-overflow: ellipsis; /* 超出部分省略号 */
  word-break: break-all; /* break-all(允许在单词内换行。) */
  display: -webkit-box; /* 对象作为伸缩盒子模型显示 */
  -webkit-box-orient: vertical; /* 设置或检索伸缩盒对象的子元素的排列方式 */
  -webkit-line-clamp: 2; /* 显示的行数 */
  max-height: 80rpx;
}
.content {
  margin-top: 20px;
}
.right {
  width: 350px;
  flex-shrink: 0;
}
.like {
  background-color: #ffffff;
  -webkit-box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
  box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
  padding-bottom: 5px;
  padding: 15px;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 20px;
  ul {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -5px;
    li {
      list-style: none;
      flex: 0 0 14.285714285714%;
      max-width: 14.285714285714%;
      padding: 0 5px 10px;
      .avatar3 {
        width: 100%;
        border-radius: 3px;
        img {
          width: 100%;
          border-radius: 3px;
          cursor: pointer;
        }
      }
    }
  }
}
.card-header {
  border-left: 3px solid #fa2800;
  height: 20px;
  padding-left: 1rem;
  margin-bottom: 15px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.related {
  padding-bottom: 5px;
  padding: 15px;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
  box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
  ul {
    li {
      list-style: none;
      display: flex;
      margin-bottom: 15px;
      cursor: pointer;
      .avatar4 {
        width: 50px;
        height: 50px;
        border-radius: 3px;
        margin-right: 15px;
        flex-shrink: 0;
        img {
          width: 100%;
          border-radius: 3px;
        }
      }
      .info {
        height: 50px;
        width: calc(100% - 60px);
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        h2 {
          font-size: 14px;
          margin-bottom: 10px;
          width: 100%;
        }
        span {
          font-size: 12px;
          color: #a5a5c1;
        }
      }
      .info:hover {
        h2 {
          color: #fa2800;
        }
      }
    }
  }
}
.comment {
  padding-bottom: 5px;
  padding: 15px;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
  box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
  ul {
    li {
      list-style: none;
      padding: 10px 0;
      width: 100%;
      display: flex;
      .avatar5 {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        margin-right: 12px;
        flex-shrink: 0;
        cursor: pointer;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .info {
        flex: 1;
        h2 {
          font-size: 15px;
          margin-right: 5px;
          margin-bottom: 10px;
          cursor: pointer;
          small {
            font-size: 12px;
            color: #a5a5c1;
            font-weight: 200;
          }
        }
        p {
          width: 100%;
          font-size: 12px;
          color: #666666;
          line-height: 1.6;
          padding: 5px 10px;
          background: #f5f5f5;
          margin-top: 5px;
          border-radius: 3px;
        }
      }
    }
  }
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<template>
  <div class="mv-datail">
    <div class="left">
      <div class="video-container">
        <video :src="URL" controls="controls" autoplay></video>
      </div>
      <div class="video-foot">
        <h2 class="title">
          <i class="iconfont icon-MV" v-if="this.IDsiaz < 12"></i>
          {{ MVdata.name || MVdata.title }}
        </h2>
        <div class="tag">
          <a v-for="item of MVdata.videoGroup" :key="item.id"
            >#{{ item.name }}</a
          >
        </div>
        <p class="flex-row">
          <span>发布:{{ formatDate(MVdata.publishTime) }}</span>
          <span
            >播放次数:{{
              formatNumber(MVdata.playCount || MVdata.playTime)
            }}</span
          >
        </p>
        <div class="follow">
          <div class="box">
            <i class="iconfont icon-xihuan"></i>
            {{ Info.likedCount }}
          </div>
          <div class="box">
            <i class="iconfont icon-shoucang"></i>
            {{ MVdata.subCount || MVdata.subscribeCount }}
          </div>
          <div class="box">
            <i class="iconfont icon-fenxiang"></i>
            {{ Info.shareCount }}
          </div>
        </div>
      </div>
      <div class="comments">
        <div class="titlea">
          <i class="iconfont icon-pinglun"></i>Comments |
          <span class="noticom">
            <a>{{ Info.commentCount }}条评论</a>
          </span>
        </div>
        <box
          :currentCommentId="currentCommentId"
          :clearContent="clearContent"
          @commentSubmit="commentSubmit"
          v-if="currentCommentId == ''"
        ></box>
        <list
          title="精彩评论"
          :comments="hotComments"
          :currentCommentId="currentCommentId"
          @commentSubmit="commentSubmit"
          @commentHandle="commentHandle"
          @cancelComment="cancelComment"
          @commentLike="commentLike"
          v-if="hotComments.length > 0"
        ></list
        ><!-- 精彩评论 -->
        <list
          title="最新评论"
          :comments="comments"
          :currentCommentId="currentCommentId"
          @commentSubmit="commentSubmit"
          @commentHandle="commentHandle"
          @cancelComment="cancelComment"
          @commentLike="commentLike"
          v-if="comments.length > 0"
        ></list
        ><!-- 最新评论 -->
        <div class="page-warp">
          <el-pagination
            :page-size="limit"
            background
            hide-on-single-page
            layout="total, prev, pager, next"
            :total="commentTotal"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="profile">
        <div class="card-header">
          <span>视频简介</span>
        </div>
        <div class="content">
          <p v-if="MVdata.desc">{{ MVdata.desc }}</p>
          <p v-else>视频暂无简介</p>
        </div>
      </div>
      <div class="related">
        <div class="card-header">
          <span>相关推荐</span>
        </div>
        <ul>
          <li v-for="item of XXVido" :key="item.id">
            <div class="avatar">
              <img
                :src="item.cover || item.coverUrl"
                :alt="item.name || item.title"
                :title="item.name || item.title"
              />
              <div class="action">
                <button class="play" @click="tobf(item.id || item.vid)">
                  <i class="iconfont iconbofang2"></i>
                </button>
              </div>
            </div>
            <div class="info">
              <p class="flex-row">
                <i class="iconfont icon-MV a"></i>{{ item.name || item.title }}
              </p>
              <div class="author" v-if="IDsiaz < 12">
                By.<span v-for="author of item.artists" :key="author.id"
                  ><small> {{ author.name }}</small></span
                >
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import box from "../common/MvPLbox.vue";
import list from "../common/MvPLlist.vue";
export default {
  name: "mvdetail",
  components: {
    box,
    list,
  },
  data() {
    return {
      id: null,
      IDsiaz: null,
      MVdata: {},
      URL: null,
      Info: {},
      currentCommentId: "",
      // 是否清空评论框内容
      clearContent: false,
      limit: 20,
      offset: 0,
      comments: [], //评论
      hotComments: [], //热门评论
      XXVido: [], //相关视频
      currentPage: 0,
      commentTotal: 0,
    };
  },
  methods: {
    //格式化
    formatNumber(playCount) {
      if (parseInt(playCount / 100000000) >= 1) {
        return parseInt(playCount / 100000000) + "亿";
      } else if (playCount > 10000) {
        return parseInt(playCount / 10000) + "万";
      } else {
        return parseInt(playCount);
      }
    },
    formatDate(date) {
      let d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    },
    //初始化请求
    ALLget(id) {
      this.getMvData(id);
      this.getMVURL(id);
      this.getMvDetailInfo(id);
      this.getPL(id);
      this.getXXVido(id);
    },

    //获取MV/视频信息
    async getMvData(id) {
      try {
        if (this.IDsiaz > 12) {
          let res = await this.$api.getVidoData(id);
          if (res.data.code === 200) {
            this.MVdata = res.data.data;
          }
        } else {
          let res = await this.$api.getMvData(id);
          if (res.data.code === 200) {
            this.MVdata = res.data.data;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    //获取MV/视频URL
    async getMVURL(id) {
      try {
        if (this.IDsiaz > 12) {
          let res = await this.$api.getVideoUrl(id);
          if (res.data.code === 200) {
            this.URL = res.data.urls[0].url;
          }
        } else {
          let res = await this.$api.getMvUrl(id);
          if (res.data.code === 200) {
            this.URL = res.data.data.url;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    //获取一键三连数据
    async getMvDetailInfo(id) {
      try {
        if (this.IDsiaz > 12) {
          let res = await this.$api.getVidoInfo(id);
          if (res.data.code === 200) {
            this.Info = res.data;
          }
        } else {
          let res = await this.$api.getMvDetailInfo(id);
          if (res.data.code === 200) {
            this.Info = res.data;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    //提交评论
    commentSubmit(content) {
      if (!content) {
        this.$message.error("什么都没写，你点毛");
        return;
      } else {
        let timestamp = new Date().getTime();
        let params = { id: this.id, content: content, timestamp };
        if (this.IDsiaz > 12) {
          params.type = 5;
        } else {
          params.type = 1;
        }
        if (this.currentCommentId == "") {
          params.t = 1;
        } else {
          params.t = 2;
          params.commentId = this.currentCommentId;
        }
        this.$api
          .sendComment(params)
          .then((res) => {
            if (res.data.code === 200) {
              this.$message.success("提交成功");
              this.cancelComment();
              this.clearContent = true;
              /*获取mv或者viode评论*/
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    //取消评论
    cancelComment() {
      this.currentCommentId = "";
    },

    //获取评论
    async getPL(id) {
      let timestamp = new Date().getTime();
      let params = { id, limit: this.limit, offset: this.offset, timestamp };
      try {
        if (this.IDsiaz > 12) {
          let res = await this.$api.getVidoComments(params);
          if (res.data.code === 200) {
            this.comments = res.data.comments;
            this.hotComments = res.data.hotComments;
          }
        } else {
          let res = await this.$api.getMvComments(params);
          if (res.data.code === 200) {
            console.log(res.data);
            this.comments = res.data.comments;
            this.hotComments = res.data.hotComments;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    //点击评论
    commentHandle(id) {
      this.currentCommentId = id;
    },

    //评论点赞
    async commentLike(id, dz) {
      console.log(dz);
      let timestamp = new Date().getTime();
      let params = {
        id: this.id,
        cid: id,
        timestamp,
      };
      if (this.IDsiaz > 12) {
        params.type = 5;
      } else {
        params.type = 1;
      }
      if (!dz) {
        params.t = 1;
      } else {
        params.t = 2;
      }
      try {
        let res = await this.$api.likeComment(params);
        if (res.data.code === 200) {
          this.getPL(this.id);
        }
      } catch (error) {
        console.log(error);
      }
    },

    //相关视频
    async getXXVido(id) {
      try {
        if (this.IDsiaz > 12) {
          let res = await this.$api.getXXVidoV(id);
          if (res.data.code === 200) {
            this.XXVido = res.data.data;
          }
        } else {
          let res = await this.$api.getXXVido(id);
          if (res.data.code === 200) {
            this.XXVido = res.data.mvs;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    tobf(id) {
      this.$router.push({
        path: `/mv-detail`,
        query: {
          id,
        },
      });
      location.reload();
    },
    // 改变页码
    handleSizeChange(val) {
      this.limit = val;
      this.offset = this.limit * this.currentPage;
      this.getPL(this.id);
    },
    // 改变页码
    handleCurrentChange(val) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getPL(this.id);
    },
  },
  created() {
    this.id = this.$route.query.id;
    this.IDsiaz = this.$route.query.id.length;
    this.ALLget(this.id);
  },
};
</script>

<style lang="less" scoped>
.page-warp {
  margin-top: 20px;
}
.mv-datail {
  display: flex;
  max-width: 1400px;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-left: 0% !important;
  padding-right: 0% !important;
  .left {
    flex: 1;
    width: 950px;
    padding: 15px;
    border-radius: 8px;
    margin-right: 20px;
    margin-top: 105px;
    background-color: #ffffff;
    -webkit-box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
    box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
    .title {
      color: #000;
      font-size: 15px;
      margin-bottom: 10px;
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      i {
        font-size: 18px;
        margin-top: 1px;
        margin-left: 3px;
        margin-right: 4px;
        color: #fa2800;
      }
    }
    .video-container {
      position: relative;
      padding-top: 56.25%;
      video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
      }
    }
    .video-foot {
      margin-top: 8px;
      .tag {
        margin-bottom: 8px;
        a {
          font-size: 12px;
          color: #fa2800;
          margin-right: 10px;
          cursor: pointer;
        }
      }
      .flex-row {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      p {
        span {
          margin-right: 30px;
          font-size: 12px;
          color: #999;
        }
      }
      .follow {
        display: flex;
        margin-top: 10px;
        .box {
          width: auto;
          height: 26px;
          border-radius: 15px;
          padding: 0px 15px;
          background: #f2f2f2;
          margin-right: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #161e27;
          cursor: pointer;
          font-size: 14px;
          i {
            font-size: 14px;
            color: #161e27;
            padding-right: 4px;
          }
          &.active {
            color: #fff;
            background: #fa2800;
            .icon-like {
              color: #fff;
            }
          }
        }
      }
    }
    .comments {
      margin-top: 25px;
      .titlea {
        width: 100%;
        height: 50px;
        border-radius: 3px;
        padding: 0 3px;
        font-size: 12px;
        border-bottom: 1px solid #f1f1f1;
        i {
          color: #666;
          font-size: 14px;
          margin-right: 6px;
          margin-top: 2px;
        }
        span {
          margin-left: -5px;
        }
      }
    }
  }
  .right {
    width: 350px;
    flex-shrink: 0;
    margin-top: 105px;
    .profile {
      padding: 15px;
      width: 100%;
      border-radius: 8px;
      margin-bottom: 20px;
      background-color: #ffffff;
      -webkit-box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
      box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
      .card-header {
        border-left: 3px solid rgb(243, 7, 7);
        height: 20px;
        padding-left: 1rem;
        margin-bottom: 15px;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }
    .related {
      padding-bottom: 5px;
      background-color: #ffffff;
      -webkit-box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
      box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
      padding: 15px;
      width: 100%;
      border-radius: 8px;
      margin-bottom: 20px;
      .card-header {
        border-left: 3px solid rgb(243, 7, 7);
        height: 20px;
        padding-left: 1rem;
        margin-bottom: 15px;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      ul {
        li {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
          .avatar {
            width: 100%;
            margin-right: 15px;
            flex-shrink: 0;
            position: relative;
            img {
              width: 100%;
            }
            .action {
              display: none;
              position: absolute;
              top: 50%;
              left: 50%;
              -webkit-transform: translate(-50%, -50%);
              -ms-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
              .play {
                width: 32px;
                height: 32px;
                padding: 0;
                border: none;
                border-radius: 50%;
                color: #fff;
                cursor: pointer;
                background-color: #fa2800;
                display: flex;
                justify-content: center;
                align-items: center;
                i {
                  font-size: 12px;
                }
              }
            }
            .info {
              height: 50px;
              width: calc(100% - 50px);
              flex: 1;
              display: flex;
              justify-content: center;
              flex-direction: column;
              .flex-row {
                font-size: 14px !important;
                margin-bottom: 3px;
                margin-top: 5px;
                width: 100%;
                min-height: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .author {
                font-size: 12px;
                color: #a5a5c1;
                span {
                  font-size: 12px;
                  color: #a5a5c1;
                  &::after {
                    content: "/";
                    margin-left: 5px;
                  }
                  &:last-child {
                    &::after {
                      content: "";
                    }
                  }
                }
              }
            }
          }
          &:hover {
            .action {
              display: flex !important;
            }
          }
        }
      }
    }
  }
}
.icon-MV:before {
  font-size: 18px;
  color: #fa2800;
}
</style>
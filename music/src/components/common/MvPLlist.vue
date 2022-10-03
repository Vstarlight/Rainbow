<template>
  <div class="comment-list">
    <h3>{{ title }}</h3>
    <ul>
      <li class="item" v-for="item of comments" :key="item.commentId">
        <div class="avatar">
          <img
            :src="item.user.avatarUrl"
            :alt="item.user.nickname"
            :title="item.user.nickname"
          />
        </div>
        <div class="info">
          <h2 class="a">
            <span
              >{{ item.user.nickname }} <small>·{{formatDate(item.time)  }}</small></span
            >
            <div class="tool">
              <i
                class="iconfont icon-31dianzan"
                @click="commentLike(item.commentId, item.liked)"
                :class="item.liked ? 'active' : ''"
              ></i>

              <span>({{ item.likedCount }})</span>
              <i
                class="iconfont icon-pinglun"
                @click="commentHandle(item.commentId)"
              ></i>
            </div>
          </h2>
          <div class="content">
            {{ item.content }}
            <div
              class="beReqlied"
              v-for="subItem of item.beReplied"
              :key="subItem.beRepliedCommentId"
            >
              <small> @{{ subItem.user.nickname }}</small
              >：{{ subItem.content }}
            </div>
          </div>
          <box
            @cancelComment="cancelComment"
            @commentSubmit="commentSubmit"
            v-if="item.commentId == currentCommentId"
          ></box>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import box from "../common/MvPLbox.vue";
export default {
  name: "MvPLlist",
  components: {
    box,
  },
  props: {
    comments: {
      type: Array,
    },
    currentCommentId: {
      type: [String, Number],
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      commentContent: "",
    };
  },
  methods: {
    formatDate(date) {
      let d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    },
    // 点击评论
    commentHandle(id) {
      this.$emit("commentHandle", id);
    },
    // 提交评论
    commentSubmit(content) {
      this.$emit("commentSubmit", content);
    },
    // 评论点赞
    commentLike(id, liked) {
      this.$emit("commentLike", id, liked);
    },
    // 取消评论
    cancelComment() {
      this.$emit("cancelComment");
    },
  },
};
</script>

<style style lang="less" scoped>
.comment-list {
  margin-top: 20px;
  h3 {
    margin-bottom: 15px;
    font-size: 16px;
  }
  ul {
    li {
      list-style: none;
      padding: 10px 0;
      width: 100%;
      display: flex;
      .avatar {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        margin-right: 12px;
        flex-shrink: 0;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .info {
        flex: 1;
        .a {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        h2 {
          font-size: 15px;
          margin-right: 5px;
          margin-bottom: 10px;
          small {
            font-size: 12px;
            color: #a5a5c1;
            font-weight: 200;
          }
          .tool {
            display: flex;
            flex-direction: row;
            align-items: center;
            i {
              font-size: 18px;
              font-weight: 100;
              margin-left: 20px;
              cursor: pointer;
              transition: all 0.4s;
              &.icon-31dianzan {
                &.active {
                  color: rgb(233, 17, 17);
                }
              }
            }
            span {
              font-size: 12px;
              margin-top: 2px;
              color: #666;
              font-weight: 200;
              position: relative;
              &::after {
                content: "";
                width: 1px;
                height: 13px;
                background: #4a4a4a;
                opacity: 0.7;
                position: absolute;
                top: 2px;
                right: -12px;
              }
            }
          }
        }
        .content {
          width: 100%;
          font-size: 12px;
          color: #4a4a4a;
          line-height: 1.6;
          padding: 8px 10px;
          background: #f5f5f5;
          margin-top: 5px;
          border-radius: 3px;
          .beReqlied {
            margin-top: 10px;
            background: #ffffff;
            padding: 8px 10px;
            border-radius: 3px;
            color: #666666;
            small {
              color: #ca0c0c;
            }
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="comment-box">
    <p class="flex-row">
      <span>
        <i class="iconfont icon-jurassic_user"></i>
        {{ profile.nickname }},你好
      </span>
      <button  class="cancel-comment" @click="cancelComment" v-if="currentCommentId !=''">取消回复</button>
    </p>
    <div class="comment-form">
      <div class="avatar">
        <img :src="profile.avatarUrl" :title="profile.nickname" />
      </div>
      <div class="comarea">
        <textarea
          name="comment"
          placeholder="你看什么看！"
          cols="50"
          rows="5"
          tabindex="4"
          v-model="commentContent"
        ></textarea>
      </div>
    </div>
    <div class="comment-foot">
      <div class="smile"></div>
      <button class="comment-btn" @click="commentSubmit">评论</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MvPLbox",
  props:{
    currentCommentId: {
      type: [String, Number]
    },
    clearContent: {
      type: Boolean
    }
  },
  data() {
    return {
      //评论内容
      commentContent: "",
    };
  },
  methods: {
    commentSubmit(){
        this.$emit('commentSubmit',this.commentContent)
        this.commentContent=''
    },
    cancelComment(){
        this.$emit('cancelComment')
    }
  },
  computed: {
    ...mapGetters(["profile"]),
  },
};
</script>

<style lang="less" scoped>
.comment-box {
  margin-top: 20px;
  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  p {
    i {
      margin-right: 10px;
    }
    span {
      flex: 1;
    }
    .cancel-comment {
      color: #d9dfff;
      font-size: 12px;
      background: none;
      padding: 6px 10px;
      border-radius: 2px;
      border: 1px solid #dee3ff;
      cursor: pointer;
    }
  }
  .comment-form {
    display: flex;
    margin-top: 1.5em;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 3px;
      margin-right: 20px;
      position: relative;
      flex-shrink: 0;
      img {
        width: 100%;
        border-radius: 3px;
      }
    }
    .comarea {
      flex: 1;
      textarea {
        width: 100%;
        outline: none;
        background: #f8f9ff;
        resize: none;
        padding: 6px 12px;
        color: #666;
        border: 1px solid #eaebff;
        border-radius: 3px;
        font-size: 13px;
        height: 80px;
      }
    }
  }
}
.comment-foot {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .comment-btn {
    color: #fff;
    padding: 10px 30px;
    font-size: 0.75rem;
    border-radius: 3px;
    border: none;
    cursor: pointer;
    outline: none;
    background: #FF416C;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #FF4B2B, #FF416C); 
    transition: all 0.15s ease-in-out;
    -moz-transition: all 0.15s ease-in-out;
    -webkit-transition: all 0.15s ease-in-out;
    -o-transition: all 0.15s ease-in-out;/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
}
</style>
<template>
  <div class="login-warp">
    <div class="login-box">
      <img src="../assets/images/rbox.png" class="nice-logo" />
      <p class="vuemu">RainbowMUSIC</p>
      <div class="logo-form">
        <el-form :rules="rules" :model="User" ref="User">
          <div class="login-input">
            <el-form-item prop="phone">
              <el-input
                class="login-text"
                type="text"
                v-model="User.phone"
                placeholder="请输入手机号"
              >
              </el-input>
              <span>
                <img
                  src="../assets/images/erweima.png"
                  class="erweima"
                  @mouseenter="erweima()"
                />
                <div class="Mabox">
                  <img :src="this.qrimg" alt="" class="maimg" />
                  <p class="maP1">请使用网易云客户端</p>
                  <p class="maP2">扫码登录</p>
                </div>
                <div class="sanjiao"></div>
              </span>
              <span class="linea"></span>
              <span class="time60" v-show="this.isShow">{{ num }}s后重试</span>
              <span class="textYY" @click="getYanZheng" v-show="this.isyanzheng"
                >获取验证码</span
              >
              <span class="login-focus"></span>
              <span class="login-symbol">
                <i class="el-icon-phone"></i>
              </span>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                class="login-text"
                type="text"
                v-model="User.password"
                placeholder="请输验证码或密码"
                ref="yanzhengma"
                :show-password="this.showPassword"
              ></el-input>
              <span class="login-focus"></span>
              <span class="login-symbol">
                <i class="el-icon-lock"></i>
              </span>
            </el-form-item>
          </div>
          <div class="logo-input"></div>
          <div class="login-footer">
            <div class="login-btn-warp">
              <el-button class="login-btn" type="primary" @click="getUser()"
                >登录</el-button
              >
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <vue-particles
        class="login-bg"
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      >
      </vue-particles>
  </div>

</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "login",
  data() {
    const PhoneRules = (rule, value, callback) => {
      console.log(value);
      const pattern = /^((0\d{2,3}-\d{7,8})|(1[3576849]\d{9}))$/;
      if (value !== "") {
        if (!pattern.test(value)) {
          this.$message.error("你的手机号没有输入正确！！！");
        } else {
          callback();
        }
      } else {
        this.$message.error("请输入电话");
      }
    };
    return {
      User: {
        phone: "18582482878",
        password: "",
      },
      rules: {
        phone: [
          {
            required: true,
            message: "手机号都没有！！！",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "验证码或密码呢！", trigger: "blur" },
        ],
      },
      isShow: false,
      isyanzheng: true,
      num: 60,
      Makey: null,
      qrimg: null,
      isShowMabox: false,
      code: null,
      cookie: null,
      isLogin: false,
      showPassword: false,
      PassWordLengh: 0,
    };
  },
  methods: {
    ...mapMutations(["setProfile", "isLogino"]),
    getUser() {
      if (this.$refs.yanzhengma.value === "") {
        this.$message.error("你怎么可以什么都不输入呢~😢");
      } else if (this.User.password.length === 4) {
        this.$api
          .login(this.User.phone, this.User.password)
          .then((res) => {
            if (res.data.code === 400) {
              this.$message.error("你的手机号或者验证码输入错误呀~😢");
            } else if (res.data.code === 200) {
              this.isLogin = true;
              this.isLogino(true);
              this.setProfile(res.data.profile);
              window.localStorage.setItem("cookie", res.data.cookie);
              window.localStorage.setItem("token", res.data.token);
              window.localStorage.setItem("profile", JSON.stringify(res.data.profile));
              this.$message.success("登陆成功");
              this.$router.push(`/home`);
            }
          })
          .catch((err) => {
            this.$message.info("服务器似乎出现了问题");
            console.log(err);
          });
      } else if (this.User.password.length > 4) {
        this.$api
          .loginn(this.User.phone, this.User.password)
          .then((res) => {
            if (res.data.code === 400) {
              this.$message.error("你的手机号或者密码输入错误呀~😢");
            } else if (res.data.code === 200) {
              this.isLogin = true;
              this.isLogino(true);
              this.setProfile(res.data.profile);
              window.localStorage.setItem("cookie", res.data.cookie);
              window.localStorage.setItem("token", res.data.token);
              window.localStorage.setItem("profile",  JSON.stringify(res.data.profile));
              this.$message.success("登陆成功");
              this.$router.push(`/home`);
            }
          })
          .catch((err) => {
            this.$message.info("服务器似乎出现了问题");
            console.log(err);
          });
      }
    },
    getYanZheng() {
      this.isShow = true;
      this.isyanzheng = false;
      this.num = 60;
      //验证手机号
      if (!this.User.phone) {
        this.$message.error("请填写手机号后获取验证码！");
      } else if (/^1(3|4|5|6|7|8)\d{9}$/.test(this.User.phone) == false) {
        this.$message.error("请填写正确的手机号后获取验证码！");
      } else {
        //获取验证码
        this.$api.yanzheng(this.User.phone);
      }
      //冷却60秒
      setInterval(() => {
        if (this.num > 0) {
          this.num--;
        } else {
          (this.isShow = false), (this.isyanzheng = true);
        }
      }, 1000);
    },
    erweima() {
      this.isShowMabox = true;
    },
    async getMaKey() {
      let timestamp = new Date().getTime();
      let res = await this.$api.getmaKey(timestamp);
      if (res.data.code === 200) {
        this.Makey = res.data.data.unikey;
      } else if (res.data.code === 400) {
        this.$message.error("亲😙某种神秘力量禁止了二维登入哦~");
      }
    },
    async getMAIMG() {
      let timestamp = new Date().getTime();
      await this.$api.getMaIMG(this.Makey, timestamp).then((res) => {
        if (res.data.code === 200) {
          console.log(res.data.data);
          this.qrimg = res.data.data.qrimg;
        } else if (res.data.code !== 200) {
          this.$message.error("亲😙某种神秘力量禁止了二维登入哦~");
        }
      });
    },
    async getMalogin() {
      let timestamp = new Date().getTime();
      let res = await this.$api.getMalogin(this.Makey, timestamp);
      /*console.log(res.data);*/
      this.code = res.data.code;
      if (this.code === 800) {
        this.$message.error("哎呀二维码过期了呢😢刷新一下吧");
      } else if (this.code === 802) {
        this.$message.success("手机上点击确认哦~😘");
      } else if (this.code === 803) {
        this.$message.success("授权成功");
        console.log(res.data);
        this.cookie = res.data.cookie;
        window.localStorage.setItem("cookie", this.cookie);
        await this.$api.ApiGetMalogin(this.cookie).then((res) => {
          if (res.data.data.code === 200) {
            this.isLogin = true;
            this.isLogino(true);
            this.$message.success("登录成功");
            this.setProfile(res.data.data.profile);
            window.localStorage.setItem("profile",  JSON.stringify(res.data.data.profile));
            this.$router.push(`/home`);
          } else if (res.data.data.code !== 200) {
            this.$message.error("神秘力量阻止了你的登录😭");
          }
        });
      }
    },
  },
  created() {
    this.getMaKey();
    setTimeout(() => {
      this.getMAIMG();
    }, 2000);
    if (localStorage.getItem("token")) {
      return 
    }else{
      let tiem = setInterval(() => {
        this.getMalogin();
        if (this.code === 803 || this.isLogin) {
          clearInterval(tiem);
        }
      }, 3000);
    }
  },
  mounted () {
    if (localStorage.getItem("token")) {
      this.$router.push(`/home`);
    }
  },
  watch: {
    "User.password"(newold, olde) {
      if (newold.length === 5) {
        this.$message.warning("你输入的是密码，我已经自动给你隐藏啦~😁");
        this.showPassword = true;
      } else if (newold.length < 4) {
        this.showPassword = false;
      }
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.login-bg{
   width: 100%;
    height: 110%;
    position: absolute;
}
.login-warp {
  width: 100%;
  height: 100vh;
  background: #5dd5c8 url(../assets/images/newbg1.png);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.login-box {
  height: 486px;
  max-width: 350px;
  text-align: center;
  width: 350px;
  background: #fff;
  background-image: url(../assets/images/logbg.jpg);
  border-radius: 8px;
  margin: 4em auto;
  position: relative;
  box-shadow: 1px 2px 15px rgba(0, 0, 0, 0.3);
  background-repeat: no-repeat;
  background-position: bottom;
  z-index: 80;
}
.nice-logo {
  width: 150px;
  height: 140px;
}
.vuemu {
  margin-bottom: 15px;
  font-family:Arial,Helvetica,sans-serif;
  font-weight:bold ;
  background: linear-gradient(to right ,red ,rgb(195, 0, 255));
  -webkit-background-clip:text;
  color: transparent;
}
.logo-form {
  width: 296px;
  margin: 0 auto;
}
.login-input {
  position: relative;
  width: 100%;
  z-index: 1;
  margin-bottom: 10px;
}
.el-input__inner {
  font-size: 14px;
  line-height: 1.5;
  color: #666666;
  display: block;
  width: 100%;
  border: 0;
  height: 40px;
  padding: 0;
}
.login-text {
  font-size: 14px;
  line-height: 1.5;
  color: #666666;
  display: block;
  width: 100%;
  border: 1px solid #e3e7ed;
  height: 42px;
  border-radius: 3px;
  padding: 0 30px 0 45px;
}
.login-focus {
  display: block;
  position: absolute;
  border-radius: 3px;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 0px 0px;
  color: rgba(230, 230, 230, 0.8);
}
.login-symbol {
  font-size: 15px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-left: 15px;
  color: #666666;
  pointer-events: none;
}
.el-icon-phone {
  font-size: 22px;
  position: absolute;
  top: 10px;
  left: 12px;
}
.el-icon-lock {
  font-size: 22px;
  position: absolute;
  top: 10px;
  left: 12px;
}
.login-footer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 10px;
}
.login-btn-wrap {
  width: 100%;
  display: block;
  position: relative;
  z-index: 1;
  border-radius: 3px;
  overflow: hidden;
  margin: 0 auto;
}
.login-btn {
  font-size: 15px;
  line-height: 1.5;
  color: #fff;
  width: 100%;
  height: 42px;
  border-radius: 3px;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 134px;
  border-color: #5dd5c8;
  background: #5dd5c8;
}
.el-button--primary:active {
  border-color: #5dd5c8 !important;
  background: #5dd5c8 !important;
}
.el-button--primary:focus {
  border-color: #5dd5c8 !important;
  background: #5dd5c8 !important;
}
.el-button--primary:hover {
  border-color: #5dd5c8 !important;
  background: #5dd5c8 !important;
}
.linea {
  display: inline-block;
  width: 1px;
  height: 32px;
  background: #e7e7e7;
  position: absolute;
  top: 4px;
  right: 90px;
}
.textYY {
  font-size: 14px;
  color: #00a1d6;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 12px;
}
.time60 {
  font-size: 14px;
  position: absolute;
  top: 0px;
  right: 12px;
  color: #dddddd;
  cursor: not-allowed;
}
.erweima {
  top: 8px;
  position: absolute;
  right: 94px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.erweima:hover ~ .Mabox {
  height: 170px;
}
.erweima:hover ~ .sanjiao {
  height: 16px;
  width: 16px;
}
.maimg {
  width: 140px;
  height: 140px;
  overflow: hidden;
}
.Mabox {
  position: absolute;
  width: 150px;
  height: 0px;
  background-color: #fff;
  box-shadow: 1px 2px 15px rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  bottom: 45px;
  right: 30px;
  transition: all 1.2s;
  overflow: hidden;
  z-index: 11;
}
.sanjiao {
  width: 0px;
  height: 0px;
  background-color: #fff;
  transform: rotate(45deg);
  position: absolute;
  right: 98px;
  bottom: 36px;
  z-index: 2;
}
.maP1 {
  font-size: 6px;
  position: absolute;
  top: 120px;
  right: 22px;
}
.maP2 {
  font-size: 6px;
  position: absolute;
  top: 138px;
  right: 52px;
  z-index: 9;
}
</style>
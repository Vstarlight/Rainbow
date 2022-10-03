import Vue from 'vue'
import App from './App.vue'
import api from './http/index'
import store from './store'
import VueRouter from 'vue-router'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from "vue-lazyload";
import '@/assets/font/LV/iconfont.css'
import "@/assets/font/sexfont/iconfont.js"
import "@/assets/font/mvFont/iconfont.css"
import VueParticles from 'vue-particles'

import{
  Form,
  FormItem,
  Input,
  Icon,
  Button,
  Message,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Image,
  Slider,
  Pagination,
  Carousel,
  CarouselItem,
  Drawer
} from 'element-ui'
import 'swiper/css/swiper.css'


Vue.use(VueParticles)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Button)
Vue.use(VueRouter)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Image)
Vue.use(Pagination)
Vue.use(VueAwesomeSwiper)
Vue.use(Slider)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Drawer)
Vue.use(VueLazyload, {
  error: require("./assets/images/replace.png"),
  loading: require("./assets/images/replace.png")
})


Vue.prototype.$api=api
Vue.prototype.$message=Message


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')

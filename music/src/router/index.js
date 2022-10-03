import VueRouter from 'vue-router'
import home from '../components/home.vue'
import login from '@/components/login'
import search from '@/components/search'
import SearchSongs from '@/components/search/SearchSongs'
import SearchSings from '@/components/search/SearchSings'
import SearchAlbum from '@/components/search/SearchAlbum'
import SearchVideo from '@/components/search/SearchVideo'
import SearchPlayList from '@/components/search/SearchPlayList'
import SearchMv from '@/components/search/SearchMv.vue'
import rank from "@/components/rank.vue"
import HomeSongSheet from "@/components/HomeSongSheet.vue"
import singer from "@/components/singer"
import MV from "@/components/MV"
import Home_video from "@/components/Home_video"
import profile from "@/components/profile"
import PlayListDetail from "@/components/common/PlayListDetail.vue"
import SingsHome from "@/components/common/SingsHome.vue"
import mvdatail from "@/components/common/mvdetail.vue"
const routes = new VueRouter({
    routes: [
        {
            path:"/",
            redirect:"/login",
        },
        {
            path: '/login',
            component: login,
            name:"login"
        },
        {
            path: "/search/:keywords/songs",
            name: 'search',
            component: search,
            children: [
                { path: '/search/:keywords/songs', component: SearchSongs },
                { path: '/search/:keywords/sings', component: SearchSings },
                { path: '/search/:keywords/album', component: SearchAlbum },


                { path: '/search/:keywords/video', component: SearchVideo },
                { path: '/search/:keywords/play-list', component: SearchPlayList },
                { path: '/search/:keywords/mv', component: SearchMv },
            ]
        },
        {
            path: '/home',
            component: home, 
        },
        {
            path: "/rank",
            component: rank
        },
        {
            path: "/song_sheet",
            component: HomeSongSheet
        },
        {
            path: "/singer",
            component: singer
        },
        {
            path: "/mv",
            component: MV
        },
        {
            path: "/video",
            component: Home_video
        },
        {
            path: "/profile",
            component: profile
        },
        {
            path: "/play-list-detail/:id",
            component: PlayListDetail
        },
        {
            path: "/singer-detail/:id",
            component: SingsHome
        },
        {
            path: "/mv-detail",
            component: mvdatail
        },
        {
            path: "/user",
            component: profile
        },
    ]
})


routes.beforeEach((to,from,next)=>{
    if (to.path ==="/login") {
        next()
    }else{
        const tokenKEY=localStorage.getItem("token")
        if (tokenKEY ===null||tokenKEY==='') {
            next("/login")
        }else{
            next()
        }
    }
    
})

export default routes
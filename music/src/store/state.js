const state = {

    profile:  null,//个人信息

    historySearch:  [],    //历史搜索


    songSheetList: [],    //推荐歌单

    newSongList: [], //推荐新歌

    singerList: [],//推荐歌手

    playList: [],//当前播放歌曲对象

    isPlay: false, //播放的显示隐藏

    currentSong: {},//当前歌曲数据

    playRecord: [],//播放列表

    audio: null ,   //audio 

    playMode:"orderPlay",//播放模式
    
    searchData:[],//搜索数据

    isLogin:false, //是否登入

    Ilike:[],//我收藏的歌单

    myListx:[],/// 我创建的歌单
    
}

export default state
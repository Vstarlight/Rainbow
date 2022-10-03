import instance from './instance'
//功能api统一入口
//***获取轮播图***/
export const getBanner = () => instance.get('/banner', {})
//***获取热搜***/
export const getSearchHot = () => instance.get(`/search/hot`)

//获取搜索shuju
export const getSearchData = params => instance.get(`/cloudsearch`, { params })
//推荐歌单
export const getRecommendSongeSheet = limit => instance.get(`/personalized?limit=${limit}`)
//推荐歌曲

export const getNewSongs = () => instance.get(`/personalized/newsong?limit=${8}`)

//推荐歌手
export const getRecommendSinger = limit => instance.get(`/top/artists?offset=0&limit=${30}`)

//获取歌词
export const getCurrentSongLyric = id => instance.get(`/lyric?id=${id}`)

//获取登入状态
export const getLoginStatus = () => instance.get(`/login/status`, {})

export const ApiGetMalogin = (cookie) => instance.get(`/login/status?cookie=${cookie}`)

//验证码
export const yanzheng = (phone) => instance.get(`/captcha/sent?phone=${phone}`)

//验证验证码
export const yanyan = (phone, captcha) => instance.get(`/captcha/verify?phone=${phone}&captcha=${captcha}`)

//二维码kay
export const getmaKey = (timestamp) => instance.get(`/login/qr/key?timestamp=${timestamp}`)

//二维码图片
export const getMaIMG = (key, timestamp) => instance.get(`/login/qr/create?key=${key}&qrimg=qrimg&timestamp=${timestamp}`)

//二维码登入
export const getMalogin = (key, timestamp) => instance.get(`/login/qr/check?key=${key}&timestamp=${timestamp}`)

//获取排行榜
export const getRankTopList = () => instance.get(`/toplist`)

//获取热门标签
export const getHotSongSheet = () => instance.get(`/playlist/hot`, {})

//获取全部标签
export const getSongSheetCategory = () => instance.get(`/playlist/catlist`, {})

//获取歌单
export const getSongSheet = params => instance.get(`/top/playlist`, { params })

//获取主页歌手数据
export const getSingerCategory = params => instance.get(`/artist/list`, { params })

//获取mv数据
export const getAllMV = params => instance.get(`/mv/all`, { params })

//视频全部标签
export const getVideoTagList = () => instance.get(`/video/group/list`, {})

export const getVideoCategoryList = () => instance.get(`/video/category/list`, {})

//h获取视频
export const getVideoList = params => instance.get(`/video/group`, { params })

export const getAllVideoList = params => instance.get(`/video/timeline/all`, { params })

//获取用户等级
export const GetUserLv = () => instance.get(`/user/level`)

//获取用户歌单
export const GetUserSongSheet = id => instance.get(`/user/playlist?uid=${id}`)

//获取用户播放记录
export const getUserRecord = (uid, type) =>instance.get(`/user/record?uid=${uid}&type=${type}`, {})

//获取是否为VIP用户
export const getVipUser=()=>instance.get(`/vip/info`)

//获取歌单详细
export const getPlayListDetail=(id, s, time)=>instance.get(`/playlist/detail?id=${id}&s=${s}&timestamp=${time}`, {})

//获取歌单收藏的人
export const getSongsLikeList=(id)=>instance.get(`/playlist/subscribers?id=${id}&limit=28&offset=0`,{})

//是否收藏歌单
export const getSC=(t,id)=>instance.get(`/playlist/subscribe?t=${t}&id=${id}`,{})

//相关推荐
export const getRelatedPlaylist=(id)=>instance.get(`/related/playlist?id=${id}`, {})

//获取精彩评论
export const getCommentPlaylist=(id)=>instance.get(`/comment/playlist?id=${id}&limit=28&offset=0`)

 // 获取歌手基本信息和热门50首单曲
 export const getsingerDetail=(id)=>instance.get(`/artists?id=${id}`,{})

 //获取歌手简介
 export const getsingJJ=(id)=>instance.get(`/artist/desc?id=${id}`, {})

 //获取相似歌手
 export const getXsSinger=(id)=>instance.get(`/simi/artist?id=${id}`, {})

 //获取歌手热门歌曲
 export const getSingerHot=(id)=>instance.get(`/artists?id=${id}`, {})

 //获取歌手专辑
 export const getAlbum=(id,limit)=>instance.get(`/artist/album?id=${id}&limit=${limit}`, { })

 //获取歌手MV
 export const getSingMV=(id)=>instance.get(`/artist/mv?id=${id}&limit=${12}`,{})

 //获取Mv数据
 export const getMvData=(id)=>instance.get(`/mv/detail?mvid=${id}`, {})

 //获取视频数据
 export const getVidoData=(id)=>instance.get(`/video/detail?id=${id}`, {})

 //获取MVURL 
 export const getMvUrl = (id) => instance.get(`/mv/url?id=${id}`, {})

 // 获取视频URL 
 export const getVideoUrl = id => instance.get(`/video/url?id=${id}`, {})

 //获取一建三联mv
 export const getMvDetailInfo=id => instance.get(`/mv/detail/info?mvid=${id}`, {})

 //获取视频一键三连
 export const getVidoInfo=id =>instance.get(`/video/detail/info?vid=${id}`, {})

 //发送评论
 export const sendComment=params=>instance.get(`/comment`, { params })

 //获取mv评论
export const getMvComments=params=>instance.get(`/comment/mv`, { params })

 //获取视频评论
export const getVidoComments=params=>instance.get(`/comment/video`, { params })

//点赞评论
export const likeComment=params=>instance.get(`/comment/like`, { params })

//相关mv视频
export const  getXXVido=id=>instance.get(`/simi/mv?mvid=${id}`, {})

//相关vidoe视频
export const getXXVidoV=id=>instance.get(`/related/allvideo?id=${id}`, {})

export const getUserInfo=id=>instance.get(`/user/detail?uid=${id}`,{})
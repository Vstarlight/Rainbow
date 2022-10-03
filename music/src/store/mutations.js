//用户个人信息
export const setProfile = (state, values) => {
    console.log(values)
    state.profile = values
}
//清空用户个人信息
export const reProfile = (state, values) => {
    state.profile = null
}

//设置历史搜索记录
export const setHistorySearch = (state, values) => {
    let index = state.historySearch.indexOf(values)
    console.log(index)
    if (index !== -1) {
        state.historySearch.splice(index, 1)
        state.historySearch.unshift(values)
    } else {
        state.historySearch.unshift(values)
    }
}

//删除历史搜索记录的某一项
export const deleteHistorySearchItem = (state, index) => {
    state.historySearch.splice(index, 1)
}

//清空功能
export const clearHistorySearch = (state, values) => {
    state.historySearch = []
}

//获取推荐歌单 
export const oursongSheetList = (state, values) => {
    state.songSheetList = values
}
//获取推荐新歌
export const newSongList = (state, values) => {
    state.newSongList = values
}

//获取推荐歌手
export const singerList = (state, values) => {
    state.singerList = values
}

//设置播放列表
export const setPlayList = (state, values) => {
    state.playList = values
}

//控制暂停播放显示
export const isPlayMutation = (state, values) => {
    state.isPlay = values

}

//当前歌曲的数据
export const setCurrentSong = (state, values) => {
    state.currentSong=values
}

//将当前歌曲加入到播放记录列表中, 并去重
export const addPlayRecord = (state, values) => {
    /*let index = state.playRecord.findIndex(item => state.currentSong.id === item.id)
    if (index !== -1) {
        state.playRecord.splice(index, 1)
        state.playRecord.unshift(state.currentSong)
    } else {
        state.playRecord.unshift(state.currentSong)
    }*/

}
//获取audio元素
export const getAudio = (state, audio) => {
    state.audio = audio
}
//暂停
export const pause = state => {
    state.audio.pause()
}

//播放
export const play = state => {
    state.audio.play()
}

//上一曲
export const setPlayPrevSong = (state) => {
    let index = state.playList.findIndex(fruit => fruit.id === state.currentSong.id)
    if (index === 0) {
        let length = state.playList.length - 1
        state.currentSong = state.playList[length]
    } else {
        let length = index - 1
        state.currentSong = state.playList[length]
    }
    //将当前歌曲加入到播放记录列表中
}

//下一曲
export const setPlayNextSong = (state) => {
    let index = state.playList.findIndex(fruit => fruit.id === state.currentSong.id)
    console.log(index)
    if (index === state.playList.length - 1) {
        state.currentSong = state.playList[0]
    } else {
        let length = state.playList.findIndex(fruit => fruit.id === state.currentSong.id) + 1
        state.currentSong = state.playList[length]
    }
}

//设置播放模式
export const setPlayMode = (state, vlaues) => {
    state.playMode = vlaues
}

//设置为单曲循环
export const ChangeOneLoop = (state, vlaues) => {
    state.currentSong = vlaues
}

//设置为随机循环
export const ChangeRandomPlay = (state, vlaues) => {
    state.currentSong= state.playList[vlaues]
}

//清空播放记录
export const deleteAll = (state, vlaues) => {
    state.playRecord = []
}

//设置播放错误信息方便后面跳过该歌曲
export const setCurrentSongError = (state, payload) => {
    state.currentSong.error = payload
}

//删除播放记录的某一个
export const removeItem = (state, index) => {
    state.playRecord.splice(index, 1)
}

//搜索数据
export const setSearchData=(state,vlaues)=>{
    var searsong=[]
    vlaues.forEach((item) => {
        let setsear={}
        setsear.album=item.album
        setsear.id=item.id
        setsear.picUrl=item.picUrl
        setsear.singer=item.singer
        setsear.song=item.song
        setsear.tiem=item.transitionTime
        setsear.transitionTime=item.transitionTime
        searsong.push(setsear)
    });
    state.searchData=searsong
}

//登录状态
export const isLogino=(state,vlaues)=>{
    state.isLogin=vlaues
}

//我收藏歌单的ID 
export const Ilike=(state,vlaues)=>{
    state.Ilike=vlaues
}
export const myListx=(state,vlaues)=>{
    state.myListx=vlaues
}

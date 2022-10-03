// 控制播放暂停按钮的显隐
export const isPlay = state => state.isPlay
// 当前播放歌曲对象
export const currentSong = state => state.currentSong
//
export const playMode = state => state.playMode

// 播放列表
export const playList = state => state.playList

//用户信息
export const profile =state=>{
    return state.profile||JSON.parse(window.localStorage.getItem('profile'))
}

//我的收藏歌单id
export const Ilike=state=>{
    return JSON.parse(window.localStorage.getItem('Ilike'))
}

//我创建的歌单id
export const myListx=state=>{
    return JSON.parse(window.localStorage.getItem('myList'))
}
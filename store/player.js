import { HYEventStore } from 'hy-event-store'
import { fetchSongDetail, fetchSongLyric, fetchSongUrl } from "../service/player"
import { parseLyric } from "../utils/parse-lyric"

export const audioContext = wx.createInnerAudioContext()

const playerStore = new HYEventStore({
  state: {
    playSongList: [],
    playSongIndex: 0,

    id: 0,
    currentSong: {},
    currentTime: 0,
    durationTime: 0,
    lyricInfos: [],
    currentLyricText: "",
    currentLyricIndex: -1,
 
    isFirstPlay: true,

    isPlaying: false,
    playModeIndex: 0, // 0:顺序播放 1:单曲循环 2:随机播放
  },

  actions: {
    playMusicWithSongIdAction(state, id) {
      if(state.id ===  id ) return
      // 0.原来的数据重置
      state.currentSong = {}
      state.durationTime = 0
      state.durationTime = 0
      state.currentLyricIndex = 0
      state.currentLyricText = ""
      state.lyricInfos = []

      // 1.保存id
      state.id = id
      state.isPlaying = true

      // 2.请求歌曲相关的数据
      // 2.1.根据id获取歌曲的详情
      fetchSongDetail(id).then(res => {
        state.currentSong = res.songs[0]
        state.durationTime = res.songs[0].dt
      })

      // 2.2.根据id获取歌词的信息
      fetchSongLyric(id).then(res => {
        const lrcString = res.lrc.lyric
        const lyricInfos = parseLyric(lrcString)
        state.lyricInfos = lyricInfos
      })

      // 3.播放当前的歌曲
      audioContext.stop()
      fetchSongUrl(id).then(res =>{
        const url =res.data[0].url;
        audioContext.src = url;
      })

      // 4.监听播放的进度
      if (state.isFirstPlay) {
        state.isFirstPlay = false

        audioContext.onTimeUpdate(() => {
          // 1.获取当前播放的时间
          state.currentTime = audioContext.currentTime * 1000
    
          // 2.匹配正确的歌词
          if (!state.lyricInfos.length) return
          let index = state.lyricInfos.length - 1
          for (let i = 0; i < state.lyricInfos.length; i++) {
            const info = state.lyricInfos[i]
            if (info.time > audioContext.currentTime * 1000) {
              index = i - 1
              break
            }
          }
          if (index === state.currentLyricIndex) return
    
          // 3.获取歌词的索引index和文本text
          // 4.改变歌词滚动页面的位置
          const currentLyricText = state.lyricInfos[index].text
          state.currentLyricText = currentLyricText
          state.currentLyricIndex = index
        })
        audioContext.onWaiting(() => {
          audioContext.pause()
        })
        audioContext.onCanplay(() => {
          if(!state.isPlaying) return
          audioContext.play()
        })
        audioContext.onEnded(() => {
          // 如果是单曲循环, 不需要切换下一首歌
          this.dispatch("playNewMusicAction")
        })
      }
    },

    changeMusicStatusAction(state) {
      if (!audioContext.paused) {
        audioContext.pause()
        state.isPlaying = false
      } else {
        audioContext.play()
        state.isPlaying = true
      }
    },

    changePlayModeAction(state) {
      // 1.计算新的模式
      let modeIndex = state.playModeIndex
      modeIndex = modeIndex + 1
      if (modeIndex === 3) modeIndex = 0

      // 设置是否是单曲循环
      if (modeIndex === 1) {
        audioContext.loop = true
      } else {
        audioContext.loop = false
      }

      // 2.保存当前的模式
      state.playModeIndex = modeIndex
    },

    playNewMusicAction(state, isNext = true) {
      // 1.获取之前的数据
      const length = state.playSongList.length
      let index = state.playSongIndex

      // 搜索添加播放列表为空，单独处理，点击下一首还是播放原来的；
      if(!length){
        audioContext.seek(0);
        state.isPlaying = true;
        return
      }

      // 2.根据之前的数据计算最新的索引
      switch (state.playModeIndex) {
        case 1:
        case 0: // 顺序播放
          index = isNext ? index + 1: index - 1
          if (index === length) index = 0
          if (index === -1) index = length - 1
          break
        case 2: // 随机播放
          index = Math.floor(Math.random() * length)
          break
      }

      // 3.根据索引获取当前歌曲的信息
      const newSong = state.playSongList[index]

      // 开始播放新的歌曲
      this.dispatch("playMusicWithSongIdAction", newSong.id)

      // 4.保存最新的索引值
      state.playSongIndex = index
    }
  }
})

export default playerStore

import { fetchSongDetail,fetchSongLyric,fetchSongUrl } from "../../../service/player";
import {throttle} from 'underscore'
import playerStore, { audioContext } from "../../../store/player"
const modeNames = ["order", "repeat", "random"]

Page({

  data: {
    stateKeys: ["id", "currentSong", "durationTime", "currentTime", "lyricInfos", "currentLyricText", "currentLyricIndex", "isPlaying", "playModeIndex","playSongList"],
    id:undefined,
    playSongList:[],
    playSongIndex:-1,
    songLyric:{},
    songInfo:{},
    currentPage:0,
    statusBarHeight:0,
    playModeName:'order',
    isPlaying: false,
    lyricInfos: [],
    currentLyricText: "",
    currentLyricIndex: -1,
    lyricScrollTop:0,
    duration:0,
    currentTime:0,
    isSliderChaning:false,
    isWating:false
  },

  onLoad(options) {
    const app = getApp()
    this.setData({statusBarHeight:app.globalData.statusBarHeight})

    const id = options.id;
    if (id) {
      playerStore.dispatch("playMusicWithSongIdAction", id)
    }
    playerStore.onStates(["playSongList", "playSongIndex"], this.getPlaySongInfosHandler)
    playerStore.onStates(this.data.stateKeys, this.getPlayerInfosHandler)


  },

  getPlayerInfosHandler({ 
    id, currentSong, durationTime, currentTime,
    lyricInfos, currentLyricText, currentLyricIndex,
    isPlaying, playModeIndex
  }) {
    if (id !== undefined) {
      this.setData({ id })
    }
    if (currentSong) {
      this.setData({ songInfo:currentSong })
    }
    if (durationTime !== undefined) {
      this.setData({ duration:durationTime })
    }
    if (currentTime !== undefined) {
      // 根据当前时间改变进度
      this.updateProgress(currentTime)
    }
    if (lyricInfos) {
      this.setData({ lyricInfos })
    }
    if (currentLyricText) {
      this.setData({ currentLyricText })
    }
    if (currentLyricIndex !== undefined) { 
      // 修改lyricScrollTop
      this.setData({ currentLyricIndex, lyricScrollTop: currentLyricIndex * 35 })
    }
    if (isPlaying !== undefined) {
      this.setData({ isPlaying })
    }
    if (playModeIndex !== undefined) {
      this.setData({ playModeName: modeNames[playModeIndex] })
    }
  },
  getPlaySongInfosHandler({ playSongList, playSongIndex }) {
    if (playSongList) {
      this.setData({ playSongList })
    }
    if (playSongIndex !== undefined) {
      this.setData({ playSongIndex })
    }
  },
  updateProgress(currentTime) {
    if(this.data.isSliderChaning || this.data.isWating) return
    this.setData({currentTime})
  },
  onSwipperChange(e){
    const page = e.detail.current;
    this.setData({currentPage:page})
  },
  onSliderChange(e){
    this.data.isSliderChaning = false;
    const value = e.detail.value;
    this.setData({currentTime:value*1000})
    audioContext.seek(value)
    this.data.isWating = true;

    setTimeout(()=>{
      this.data.isWating = false;
    },1000)
  },
  onSliderChanging:throttle(function(e){
    const time = e.detail.value * 1000; 
    this.setData({currentTime:time})
    this.data.isSliderChaning = true;
  },200),
  onPlayOrPauseTap() {
    playerStore.dispatch("changeMusicStatusAction")
  },
  onPrevBtnTap() {
    playerStore.dispatch("playNewMusicAction", false)
  },
  onNextBtnTap() {
    playerStore.dispatch("playNewMusicAction")
  },
  onModeBtnTap() {
    playerStore.dispatch("changePlayModeAction")
  },
  onBackClick(){
    wx.navigateBack()
  }

})
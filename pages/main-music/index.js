import {fetchMusicBanner,fetchSuggestMusic,fetchSongList} from '../../service/music'
import rankingStore from '../../store/ranking'
import playerStore from '../../store/player'
import getEleSize from '../../utils/get-element-size'
Page({
  data: {
    searchValue:'',
    banners:[],
    imgHeight:undefined,
    recommendMusic:[],
    hotRanking:{},
    newRanking:{},
    upRanking:{},
    originRanking:{},
    songList1:[],
    songList2:[],
    isPlaying:false,
    currentSong:{}
  },
  onLoad(options) {
    this.getMusicBanner()
    rankingStore.onState("hotRanking",(v)=>{
      this.setData({hotRanking:v})
      this.setData({recommendMusic: v?.tracks?.slice(0,6) || []})
      
    })
    rankingStore.onState("newRanking",(v)=>{
      this.setData({newRanking:v})
    })
    rankingStore.onState("upRanking",(v)=>{
      this.setData({upRanking:v})
    })
    rankingStore.onState("originRanking",(v)=>{
      this.setData({originRanking:v})
    })
    rankingStore.dispatch("getRankingSongs")
    this.getSongList()

    playerStore.onStates(['isPlaying','currentSong'],({isPlaying,currentSong})=>{
      if(currentSong!==undefined){
        this.setData({
          currentSong
        })
      }
      if(isPlaying!==undefined){
        this.setData({
          isPlaying
        })
      }
    })
  },
  searchClick(){
    wx.navigateTo({
      url: '/pages/search-detail/index',
    })
  },
  async imgLoad(){
    const imgHeight = await getEleSize('.banner-img');
    this.setData({imgHeight})
  },
  async getMusicBanner(){
    const res = await fetchMusicBanner()
    this.setData({banners: res.banners})
  },
  async getSongList(){
    fetchSongList().then(res=>{
      this.setData({songList1:res.playlists})
    })
    fetchSongList('华语').then(res=>{
      this.setData({songList2:res.playlists})
    })

  },
  onRankingClick(e){
    const type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/song-list-detail/index?type=' + type,
    })
  },
  onMoreSongClick(){
    wx.navigateTo({
      url: '/pages/song-list-detail/index?type=hotRanking',
    })
  },
  onMoreSongListClick(){
    wx.navigateTo({
      url: '/pages/song-list-more/index',
    })
  },
  onSongClick(e){
    playerStore.setState("playSongList",this.data.hotRanking.tracks)
    playerStore.setState("playSongIndex",e.currentTarget.dataset.index)
  },
  changeMusicState(e){
    console.log();
    playerStore.dispatch('changeMusicStatusAction')
  },
  onPlayBarClick(){
    wx.navigateTo({
      url:'/packagePlayer/pages/song-detail/index'
    })
  }
})
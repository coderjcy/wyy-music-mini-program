import rankingStore from '../../store/ranking'
import {fetchListSongs} from '../../service/music'
Page({


  data: {
    type:undefined,
    musicList:[]
  },


  onLoad(options) {
    const type = options.type;
    const id = options.id;
    if(id){
      this.setData({id});
      this.getListSongs()
    }else if(type){
      this.setData({type})
      rankingStore.onState(type,this.handleMusicList)
    }

  },
  onUnload(options){
    if(this.data.type){
      rankingStore.offState(this.data.type,this.handleMusicList)
    }

  },
  handleMusicList(v){
    this.setData({musicList:v})
  },
  onSongClick(e){
    playerStore.setState("playSongList",this.data.musicList)
    playerStore.setState("playSongIndex",e.currentTarget.dataset.index)
  },
  async getListSongs(){
     const res = await fetchListSongs(this.data.id)
      this.setData({musicList:res.playlist})
  }
})
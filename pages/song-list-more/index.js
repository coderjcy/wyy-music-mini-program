import {fetchHotSongTags,fetchSongList} from '../../service/music'
Page({

  data: {
    songListInfo:[]
  },

  onLoad(options) {
    this.getHotSongTags()
  },
  async getHotSongTags(){
    const res = await fetchHotSongTags()
    const promises = []
    res.tags.forEach(item => {
      const promise = fetchSongList(item.name)
      promises.push(promise)
    })
    Promise.all(promises).then(res=>{
      const songListInfo = []
      res.forEach(item=>{
        songListInfo.push({
          cat:item.cat,
          playlists:item.playlists
        })
      })
      this.setData({songListInfo})
    })

  }
})
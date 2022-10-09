// components/song-item-v1/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    musicInfo:{
      type:Object,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSongClick(){
      wx.navigateTo({
        url: '/packagePlayer/pages/song-detail/index?id='+ this.data.musicInfo.id,
      })
    }
  }
})

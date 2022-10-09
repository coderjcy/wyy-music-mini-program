// components/somg-item-v2/index.js
Component({

  properties: {
    songInfo:{
      type:Object
    },
    index:{
      type:Number
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
        url: '/packagePlayer/pages/song-detail/index?id='+ this.data.songInfo.id,
      })
    }
  }
})

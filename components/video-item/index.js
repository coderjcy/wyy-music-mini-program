// components/video-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    videoInfo:{
      type:Object
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
    videoItemClick() {
      const id = this.data.videoInfo.id;
      wx.navigateTo({
        url: '/packageVideo/pages/video-detail/video-detail?id=' + id,
      })
    },
  }
})

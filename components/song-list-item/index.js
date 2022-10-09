// components/sons-list-item/index.js
Component({
  properties: {
    listInfo:{
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
    listClick(){
      const id = this.data.listInfo.id;
      wx.navigateTo({
        url: '/pages/song-list-detail/index?id=' + id,
      })
    }
  }
})

// pages/main-video/main-video.js
import { fetchVideoList } from "../../service/video"

Page({
  data: {
    videoList: [],
    hasMore: true
  },

  onLoad() {
    this.getVideoList()
  },

  async getVideoList() {
    const res = await fetchVideoList(10,this.data.videoList.length)
    this.setData({ videoList: [...this.data.videoList, ...res.data] })
    this.data.hasMore = res.hasMore
  },

  onReachBottom() {
    if (!this.data.hasMore) return
    this.getVideoList()
  },
  async onPullDownRefresh() {
    this.data.videoList = [];
    this.data.hasMore = true
    await this.getVideoList()
    wx.stopPullDownRefresh()
  },


})
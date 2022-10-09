// pages/detail-video/detail-video.js
import { fetchMvUrl, fetchMvComment, fetchSimiMvs,fetchMvDetail } from "../../../service/video"
Page({
  data: {
    id: 0,
    url: "",
    mvInfo: {},
    simiMvs: [],
    danmuList: []
  },
  onLoad(options) {
    this.setData({ id: options.id })

    this.getMvUrl()
    this.getMvComment()
    this.getMvDetail()
    this.gethSimiMvs()
  },

  async getMvUrl() {
    const res = await fetchMvUrl(this.data.id)
    this.setData({ url: res.data.url })
  },
  async getMvComment() {
    const res = await fetchMvComment(this.data.id)
    let n = 0;
    const danmuList = res.comments.map((item)=>{
      n = n + 2;
      return{
        color: "red",
        text:item.content,
        time: n
      }
    })
    this.setData({ danmuList })
  },
  async getMvDetail() {
    const res = await fetchMvDetail(this.data.id)
    this.setData({ mvInfo: res.data })
  },
  async gethSimiMvs() {
    const res = await fetchSimiMvs(this.data.id)
    console.log(res);
    this.setData({ simiMvs: res.mvs })
  }
})
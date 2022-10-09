class MyRequest{
  constructor(BASE_URL){
    this.BASE_URL = BASE_URL
  }
  request(options){
    return new Promise((resolve,reject)=>{
      wx.request({
        ...options,
        url:this.BASE_URL + options.url,
        success:function(res){
          resolve(res.data)
        },
        fail:function(err){
          reject(err)
        }, 
      })
    })
  }

  get(options){
    return this.request({...options,method:'get'})
  }
  post(options){
    return this.request({...options,method:'post'})
  }

}
// https://coderwhy-music.vercel.app
// http://codercba.com:9002

const myRequest = new MyRequest('http://localhost:3000')

export default myRequest
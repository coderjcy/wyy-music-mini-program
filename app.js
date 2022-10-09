import {fetchCaptcha,loginPhone,fetchLoginState} from './service/login'
App({
  onLaunch() {
    // this.getCaptcha()
    // this.loginWYY()
    // this.getLoginState()
    wx.getSystemInfo().then(res=>{
      this.globalData.statusBarHeight = res.statusBarHeight
    })


    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

  },
  globalData: {
    userInfo: null,
    statusBarHeight:0
  },
  async getCaptcha(){
    const phone = '17684727990'
    const res = await fetchCaptcha(phone);
    console.log(res);
  },
  async loginWYY(){
    const phone = '17684727990'
    const captcha = '2118'
    const res = await loginPhone(phone,captcha);
    console.log(res);
  },
  async getLoginState(){
    const res = await fetchLoginState();
    console.log(res);
  }
  
})

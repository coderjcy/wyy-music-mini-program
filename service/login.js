import myRequest from './index'



export function loginPhone(phone,captcha){
  return myRequest.get({
    url:"/login/cellphone",
    data:{
      captcha,
      phone
    }
  })
}
export function fetchCaptcha(phone){
  return myRequest.get({
    url:"/captcha/sent",
    data:{
      phone
    }
  })
}
export function fetchLoginState(){
  return myRequest.get({
    url:"/login/status",
  })
}
import myRequest from "./index";
export function fetchSongDetail(ids){
  return myRequest.get({
    url:'/song/detail',
    data:{
      ids
    }
  })
}
export function fetchSongLyric(id){
  return myRequest.get({
    url:'/lyric',
    data:{
      id
    }
  })
}

export function fetchSongUrl(id,level="standard"){
  // level: standard, higher, exhigh, lossless
  return myRequest.get({
    url:'/song/url',
    data:{
      id,
      level
    }
  })
}
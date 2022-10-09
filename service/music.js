import myRequest from './index'


export function fetchMusicBanner(){
  return myRequest.get({
    url:'/banner'
  })
}
export function fetchListSongs(id){
  return myRequest.get({
    url:'/playlist/detail',
    data:{
      id
    }
  })
}
export function fetchSongList(cat="全部",limit=10,offset=0){
  return myRequest.get({
    url:'/top/playlist',
    data:{
      cat,
      limit,
      offset
    }
  })
}
export function fetchHotSongTags(){
  return myRequest.get({
    url:'/playlist/hot'
  })
}





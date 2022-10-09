import myRequest from './index'

export function fetchSearchHot(){
  return myRequest.get({
    url:"/search/hot",
  })
}
export function fetchSearchSuggest(keywords){
  return myRequest.get({
    url:"/search/suggest",
    data:{
      keywords
    }
  })
}
export function fetchSearchResult(keywords=" "){
  return myRequest.get({
    url:"/search",
    data:{
      keywords
    }
  })
}
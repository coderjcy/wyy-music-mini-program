import myRequest from './index'

export function fetchVideoList(limit, offset) {
  return myRequest.get({
    url: '/top/mv',
    data: {
      limit,
      offset,
    }
  })
}
export function fetchMvUrl(id) {
  return myRequest.get({
    url: '/mv/url',
    data: {
      id
    }
  })
}
export function fetchMvComment(id) {
  return myRequest.get({
    url: '/comment/mv',
    data: {
      id
    }
  })
}
export function fetchSimiMvs(mvid) {
  return myRequest.get({
    url: '/simi/mv',
    data: {
      mvid
    }
  })
}

export function fetchMvDetail(mvid) {
  return myRequest.get({
    url: '/mv/detail',
    data: {
      mvid
    }
  })
}

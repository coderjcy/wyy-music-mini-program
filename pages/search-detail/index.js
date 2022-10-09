import { fetchSearchHot, fetchSearchSuggest, fetchSearchResult } from '../../service/search'
import stringToNodes from '../../utils/string-to-nodes'
import {debounce} from 'underscore'
import playerStore from '../../store/player'

const debounceSearchSuggest = debounce(fetchSearchSuggest,true,true)
Page({

  data: {
    keywords: [],
    suggestSongs: [],
    searchWord: "",
    suggestSongsNodes: [],
    searchResult: []
  },
  onLoad: function (options) {
    this.getPageData()
  },

  // 网络请求（最近经常被搜索的关键词）
  getPageData() {
    fetchSearchHot().then(res => {
      this.setData({keywords: res.result.hots})
    })
  },
  // 事件处理
  searchChange(event){
    const searchWord = event.detail
    this.setData({searchWord: searchWord})
    if(!searchWord) {
      this.setData({suggestSongs: [], searchResult: []})
      debounceSearchSuggest.cancel()
      return
    }

    debounceSearchSuggest(searchWord).then(res => {

      const suggestSongs = res.result.songs
      this.setData({suggestSongs})
      if(!suggestSongs) return

      // 转成nodes节点
      const suggestKeywords = suggestSongs.map(item => item.name)
      const suggestSongsNodes = []
      for (const keyword of suggestKeywords) {
        const nodes = stringToNodes(keyword, searchWord)
        suggestSongsNodes.push(nodes)
      }
      this.setData({suggestSongsNodes})
    })
  },
  handleSearchAction() {
    const searchWord = this.data.searchWord
    fetchSearchResult(searchWord).then(res => {
      this.setData({searchResult: res.result.songs})
      playerStore.setState('playSongList',[])
    })
  },
  handleKeywordClick(event) {
    const searchWord = event.currentTarget.dataset.keyword
    this.setData({searchWord})
    this.handleSearchAction()
  },  
  // handleSuggestItemClick(event) {
  //   const index = event.currentTarget.dataset.index
  //   const searchWord = this.data.suggestSongs[index].keyword
  //   this.setData({searchWord})
  //   this.handleSearchAction()
  // },
  // handleHotSuggestItemClick(event){
  //   const searchWord = event.currentTarget.dataset.keyword
  //   this.setData({searchWord})
  //   this.handleSearchAction()
  // }
})
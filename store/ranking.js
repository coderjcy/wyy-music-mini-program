import { HYEventStore } from 'hy-event-store'
import {fetchListSongs} from '../service/music'
const ids = [['upRanking',19723756],['originRanking',2884035],['hotRanking',3778678], ['newRanking',3779629]];
 const rankingStore = new HYEventStore({
   state:{
     newRanking:{},
     hotRanking:{},
     upRanking:{},
     originRanking:{},
   },
   actions:{
    async getRankingSongs(state){
      ids.forEach(item=>{
        fetchListSongs(item[1]).then(res=>{
          state[item[0]] = res.playlist;
        })
      })
    }
   }
 })


 export default rankingStore 

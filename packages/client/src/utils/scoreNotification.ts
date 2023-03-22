import { getLBData, putLBData } from '@services/leaderboardController'
import { LeaderboardData, LeaderboardDataReq, LeaderboardDataResp } from '@api/leaderboardApi'
import knightImg from '@images/knight.png'
import { UserSlice } from '@constants/user'
import { GameSlice } from '@constants/game'

const req: LeaderboardDataReq = {
  ratingFieldName: 'score',
  cursor: 0,
  limit: 10,
}

export default function callNotification(userInp: UserSlice, game : GameSlice, lbData : LeaderboardData){
  getLBData(req).then((data: LeaderboardDataResp[]) => {
  const el = data.filter(
    user => user.data.nickname == userInp.data.display_name
  )[0]
  if (!el || el.data.score < game.score) {
    putLBData(lbData).then(() => {
      if (window.Notification) {
        Notification.requestPermission().then((status) => {
          if(status !== 'denied'){
            const n = new Notification('One Bit Dungeon', {
              body: 'Congratulations! Your data was saved, check the leaderboard!',
              icon: knightImg,
            })
            n.onclick = () => {
              window.location.assign('/leaderboard')
            }
            setTimeout(function() { n.close() }, 2000);
          }
        })
      }
    })
  }
})
}

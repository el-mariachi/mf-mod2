import { LeaderboardDataResp } from '@api/leaderboardApi'
import { SortedVal } from '@components/Leaderboard/List'

export default function insertionSort(
  arr: LeaderboardDataResp[],
  sortVal: SortedVal
) {
  for (let k = 0; k < arr.length; k++) {
    const insertIndex = findInsertionIndex(arr, k, sortVal)
    shiftElements(arr, insertIndex, k)
    console.log(arr)
  }

  return arr
}
function findInsertionIndex(
  arr: LeaderboardDataResp[],
  i: number,
  sortVal: SortedVal
) {
  switch (sortVal) {
    case SortedVal.score:
      for (let k = 0; k < i; k++) {
        if (arr[k].data.score < arr[i].data.score) {
          return k
        }
      }
      break
    case SortedVal.time:
      for (let k = 0; k < i; k++) {
        if (arr[k].data.time > arr[i].data.time) {
          return k
        }
      }
      break
    case SortedVal.kills:
      for (let k = 0; k < i; k++) {
        if (arr[k].data.killCount < arr[i].data.killCount) {
          return k
        }
      }
      break
    case SortedVal.coins:
      for (let k = 0; k < i; k++) {
        if (arr[k].data.coins < arr[i].data.coins) {
          return k
        }
      }
      break
    case SortedVal.steps:
      for (let k = 0; k < i; k++) {
        if (arr[k].data.steps < arr[i].data.steps) {
          return k
        }
      }
      break
  }
  return i
}
function shiftElements(
  arr: LeaderboardDataResp[],
  insertionIndex: number,
  i: number
) {
  const value = arr[i]

  for (let j = i; j > insertionIndex; j--) {
    arr[j] = arr[j - 1]
  }

  arr[insertionIndex] = value
}

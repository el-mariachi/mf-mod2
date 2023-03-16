import { LeaderboardDataResp } from '@api/leaderboardApi'
import { SortedVal } from '@components/Leaderboard/List'

export default function insertionSort(
  this: LeaderboardDataResp[],
  sortVal: SortedVal
) {
  for (let k = 0; k < this.length; k++) {
    const insertIndex = findInsertionIndex(this, k, sortVal)
    shiftElements(this, insertIndex, k)
  }
  return this
}
function findInsertionIndex(
  arr: LeaderboardDataResp[],
  i: number,
  sortVal: SortedVal
) {
  for (let k = 0; k < i; k++) {
    if (sortVal == SortedVal.time) {
      if (arr[k].data[sortVal] > arr[i].data[sortVal]) {
        return k
      }
    } else {
      if (arr[k].data[sortVal] < arr[i].data[sortVal]) {
        return k
      }
    }
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

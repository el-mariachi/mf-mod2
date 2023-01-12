export default function SecondsToHMS(time: number) {
  const date = new Date(0)
  date.setSeconds(time)
  const formatTime = date.toISOString().substring(11, 19)

  return formatTime
}

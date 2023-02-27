export default function SecondsToHMS(time: number) {
  const date = new Date(0)
  date.setSeconds(time)
  const formatTime =
    time < 3600
      ? date.toISOString().substring(14, 19)
      : date.toISOString().substring(12, 19)

  return formatTime
}
export const MsecondsToHMS = (mseconds: number) =>
  SecondsToHMS(Math.round(mseconds / 1000))

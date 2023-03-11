export function datePrettify(date: Date, withTime = false) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const TODAY_MS = today.getTime()
  const DAY_AGO_MS = 60 * 60 * 24 * 1000
  const AVAREGE_MONTH_DAYS = 29.3
  const SIX_DAYS_AGO_MS = DAY_AGO_MS * 6
  const ELEVEN_MONTHS_AGO_MS = AVAREGE_MONTH_DAYS * DAY_AGO_MS * 11

  const almostWeekAgo = new Date(TODAY_MS - SIX_DAYS_AGO_MS)
  const almostYearAgo = new Date(TODAY_MS - ELEVEN_MONTHS_AGO_MS)

  const weekDays = [
    'воскресенье',
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
  ]
  const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ]

  const hours = date.getHours()
  const minutes = date.getMinutes()
  const time = `${hours > 9 ? hours : `0${hours}`}:${
    minutes > 9 ? minutes : `0${minutes}`
  }`

  let prettified = ''
  if (date > today) {
    return time
  } else if (date > almostWeekAgo) {
    prettified = weekDays[date.getDay()]
  } else if (date > almostYearAgo) {
    prettified = `${date.getDate()} ${monthNames[date.getMonth()]}`
  } else {
    const day = date.getDate()
    const month = date.getMonth() + 1

    prettified = `${day > 9 ? day : `0${day}`}.${
      month > 9 ? month : `0${month}`
    }.${date.getFullYear()}`
  }
  return prettified + (withTime ? ` ${time}` : '')
}

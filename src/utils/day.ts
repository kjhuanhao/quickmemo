import dayjs from 'dayjs'

export function getFullTime(date: Date) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

export function getTimeByTimestamp(timestamp: number) {
  return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
}

export function getTimByTimeString(timeString: string) {
  return getTimeByTimestamp(dayjs(timeString).valueOf())
}

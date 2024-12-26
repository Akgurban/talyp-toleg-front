import { ref, watchEffect, toValue } from 'vue'

export function calcAgo(e) {
  const now = new Date()
  const diffMs = now - new Date(e)
  const diffDays = Math.floor(diffMs / (24 * 3600 * 1000))
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffMonths / 12)

  let returnedStr = ''
  if (diffDays > 0) {
    returnedStr += diffDays + ` дней`
  }
  if (diffMonths > 0) {
    returnedStr += diffMonths + ' месяц'
  }
  if (diffYears > 0) {
    returnedStr += diffYears + ` года`
  }
  return returnedStr
}

export function normalizedDate(e) {
  let day = e.slice(8,10)
  let month = e.slice(5,7)
  let year = e.slice(0,4)
  

  return `${day}.${month}.${year}`
}

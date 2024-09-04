import { DefaultRoute } from '../router/routes'

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj: Record<string, any>): boolean => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = (num: number): string | number => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = (html: string): string => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** Checks if the passed date is today
const isToday = (date: Date): boolean => {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

/**
 ** Format and return date in Humanize format
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (
  value: string | number | Date,
  formatting: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
): string => {
  if (!value) return ''
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value: string | number | Date, toTimeForCurrentDay = true): string => {
  const date = new Date(value)
  let formatting: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 */
export const isUserLoggedIn = (): string | null => localStorage.getItem('userData')
export const getUserData = (): Record<string, any> | null => {
  const userData = localStorage.getItem('userData')
  return userData ? JSON.parse(userData) : null
}

/**
 ** This function is used for demo purpose route navigation
 ** We are checking role just for ease
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole: string): string => {
  if (userRole === 'admin') return DefaultRoute
  if (userRole === 'client') return '/access-control'
  return '/login'
}

// ** React Select Theme Colors
export const selectThemeColors = (theme: any): any => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
})

import { LOGIN, USER_AVAILABLE, USER_UNAVAILABLE } from '../types'

// eslint-disable-next-line
export default (state: object, action: any) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('token', action.payload)
      return {
        ...state,
        isAuthenticated: true
      }
    case USER_AVAILABLE:
      return {
        ...state,
        isAuthenticated: true
      }
    case USER_UNAVAILABLE:
      return {
        ...state,
        isAuthenticated: false
      }
    default:
      return state
  }
}

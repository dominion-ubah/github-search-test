import {
  LOADING,
  GET_GITHUB_USERS,
  GET_GITHUB_USERS_REPO,
  AVATAR
} from '../types'

// eslint-disable-next-line
export default (state: object, action: any) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      }
    case GET_GITHUB_USERS:
      return {
        ...state,
        users: action.payload,
        isLoading: false
      }
    case GET_GITHUB_USERS_REPO:
      return {
        ...state,
        repos: action.payload,
        isLoading: false
      }
    case AVATAR:
      return {
        ...state,
        avatar: action.payload
      }
    default:
      return state
  }
}

import { useReducer } from 'react'
import SearchContext from './searchContext'
import SearchReducer from './searchReducer'
import {
  GET_GITHUB_USERS,
  GET_GITHUB_USERS_REPO,
  LOADING,
  AVATAR
} from '../types'
import axios from 'axios'

const SearchState = ({ children }) => {
  const initialState = {
    users: [],
    repos: [],
    isLoading: false,
    avatar: null
  }

  const [state, dispatch] = useReducer(SearchReducer, initialState)

  const setLoading = () => dispatch({ type: LOADING })

  const getUsers = async (search) => {
    setLoading()
    const res = await axios(
      `https://api.github.com/search/users?q=${search}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
    )
    const resData = await res.data
    dispatch({ type: GET_GITHUB_USERS, payload: resData })
  }
  const getRepos = async (repo) => {
    setLoading()
    const res = await axios(`https://api.github.com/repositories`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
    const resData = await res.data
    console.log(resData)
    dispatch({ type: GET_GITHUB_USERS_REPO, payload: resData })
  }

  const setAvatar = (avatarUrl) =>
    dispatch({ type: AVATAR, payload: avatarUrl })

  return (
    <SearchContext.Provider
      value={{
        users: state.users,
        repos: state.repos,
        isLoading: state.isLoading,
        avatar: state.avatar,
        getUsers,
        getRepos,
        setAvatar
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchState

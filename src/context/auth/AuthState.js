import { useReducer } from 'react'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import axios from 'axios'
import { LOGIN, USER_AVAILABLE, USER_UNAVAILABLE } from '../types'

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: false,
    details: [],
    token: localStorage.token
  }

  const [state, dispatch] = useReducer(AuthReducer, initialState)

  // Authenticate user
  const login = async (code) => {
    try {
      const res = await axios.post(
        'https://9uj0ihoex6.execute-api.eu-west-1.amazonaws.com/dev/auth',
        code
      )
      const data = await res.data
      dispatch({ type: LOGIN, payload: data.data?.access_token })
    } catch (error) {
      console.error(error)
    }
  }

  // check if user is authenticated
  const getCurrentUser = () => {
    if (localStorage.token) {
      dispatch({ type: USER_AVAILABLE })
    } else {
      dispatch({ type: USER_UNAVAILABLE })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        details: state.details,
        login,
        getCurrentUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState

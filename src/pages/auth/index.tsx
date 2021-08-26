import { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

const Login = () => {
  const { isAuthenticated, login } = useContext(AuthContext)
  const history = useHistory()

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/home')
    }
  }, [isAuthenticated, history])

  useEffect(() => {
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)

    if (code && code[1]) {
      const payload = { code: code[1] }
      login(payload)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: '100vh' }}
    >
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=user&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`}
        className="btn btn-lg btn-secondary"
      >
        Login to Github
      </a>
    </div>
  )
}

export default Login

import { Redirect, Route } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/auth/authContext'

function PrivateRoute(props: any) {
  const { isAuthenticated } = useContext(AuthContext)
  const { component: Component, ...rest } = props
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute

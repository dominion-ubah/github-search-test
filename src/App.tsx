import './App.css'
import { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/auth'
import Home from './pages/home'
import PrivateRoute from './routing/PrivateRoute'
import AuthContext from './context/auth/authContext'
import SearchResults from './pages/search'
import SearchState from './context/search/SearchState'

function App() {
  const { getCurrentUser } = useContext(AuthContext)
  // eslint-disable-next-line
  useEffect(() => getCurrentUser(), [])
  return (
    <SearchState>
      <Router>
        <Switch>
          <div className="App">
            <PrivateRoute exact path="/home" component={Home} />
            <Route exact path="/users" component={SearchResults} />
            <Route exact path="/" component={Login} />
          </div>
        </Switch>
      </Router>
    </SearchState>
  )
}

export default App

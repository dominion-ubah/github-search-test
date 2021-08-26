import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Avatar from '../../assets/avatar.svg'
import GitHub from '../../assets/GitHub-Emblem.png'
import axios from 'axios'
import SearchContext from '../../context/search/searchContext'

const GITHUB_REPO_QUERY_STRING = `
{
  viewer {
    name
    avatarUrl
    __typename
  }
}
`
const Home = () => {
  const history = useHistory()

  const { getUsers, getRepos, avatar, setAvatar } = useContext(SearchContext)
  const [user, setUser] = useState('')
  const [authUser, setAuthUser] = useState('')

  useEffect(() => {
    const body = JSON.stringify({
      query: GITHUB_REPO_QUERY_STRING
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `token ${localStorage.token} `
      }
    }
    axios.post('https://api.github.com/graphql', body, config).then((res) => {
      setAuthUser(res.data.data.viewer.name)
      setAvatar(res.data.data.viewer.avatarUrl)
    })
    // eslint-disable-next-line
  }, [])

  const handleChangeUser = (e: React.FormEvent<HTMLInputElement>) => {
    setUser(e.currentTarget.value)
  }

  const handleSearch = () => {
    if (user.length > 0) {
      getUsers(user)
        .then(() => history.push('/users'))
        .catch((err: any) => alert(err))
      getRepos(user).catch((err: any) => console.trace(err))
    } else {
      alert('Please add a value')
    }
  }

  return (
    <div>
      <div className="position-absolute d-flex justify-content-end w-100 bg-transparent py-4">
        <div className="mx-5 d-flex align-items-center">
          <div
            className="rounded-circle"
            style={{ width: 70, height: 70, borderRadius: 50 }}
          >
            <img
              src={avatar || Avatar}
              alt="Pic"
              className="img-fluid"
              style={{ borderRadius: '50%' }}
            />
          </div>
          <p className="mx-3 my-auto" style={{ fontWeight: 'bolder' }}>
            {authUser}
          </p>
        </div>
      </div>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <img src={GitHub} alt="GitHub" width={250} />
        <div
          className="form-group has-search"
          style={{ borderRadius: 100, width: '40%', position: 'relative' }}
        >
          <span
            className="fa fa-search form-control-feedback"
            style={{
              position: 'absolute',
              zIndex: 2,
              display: 'block',
              width: '5rem',
              height: '5rem',
              lineHeight: '2.375rem',
              textAlign: 'center',
              pointerEvents: 'none',
              color: '#aaa',
              top: 10,
              right: 0,
              fontSize: 20
            }}
          ></span>
          <input
            type="text"
            value={user}
            onChange={handleChangeUser}
            className="form-control py-3 px-4"
            style={{ borderRadius: 100 }}
          />
        </div>

        <button
          className="btn btn-lg btn-secondary py-2 mt-5"
          style={{ width: 250 }}
          onClick={handleSearch}
        >
          Search Github
        </button>
      </div>
    </div>
  )
}

export default Home

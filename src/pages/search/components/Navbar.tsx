import React, { useState } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import GitHub from '../../../assets/GitHub-Emblem.png'
import SearchContext from '../../../context/search/searchContext'

import Avatar from '../../../assets/avatar.svg'

const Navbar = () => {
  const [user, setUser] = useState('')
  const { avatar } = useContext(SearchContext)

  const handleChangeUser = (e: React.FormEvent<HTMLInputElement>) =>
    setUser(e.currentTarget.value)

  return (
    <nav className="navbar navbar-light justify-content-between container">
      <Link to="/home">
        <img src={GitHub} alt="GitHub" width={170} />
      </Link>
      <form className="form-inline" style={{ width: '35%' }}>
        <div
          className="form-group has-search"
          style={{ borderRadius: 100, width: '100%', position: 'relative' }}
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
              fontSize: 20,
              right: 0
            }}
          ></span>
          <input
            type="text"
            value={user}
            onChange={handleChangeUser}
            placeholder="Search"
            className="form-control"
            style={{ borderRadius: 100, padding: '15px 20px' }}
          />
        </div>
      </form>
      <ul className="d-flex align-items-center">
        <div
          className="rounded-circle"
          style={{ width: 70, height: 70, borderRadius: 50 }}
        >
          <img
            src={avatar || Avatar}
            alt="User Avatar"
            className="img-fluid"
            style={{ borderRadius: '50%' }}
          />
        </div>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#!"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            // aria-haspopup="true"
            aria-expanded="false"
          >
            Dropdown link
          </a>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <a className="dropdown-item" href="/to">
              Action
            </a>
            <a className="dropdown-item" href="/re">
              Another action
            </a>
            <a className="dropdown-item" href="/ew">
              Something else here
            </a>
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar

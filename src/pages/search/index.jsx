import { useContext } from 'react'
import SearchContext from '../../context/search/searchContext'
import Body from './components/Body'
import Navbar from './components/Navbar'

const SearchResults = () => {
  const { users, repos } = useContext(SearchContext)
  return (
    <div style={{ background: '#f9f9f9', minHeight: '260vh' }}>
      <div
        className="position-fixed top-0"
        style={{
          width: '100vw',
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
          background: '#fff',
          zIndex: 3
        }}
      >
        <Navbar />
      </div>
      <div className="d-flex justify-content-center" style={{ marginTop: 100 }}>
        <Body results={users} reposResult={repos} />
      </div>
    </div>
  )
}

export default SearchResults

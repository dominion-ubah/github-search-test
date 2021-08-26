import { useState } from 'react'
import RepoResult from './RepoResult'
import ResultItem from './ResultItem'

import Pagination from '../../../common/Pagination'
import { useEffect } from 'react'

type Obj = {
  login: string
  id: string
}
type License = {
  name: string
}
type RepoObj = {
  stargazers_count: number
  full_name: string
  description: string
  language: string
  updated_at: string
  license: License | null
  id: string
}
type ItemObj<Obj> = {
  incomplete_result: boolean
  items: Obj[]
  total_count: number
}
interface BodyPerson<ItemObj, RepoObj> {
  results: ItemObj
  reposResult: RepoObj[]
}

const Body = (props: BodyPerson<ItemObj<Obj>, RepoObj>) => {
  const { reposResult } = props
  const { items, total_count } = props.results
  const [users, setUsers] = useState(false)
  const [repos, setRepos] = useState(true)

  const [currentUsersPage, setCurrentUsersPage] = useState(1)
  const [currentReposPage, setCurrentReposPage] = useState(1)
  const [perPage] = useState(10)

  const toRepos = () => {
    setRepos(true)
    setUsers(false)
  }
  const toUsers = () => {
    setUsers(true)
    setRepos(false)
  }

  // Get current users
  const indexOfLastUser = currentUsersPage * perPage
  const indexOfFirstUser = indexOfLastUser - perPage
  const currentUsers = items?.slice(indexOfFirstUser, indexOfLastUser)

  // Get current repos
  const indexOfLastRepo = currentReposPage * perPage
  const indexOfFirstRepo = indexOfLastRepo - perPage
  const currentRepos = reposResult?.slice(indexOfFirstRepo, indexOfLastRepo)

  const paginateUsers = (pageNumber: number) => setCurrentUsersPage(pageNumber)
  const paginateRepos = (pageNumber: number) => setCurrentReposPage(pageNumber)

  // useEffect(() => console.log(currentReposPage), [currentReposPage])
  console.log(currentUsersPage)

  return (
    <div className="my-5" style={{ width: '70%', height: '100%' }}>
      <div className="row gx-5 position-relative">
        <div
          className="col-3 card card-body bg-white border-white position-fixed left-0 d-flex flex-column justify-content-center"
          style={{ height: 200, padding: '0 2.5em' }}
        >
          <button
            className={`btn d-flex justify-content-between p-3 bg-${
              repos && 'light'
            }`}
            onClick={toRepos}
          >
            <span>Repository</span>
            <span
              className="rounded-pill "
              style={{ background: 'lightgrey', padding: '2px 10px' }}
            >
              {reposResult.length}
            </span>
          </button>
          <button
            className={`btn d-flex justify-content-between p-3 bg-${
              users && 'light'
            }`}
            onClick={toUsers}
          >
            <span>Users</span>
            <span
              className="rounded-pill"
              style={{ background: 'lightgrey', padding: '2px 10px' }}
            >
              {total_count}
            </span>
          </button>
        </div>
        <div
          className="col-8 bg-transparent border-0 text-left"
          style={{ position: 'absolute', right: -15 }}
        >
          <h4 style={{ fontWeight: 700, marginBottom: 45 }}>
            {repos
              ? reposResult.length + ' repository results'
              : total_count + ' users'}
          </h4>

          {users && currentUsers && (
            <>
              {currentUsers.map((item: Obj) => (
                <ResultItem key={item.id} item={item} />
              ))}
              <Pagination
                perPage={perPage}
                totalAmount={items?.length}
                paginate={paginateUsers}
                currentPage={currentUsersPage}
              />
            </>
          )}
          {repos && currentRepos && (
            <>
              {currentRepos.map((repo: RepoObj) => (
                <RepoResult key={repo.id} repo={repo} />
              ))}
              <Pagination
                perPage={perPage}
                totalAmount={reposResult?.length}
                paginate={paginateRepos}
                currentPage={currentReposPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Body

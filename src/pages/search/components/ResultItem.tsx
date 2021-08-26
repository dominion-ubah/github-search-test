import axios from 'axios'
import { useEffect, useState } from 'react'

type Result = {
  login: string
}
interface ItemProp<Result> {
  item: Result
}

const ResultItem = (props: ItemProp<Result>) => {
  const [userDeet, setUserDeet] = useState({
    name: '',
    bio: ''
  })

  const { name, bio } = userDeet

  const fetchUserDeet = async () => {
    try {
      const res = await axios(
        `https://api.github.com/users/${props.item.login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      )
      const { name, bio } = await res.data
      setUserDeet({ name, bio })
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchUserDeet()
    // eslint-disable-next-line
  }, [])
  return (
    <div className="my-4 card card-body border-0 d-flex flex-column">
      <div className="d-flex">
        <h5 style={{ fontWeight: 600 }}>
          {name &&
            name.length > 0 &&
            name
              .split(' ')
              .map(
                (name) =>
                  name[0].toUpperCase() + name.substring(1).toLowerCase()
              )}
        </h5>
        <p className="text-muted mx-3">Telegram for Android source</p>
      </div>
      <p className="text-muted">
        {bio && bio.length > 0 && bio[0].toUpperCase() + bio.substring(1)}
      </p>
    </div>
  )
}

export default ResultItem

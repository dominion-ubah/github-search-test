type License = {
  name: string
}

type RepoItem = {
  full_name: string
  description: string
  stargazers_count: number
  language: string
  license: License | null
  updated_at: string
}

interface RepoResultProps {
  repo: RepoItem
}

const RepoResult = (props: RepoResultProps) => {
  const {
    full_name,
    description,
    stargazers_count,
    language,
    license,
    updated_at
  } = props.repo

  // console.log(new Date(updated_at).getTime() / 1000, new Date().getTime())
  // console.log(new Date(updated_at).getTime() / 1000 - new Date().getTime())
  return (
    <div className="my-4 card card-body border-0 d-flex flex-column">
      <h5 style={{ fontWeight: 600 }}>
        {full_name[0].toUpperCase() + full_name.substring(1)}
      </h5>
      <p className="text-muted">{description || '-'}</p>
      <p className="my-1 text-muted">
        {stargazers_count} Stars | {language} | {license ? license.name : 'No'}{' '}
        License | Updated 4 hours ago
      </p>
    </div>
  )
}

export default RepoResult

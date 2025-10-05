import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {getPopular} from '../api/tmdb'
import MovieGrid from '../components/MovieGrid'
import Pagination from '../components/Pagination'
import Loading from '../components/Loading'

export default function Popular() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const page = Number(params.get('page') || 1)

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')

  useEffect(() => {
    let ignore = false
    setLoading(true)
    setErr('')
    getPopular(page)
      .then(res => {
        if (!ignore) setData(res)
      })
      .catch(e => {
        if (!ignore) setErr(e.message || 'Failed to load')
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })
    return () => {
      ignore = true
    }
  }, [page])

  return (
    <section>
      <h1>Popular</h1>
      {loading && <Loading label="Loading popular movies..." />}
      {err && <p className="error">Error: {err}</p>}
      {data && <MovieGrid movies={data.results} />}
      {data && <Pagination currentPage={page} totalPages={data.total_pages} />}
    </section>
  )
}

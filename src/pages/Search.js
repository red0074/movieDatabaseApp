import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {searchMovies} from '../api/tmdb'
import MovieGrid from '../components/MovieGrid'
import Pagination from '../components/Pagination'
import Loading from '../components/Loading'

export default function Search() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const q = params.get('q') || ''
  const page = Number(params.get('page') || 1)
  const hasQuery = q.trim().length > 0

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(hasQuery)
  const [err, setErr] = useState('')

  useEffect(() => {
    if (!hasQuery) {
      setData(null)
      setLoading(false)
      setErr('')
      return () => {}
    }

    let ignore = false
    setLoading(true)
    setErr('')

    searchMovies(q, page)
      .then(res => {
        if (!ignore) setData(res)
      })
      .catch(e => {
        if (!ignore) setErr(e.message || 'Failed to search')
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [q, page, hasQuery])

  return (
    <section>
      <h2>Searched Movies</h2>
      {!hasQuery && (
        <p className="status">
          Type a movie name in the search bar above to see results.
        </p>
      )}
      {hasQuery && loading && <Loading label={`Searching for “${q}”...`} />}
      {hasQuery && err && <p className="error">Error: {err}</p>}
      {hasQuery && data && <MovieGrid movies={data.results} />}
      {hasQuery && data && (
        <Pagination currentPage={page} totalPages={data.total_pages} />
      )}
    </section>
  )
}

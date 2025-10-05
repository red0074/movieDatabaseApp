import {useEffect, useState} from 'react'
import {Link, useHistory, useLocation} from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const history = useHistory()
  const location = useLocation()

  const onSubmit = e => {
    e.preventDefault()
    const q = query.trim()
    if (q.length > 0) {
      history.push(`/search?q=${encodeURIComponent(q)}&page=1`)
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const q = params.get('q') || ''
    setQuery(q)
  }, [location.search])

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="brand">
          <Link to="/">movieDB</Link>
        </h1>
        <div className="nav-links">
          <Link to="/" className="nav-link" aria-label="Popular">
            Popular Movies
          </Link>
          <Link to="/top-rated" className="nav-link" aria-label="Top Rated">
            Top Rated Movies
          </Link>
          <Link to="/upcoming" className="nav-link" aria-label="Upcoming">
            Upcoming Movies
          </Link>
        </div>
      </div>
      <form className="search-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search movies"
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  )
}

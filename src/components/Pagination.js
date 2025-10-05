import {useHistory, useLocation} from 'react-router-dom'
import './Pagination.css'

export default function Pagination({currentPage, totalPages}) {
  const history = useHistory()
  const location = useLocation()

  const clampTotal = Math.min(totalPages || 1, 500)
  const page = Math.max(1, Math.min(currentPage || 1, clampTotal))

  const updatePage = next => {
    const params = new URLSearchParams(location.search)
    params.set('page', String(next))
    history.push(`${location.pathname}?${params.toString()}`)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  return (
    <div className="pagination">
      <button
        onClick={() => updatePage(page - 1)}
        disabled={page <= 1}
        type="button"
      >
        ◀ Prev
      </button>
      <span className="page-indicator">
        Page {page} of {clampTotal}
      </span>
      <button
        type="button"
        onClick={() => updatePage(page + 1)}
        disabled={page >= clampTotal}
      >
        Next ▶
      </button>
    </div>
  )
}

import './Pagination.css'

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPrev,
  onNext,
}) {
  const page = Math.max(1, currentPage)
  const max = Math.min(totalPages || 1, 500)

  return (
    <div className="pagination">
      <button type="button" onClick={onPrev} disabled={page <= 1}>
        Prev
      </button>

      <p className="page-indicator">{page}</p>

      <button type="button" onClick={onNext} disabled={page >= max}>
        Next
      </button>
    </div>
  )
}

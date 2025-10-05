import MovieCard from './MovieCard'
import './MovieGrid.css'

export default function MovieGrid({movies}) {
  if (!movies || movies.length === 0) {
    return <p className="empty-state">No movies found.</p>
  }
  return (
    <div className="grid">
      {movies.map(m => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  )
}

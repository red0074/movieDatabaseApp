import {useHistory} from 'react-router-dom'
import {imageUrl} from '../config'
import './MovieCard.css'

export default function MovieCard({movie}) {
  const history = useHistory()
  const poster = imageUrl(movie.poster_path, 'w500')
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'

  const goToDetails = () => {
    history.push(`/movie/${movie.id}`)
  }

  return (
    <div className="movie-card">
      <div className="poster-wrap">
        {poster ? (
          <img src={poster} alt={movie.title} className="poster" />
        ) : (
          <div className="poster placeholder">No Image</div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title" title={movie.title}>
          {movie.title}
        </h3>
        <div className="movie-meta">⭐ {rating}</div>
        <button type="button" className="details-btn" onClick={goToDetails}>
          View Details
        </button>
      </div>
    </div>
  )
}

import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {getMovieDetails, getMovieCredits} from '../api/tmdb'
import {imageUrl, profileUrl} from '../config'
import Loading from '../components/Loading'
import './MovieDetails.css'

export default function MovieDetails() {
  const {id} = useParams()

  const [details, setDetails] = useState(null)
  const [credits, setCredits] = useState(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')

  useEffect(() => {
    let ignore = false
    setLoading(true)
    setErr('')
    Promise.all([getMovieDetails(id), getMovieCredits(id)])
      .then(([d, c]) => {
        if (!ignore) {
          setDetails(d)
          setCredits(c)
        }
      })
      .catch(e => {
        if (!ignore) setErr(e.message || 'Failed to load details')
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [id])

  return (
    <section>
      {loading && <Loading label="Loading movie details..." />}
      {err && <p className="error">Error: {err}</p>}

      {details && (
        <div className="details-wrap">
          <div className="movie-details">
            <img
              className="details-poster"
              src={imageUrl(details.poster_path, 'w500') || ''}
              alt={details.title}
            />
            <div className="details-text">
              <h2>{details.title}</h2>
              <p className="sub-meta">
                ⭐{' '}
                {details.vote_average ? details.vote_average.toFixed(1) : 'N/A'}{' '}
                • {details.runtime ? `${details.runtime} min` : 'Duration N/A'}
              </p>
              <p className="sub-meta">
                {details.genres?.map(g => g.name).join(', ') || 'Genre N/A'}
              </p>
              <p className="sub-meta">
                Release Date: {details.release_date || 'N/A'}
              </p>
              <p className="overview">
                {details.overview || 'No overview available.'}
              </p>
            </div>
          </div>

          <div className="cast-section">
            <h3>Cast</h3>
            {!credits && <Loading label="Loading cast..." />}
            {credits && credits.cast && credits.cast.length > 0 ? (
              <div className="cast-grid">
                {credits.cast.map(c => (
                  <div className="cast-card" key={`${c.cast_id}-${c.id}`}>
                    {profileUrl(c.profile_path) ? (
                      <img
                        src={profileUrl(c.profile_path)}
                        alt={c.name}
                        className="cast-photo"
                      />
                    ) : (
                      <div className="cast-photo placeholder">No Image</div>
                    )}
                    <div className="cast-info">
                      <div className="cast-name">
                        {c.original_name || c.name}
                      </div>
                      <div className="cast-role">{c.character || '—'}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              credits && (
                <p className="status">No cast information available.</p>
              )
            )}
          </div>
        </div>
      )}
    </section>
  )
}

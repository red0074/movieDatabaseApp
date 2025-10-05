import Loader from 'react-loader-spinner'
import './Loading.css'

export default function Loading({label = 'Loading...'}) {
  return (
    <div className="loading">
      <Loader type="Oval" color="#22d3ee" height={40} width={40} />
      <span className="loading-label">{label}</span>
    </div>
  )
}

import {TMDB_API_KEY, TMDB_BASE_URL} from '../config'

const withKey = (params = {}) => ({
  api_key: TMDB_API_KEY,
  language: 'en-US',
  ...params,
})

const buildUrl = (path, params = {}) => {
  const url = new URL(`${TMDB_BASE_URL}/${path}`)
  const all = withKey(params)
  Object.entries(all).forEach(([k, v]) => url.searchParams.set(k, v))
  return url.toString()
}

const fetchJson = async url => {
  const res = await fetch(url)
  if (!res.ok) {
    let msg = `HTTP ${res.status}`
    // Try to parse error response safely (avoid empty catch to satisfy ESLint)
    let data = null
    try {
      data = await res.json()
    } catch (parseErr) {
      data = null
    }
    if (data?.status_message) msg = data.status_message
    throw new Error(msg)
  }
  return res.json()
}

export const getPopular = (page = 1) =>
  fetchJson(buildUrl('movie/popular', {page}))

export const getTopRated = (page = 1) =>
  fetchJson(buildUrl('movie/top_rated', {page}))

export const getUpcoming = (page = 1) =>
  fetchJson(buildUrl('movie/upcoming', {page}))

export const getMovieDetails = id => fetchJson(buildUrl(`movie/${id}`))

export const getMovieCredits = id => fetchJson(buildUrl(`movie/${id}/credits`))

export const searchMovies = (query, page = 1) =>
  fetchJson(buildUrl('search/movie', {query, page}))

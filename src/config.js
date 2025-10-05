export const TMDB_API_KEY = '676f4cde08ab98cba4c3379c30ff3820'
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

export const imageUrl = (path, size = 'w500') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null

export const profileUrl = (path, size = 'w300') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null

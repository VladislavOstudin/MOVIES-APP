import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import MoviesApiService from '../../services/MoviesApiService'
import MoviesListItem from '../MoviesListItem'

import './MoviesList.css'

export default function MoviesList({ query }) {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    MoviesApiService(query).then(setMovies).catch(setError)
  }, [query])

  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="movies-list">
      {movies.map((movie) => (
        <MoviesListItem key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

MoviesList.propTypes = {
  query: PropTypes.string,
}

MoviesList.defaultProps = {
  query: 'return',
}

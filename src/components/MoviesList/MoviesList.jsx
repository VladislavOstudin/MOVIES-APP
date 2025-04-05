import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Flex, Spin, Alert } from 'antd'

import MoviesApiService from '../../services/MoviesApiService'
import MoviesListItem from '../MoviesListItem'
import NetworkStatus from '../../services/NetworkStatus'

import './MoviesList.css'

export default function MoviesList({
  query,
  currentPage,
  setTotalResults,
  guestSessionId,
  ratedOnly,
  ratedMovies,
  onRateMovie,
}) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMovies = async () => {
    if (!guestSessionId && ratedOnly) {
      setTotalResults(0)
      setMovies([])
      return
    }
    setLoading(true)
    setError(null)

    try {
      const data = ratedOnly
        ? await MoviesApiService.getRatedMovies(guestSessionId, currentPage)
        : await MoviesApiService.searchMovies(query, currentPage)

      setMovies(data.results)
      setTotalResults(data.total_results)
    } catch (err) {
      setError(err)
      setTotalResults(0)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [query, currentPage, guestSessionId, ratedOnly])

  return (
    <div className="movies-list">
      <NetworkStatus />

      {loading && (
        <Flex align="center" gap="middle">
          <Spin size="large" />
          <span>Loading...</span>
        </Flex>
      )}

      {error && !ratedOnly && (
        <Alert
          message="Error loading data"
          description={error.message || 'Something went wrong'}
          type="error"
          showIcon
        />
      )}

      {!loading && error && movies.length === 0 && (
        <Alert message={"You haven't rated any movies yet"} type="info" showIcon />
      )}

      {!loading && !error && movies.length === 0 && (
        <Alert message={'No movies found matching this request'} type="info" showIcon />
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          {movies.map((movie) => (
            <MoviesListItem
              key={`${movie.id}`}
              movie={{
                ...movie,
                rating: ratedMovies[movie.id] || (ratedOnly ? movie.rating : 0),
              }}
              guestSessionId={guestSessionId}
              onRate={onRateMovie}
            />
          ))}
        </>
      )}
    </div>
  )
}

MoviesList.propTypes = {
  query: PropTypes.string,
  currentPage: PropTypes.number.isRequired,
  setTotalResults: PropTypes.func.isRequired,
  guestSessionId: PropTypes.string,
  ratedOnly: PropTypes.bool,
  ratedMovies: PropTypes.object,
  onRateMovie: PropTypes.func,
}

MoviesList.defaultProps = {
  query: 'return',
  guestSessionId: null,
  ratedOnly: false,
  ratedMovies: {},
  onRateMovie: () => {},
}

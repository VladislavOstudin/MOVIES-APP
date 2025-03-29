import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Flex, Spin, Alert } from 'antd'

import MoviesApiService from '../../services/MoviesApiService'
import MoviesListItem from '../MoviesListItem'
import NetworkStatus from '../../services/NetworkStatus'

import './MoviesList.css'

export default function MoviesList({ query, currentPage, setTotalResults }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!query) return

    setLoading(true)
    setError(null)

    MoviesApiService(query, currentPage)
      .then((data) => {
        setMovies(data.results)
        setTotalResults(data.total_results)
        setLoading(false)
      })
      .catch((err) => {
        setError(err)
        setLoading(false)
        setTotalResults(0)
      })
  }, [query, currentPage, setTotalResults])

  return (
    <div className="movies-list">
      <NetworkStatus />

      {loading && (
        <Flex align="center" gap="middle">
          <Spin size="large" />
          <span>Loading...</span>
        </Flex>
      )}

      {error && (
        <Alert
          message="Error loading data"
          description={error.message || 'Something went wrong'}
          type="error"
          showIcon
        />
      )}

      {!loading && !error && movies.length === 0 && (
        <Alert message="No movies found matching this request" type="info" showIcon />
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          {movies.map((movie) => (
            <MoviesListItem key={movie.id} movie={movie} />
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
}

MoviesList.defaultProps = {
  query: 'return',
}

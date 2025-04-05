import { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import MoviesApiService from './MoviesApiService'

export const GenresContext = createContext([])

export function GenresProvider({ children }) {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    async function fetchGenres() {
      try {
        const dataGenres = await MoviesApiService.getGenres()
        setGenres(dataGenres.genres || [])
      } catch (err) {
        throw new Error(err)
      }
    }

    fetchGenres()
  }, [])

  return <GenresContext.Provider value={genres}>{children}</GenresContext.Provider>
}

GenresProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

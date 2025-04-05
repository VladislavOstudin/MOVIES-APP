import { useContext } from 'react'
import PropTypes from 'prop-types'
import { format, parseISO } from 'date-fns'
import { GenresContext } from '../../services/GenreService'

import RateStars from '../RateStars'
import VoteAverage from '../VoteAverage/VoteAverage'

import './MoviesListItem.css'

export default function MoviesListItem({ movie, guestSessionId, onRate }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : 'https://upload.wikimedia.org/wikipedia/ru/a/ac/No_image_available.svg'

  function limiterOverview(overview, maxLength) {
    if (!overview) return '*Movie without description*'
    if (overview.length <= maxLength) return overview

    const truncated = overview.slice(0, maxLength)
    const lastSpace = truncated.lastIndexOf(' ')
    return `${truncated.slice(0, lastSpace).trim()}...`
  }

  const formattedReleaseDate = movie.release_date
    ? format(parseISO(movie.release_date), 'MMM d, yyyy')
    : 'Release date unknown'

  const genres = useContext(GenresContext)

  const movieGenres = (movie.genre_ids || [])
    .map((id) => {
      const genre = genres.find((g) => g.id === id)
      return genre?.name
    })
    .filter(Boolean)

  return (
    <section className="movie-item">
      <img src={posterUrl} alt={movie.title} />
      <article className="movie-item__description">
        <VoteAverage movie={movie} />
        <h2 className="movie-name">{movie.title}</h2>
        <h4 className="movie-release">{formattedReleaseDate}</h4>
        <div className="movie-genres">
          {movieGenres.length > 0 ? (
            movieGenres.map((genre) => (
              <div key={genre} className="genre">
                {genre}
              </div>
            ))
          ) : (
            <div className="genre">*No genre*</div>
          )}
        </div>
        <p className="movie-overview">{limiterOverview(movie.overview, 200)}</p>
      </article>
      <RateStars movieId={movie.id} guestSessionId={guestSessionId} onRate={onRate} initialRating={movie.rating} />
    </section>
  )
}

MoviesListItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
    rating: PropTypes.number,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  guestSessionId: PropTypes.string,
  onRate: PropTypes.func,
}

MoviesListItem.defaultProps = {
  guestSessionId: null,
  onRate: () => {},
}

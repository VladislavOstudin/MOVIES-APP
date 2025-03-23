import PropTypes from 'prop-types'
import { format, parseISO } from 'date-fns'

import './MoviesListItem.css'

export default function MoviesListItem({ movie }) {
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

  return (
    <section className="movie-item">
      <img src={posterUrl} alt={movie.title} />
      <article className="movie-item__description">
        <h2 className="movie-name">{movie.title}</h2>
        <h4 className="movie-release">{formattedReleaseDate}</h4>
        <div className="movie-genres">
          <div className="genre">Action</div>
          <div className="genre">Drama</div>
        </div>
        <p className="movie-overview">{limiterOverview(movie.overview, 150)}</p>
      </article>
    </section>
  )
}

MoviesListItem.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
  }).isRequired,
}

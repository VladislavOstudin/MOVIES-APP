import { Rate } from 'antd'
import PropTypes from 'prop-types'
import MoviesApiService from '../../services/MoviesApiService'

import './RateStars.css'

export default function RateStars({ movieId, guestSessionId, initialRating, onRate }) {
  const handleRate = async (value) => {
    if (!guestSessionId) return

    try {
      await MoviesApiService.rateMovie(movieId, value, guestSessionId)
      onRate(movieId, value)
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <Rate
      className="my-stars"
      allowHalf
      count={10}
      value={initialRating}
      onChange={handleRate}
      disabled={!guestSessionId}
    />
  )
}

RateStars.propTypes = {
  movieId: PropTypes.number.isRequired,
  guestSessionId: PropTypes.string,
  initialRating: PropTypes.number,
  onRate: PropTypes.func.isRequired,
}

RateStars.defaultProps = {
  guestSessionId: null,
  initialRating: 0,
}

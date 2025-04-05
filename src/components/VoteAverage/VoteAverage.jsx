import PropTypes from 'prop-types'

import './VoteAverage.css'

export default function VoteAverage({ movie }) {
  const voteAverage = movie.vote_average.toFixed(1)

  let colorStyle
  if (voteAverage < 3) {
    colorStyle = 'vote-average--down'
  } else if (voteAverage < 5) {
    colorStyle = 'vote-average--low'
  } else if (voteAverage < 7) {
    colorStyle = 'vote-average--middle'
  } else {
    colorStyle = 'vote-average--high'
  }

  return <div className={`vote-average ${colorStyle}`}>{voteAverage < 10 ? voteAverage : 10}</div>
}

VoteAverage.propTypes = {
  movie: PropTypes.shape({
    vote_average: PropTypes.number,
  }).isRequired,
}

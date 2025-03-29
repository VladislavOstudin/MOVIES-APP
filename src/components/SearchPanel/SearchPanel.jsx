import { useCallback } from 'react'
import { Input } from 'antd'
import { debounce } from 'lodash'
import PropTypes from 'prop-types'

import './SearchPanel.css'

export default function SearchPanel({ onSearch }) {
  const debouncedSearch = useCallback(debounce(onSearch, 777), [onSearch])

  return (
    <div className="searchPanel">
      <Input placeholder="Enter the movie title" onChange={(e) => debouncedSearch(e.target.value)} />
    </div>
  )
}

SearchPanel.propTypes = {
  onSearch: PropTypes.func.isRequired,
}

import PropTypes from 'prop-types'
import { Pagination } from 'antd'

import './PaginationPanel.css'

export default function PaginationPanel({ currentPage, totalResults, onPageChange }) {
  return (
    <div className="pagination-panel">
      <Pagination
        current={currentPage}
        total={totalResults}
        pageSize={20}
        onChange={onPageChange}
        showSizeChanger={false}
      />
    </div>
  )
}

PaginationPanel.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

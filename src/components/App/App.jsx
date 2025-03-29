import { useState } from 'react'
import Header from '../Header'
import MoviesList from '../MoviesList'
import SearchPanel from '../SearchPanel'
import PaginationPanel from '../PaginationPanel'

import './App.css'

export default function App() {
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  return (
    <>
      <Header />
      <SearchPanel
        onSearch={(q) => {
          setQuery(q)
          setCurrentPage(1)
        }}
      />
      <MoviesList query={query} currentPage={currentPage} setTotalResults={setTotalResults} />
      <PaginationPanel currentPage={currentPage} totalResults={totalResults} onPageChange={setCurrentPage} />
    </>
  )
}

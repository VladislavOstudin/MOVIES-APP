import { useEffect, useState, useRef } from 'react'
import { Tabs } from 'antd'
// import Header from '../Header'
import MoviesList from '../MoviesList'
import SearchPanel from '../SearchPanel'
import PaginationPanel from '../PaginationPanel'
import GuestSession from '../../services/GuestSession'

import './App.css'

export default function App() {
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState('1')
  const [searchPage, setSearchPage] = useState(1)
  const [ratedPage, setRatedPage] = useState(1)
  const [totalSearchResults, setTotalSearchResults] = useState(0)
  const [totalRatedResults, setTotalRatedResults] = useState(0)
  const [guestSessionId, setGuestSessionId] = useState(null)
  const [ratedMovies, setRatedMovies] = useState({})
  const [ratedRefreshKey, setRatedRefreshKey] = useState(0)
  const prevActiveTab = useRef(activeTab)

  useEffect(() => {
    async function initGuestSession() {
      const sessionId = await GuestSession()
      setGuestSessionId(sessionId)
    }
    initGuestSession()
  }, [])

  const handleRateMovie = (movieId, rating) => {
    setRatedMovies((prev) => ({
      ...prev,
      [movieId]: rating,
    }))
    setRatedRefreshKey((prev) => prev + 1)
  }

  useEffect(() => {
    if (activeTab === '2') {
      setRatedPage(1)
      setRatedRefreshKey((prev) => prev + 1)
    }
    prevActiveTab.current = activeTab
  }, [activeTab])

  return (
    <div className="main-container">
      {/* <Header /> */}
      <Tabs
        type="line"
        activeKey={activeTab}
        defaultActiveKey="1"
        centered
        onChange={setActiveTab}
        items={[
          {
            key: '1',
            label: 'Search',
            children: (
              <>
                <SearchPanel
                  onSearch={(q) => {
                    setQuery(q)
                    setSearchPage(1)
                  }}
                />
                <MoviesList
                  key={`search-${searchPage}-${query}`}
                  query={query}
                  currentPage={searchPage}
                  setTotalResults={setTotalSearchResults}
                  guestSessionId={guestSessionId}
                  ratedMovies={ratedMovies}
                  onRateMovie={handleRateMovie}
                />
              </>
            ),
          },
          {
            key: '2',
            label: 'Rated',
            children: (
              <>
                <MoviesList
                  key={`rated-${ratedPage}-${ratedRefreshKey}`}
                  query={null}
                  currentPage={ratedPage}
                  setTotalResults={setTotalRatedResults}
                  guestSessionId={guestSessionId}
                  ratedOnly={true}
                  ratedMovies={ratedMovies}
                  onRateMovie={handleRateMovie}
                />
              </>
            ),
          },
        ]}
      />

      {activeTab === '1' && totalSearchResults > 0 && (
        <PaginationPanel currentPage={searchPage} totalResults={totalSearchResults} onPageChange={setSearchPage} />
      )}
      {activeTab === '2' && totalRatedResults > 0 && (
        <PaginationPanel currentPage={ratedPage} totalResults={totalRatedResults} onPageChange={setRatedPage} />
      )}
    </div>
  )
}

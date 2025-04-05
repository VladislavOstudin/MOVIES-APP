import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './components/App'
import { GenresProvider } from './services/GenreService'

import './reset.css'
import './index.css'
import './fonts/stylesheet.css'

const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
  <GenresProvider>
    <App />
  </GenresProvider>
)

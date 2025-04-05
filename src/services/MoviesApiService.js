// eslint-disable-next-line max-len
const myApiKey =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDYxMTcxMGFkNTRkYTBmOTg2ZWRlOGNmNDFkOTJmMSIsIm5iZiI6MTc0MjIzOTU5MS4xMTAwMDAxLCJzdWIiOiI2N2Q4Nzc2NzY0NTc4MDM2ODlmMTU3ZTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.33eu8XDdfBC797SqaaPmVFa2m44bj3mBbOzIv8VolIo'

const baseUrl = 'https://api.themoviedb.org/3'

const MoviesApiService = {
  async fetchData(url, options) {
    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Error: ${errorData.status_message}`)
      }

      const res = await response.json()
      return res
    } catch (error) {
      throw new Error(error.message)
    }
  },

  async searchMovies(query, page) {
    // eslint-disable-next-line max-len
    const url = `${baseUrl}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: myApiKey,
      },
    }
    return this.fetchData(url, options)
  },

  async getRatedMovies(guestSessionId, page) {
    if (!guestSessionId) {
      throw new Error('Guest session ID is required')
    }
    // eslint-disable-next-line max-len
    const url = `${baseUrl}/guest_session/${guestSessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: myApiKey,
      },
    }
    return this.fetchData(url, options)
  },

  async rateMovie(movieId, rating, guestSessionId) {
    const url = `${baseUrl}/movie/${movieId}/rating?guest_session_id=${guestSessionId}`
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: myApiKey,
      },
      body: JSON.stringify({ value: rating }),
    }
    return this.fetchData(url, options)
  },

  async getGenres() {
    const url = `${baseUrl}/genre/movie/list?language=en-US`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: myApiKey,
      },
    }
    return this.fetchData(url, options)
  },
}

export default MoviesApiService

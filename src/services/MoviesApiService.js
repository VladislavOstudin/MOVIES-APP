export default async function MoviesApiService(query, page = 1) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        // eslint-disable-next-line max-len
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDYxMTcxMGFkNTRkYTBmOTg2ZWRlOGNmNDFkOTJmMSIsIm5iZiI6MTc0MjIzOTU5MS4xMTAwMDAxLCJzdWIiOiI2N2Q4Nzc2NzY0NTc4MDM2ODlmMTU3ZTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.33eu8XDdfBC797SqaaPmVFa2m44bj3mBbOzIv8VolIo',
    },
  }

  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(error)
  }
}

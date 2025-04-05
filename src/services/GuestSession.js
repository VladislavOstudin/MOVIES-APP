export default async function GuestSession() {
  // const existingSession = localStorage.getItem('guestSessionId')

  // if (existingSession) {
  //   // eslint-disable-next-line no-console
  //   console.log(`LOCALSTORAGE:${existingSession}`)
  //   return existingSession
  // }

  const url = 'https://api.themoviedb.org/3/authentication/guest_session/new'
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        // eslint-disable-next-line max-len
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDYxMTcxMGFkNTRkYTBmOTg2ZWRlOGNmNDFkOTJmMSIsIm5iZiI6MTc0MjIzOTU5MS4xMTAwMDAxLCJzdWIiOiI2N2Q4Nzc2NzY0NTc4MDM2ODlmMTU3ZTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.33eu8XDdfBC797SqaaPmVFa2m44bj3mBbOzIv8VolIo',
    },
  }

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    // eslint-disable-next-line no-console
    // console.log(data.guest_session_id)
    // localStorage.setItem('guestSessionId', data.guest_session_id)
    return data.guest_session_id
  } catch (error) {
    throw new Error(error)
  }
}

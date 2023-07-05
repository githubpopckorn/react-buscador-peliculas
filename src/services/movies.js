const API_KEY = "49ed5b3c"
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}`

export const searchMovies = async ({ search }) => {
  if (search === "") return []

  try {
    const response = await fetch(`${BASE_URL}&s=${search}`)
    const data = await response.json()

    if (data.Response === "True") {
      return data.Search.map((movie) => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        image: movie.Poster,
      }))
    } else {
      return []
    }
  } catch (error) {
    throw new Error('Ocurrio un error al buscar las peliculas')
  }
}

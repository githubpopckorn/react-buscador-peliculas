import "./App.css"
import { useState, useCallback } from "react"
import { Movies } from "./components/Movies"
import { useMovies } from "./hooks/useMovies"
import { useSearch } from "./hooks/useSearch"
import debounce from "just-debounce-it"

function App() {
  const [sort, setSort] = useState(false)
  const { search, setSearch, error } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ search })
  }

  const debouncedMovies = useCallback(
    debounce((search) => getMovies({ search }), 500),
    [getMovies]
  )

  const handleChange = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debouncedMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Avengers, Star Wars, The Matrix..."
            value={search}
          />
          <input type="checkbox" onChange={handleSort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>{!loading ? <Movies movies={movies} /> : <p>Cargando...</p>}</main>
    </div>
  )
}

export default App

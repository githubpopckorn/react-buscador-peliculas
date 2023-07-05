import { useState, useEffect, useRef } from "react"
export function useSearch() {
  const [search, setSearch] = useState("")
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ""
      return
    }
    if (search === "") {
      setError("Por favor ingrese un termino de busqueda")
      return
    }

    if (search.length < 3) {
      setError("Por favor ingrese al menos 3 caracteres")
      return
    }

    setError(null)
  }, [search])

  return { search, setSearch, error }
}

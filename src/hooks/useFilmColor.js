import { useState, useCallback } from 'react'
import { filmCategories, defaultFilm } from '../data/films'

/**
 * Manages film-picker selection state: the active finish category and the
 * currently selected film. Returned helpers keep components lean.
 */
export function useFilmColor(initialFilm = defaultFilm) {
  const [selectedFilm, setSelectedFilm] = useState(initialFilm)
  const [activeCategory, setActiveCategory] = useState(initialFilm.finish || filmCategories[0].id)

  const currentCategory = filmCategories.find((c) => c.id === activeCategory) || filmCategories[0]

  const selectFilm = useCallback((film) => {
    setSelectedFilm(film)
    if (film.finish) setActiveCategory(film.finish)
  }, [])

  return {
    categories: filmCategories,
    activeCategory,
    setActiveCategory,
    currentCategory,
    selectedFilm,
    selectFilm,
  }
}

export default useFilmColor

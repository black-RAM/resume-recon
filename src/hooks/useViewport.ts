import { useState, useEffect } from 'react'

const getViewport = () => ({vw: window.innerWidth / 100, vh: window.innerHeight / 100})

/**
 * React hook imitates the CSS vw and vh units
 */
const useViewport = () => {
  const [windowDimensions, setWindowDimensions] = useState(getViewport)

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getViewport())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

export default useViewport
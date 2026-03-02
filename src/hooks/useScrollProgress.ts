import { useState, useEffect, useCallback } from 'react'

export interface ScrollState {
  progress: number
  scrollTop: number
  hasPassedHero: boolean
}

export function useScrollProgress(): ScrollState {
  const [state, setState] = useState<ScrollState>({ progress: 0, scrollTop: 0, hasPassedHero: false })

  const handleScroll = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop
    const heroInitialH = window.innerHeight * 1.0  // 100vh
    const progress = Math.min(scrollTop / Math.max(heroInitialH * 0.6, 1), 1)
    const heroHeightActual = window.innerHeight * (1 + 0.5 * Math.min(progress, 1))  // 100vh -> 150vh
    const hasPassedHero = scrollTop >= heroHeightActual
    setState({ progress, scrollTop, hasPassedHero })
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return state
}

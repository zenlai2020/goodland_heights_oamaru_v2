import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { NavBar, type NavVariant } from './NavBar'
import { MenuFlyout } from './MenuFlyout'
import { useScrollProgress } from '@/hooks/useScrollProgress'

/** 顶部为深色/蓝色图时用白字，滚出该区域后切蓝字；Overview 顶部为浅色用蓝字，Joy40 全屏 hero 为蓝色底用白字 */
const ROUTES_WITH_DARK_TOP: string[] = ['/joy40']

function getNavVariant(pathname: string): NavVariant {
  return ROUTES_WITH_DARK_TOP.includes(pathname) ? 'light' : 'dark'
}

/** Joy40 顶部 hero 为 100vh，滚过整屏再切蓝字 */
function getScrollSwitchPx(pathname: string, windowHeight: number): number | undefined {
  if (pathname === '/joy40') return windowHeight
  return undefined
}

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [windowHeight, setWindowHeight] = useState(() => (typeof window !== 'undefined' ? window.innerHeight : 800))
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { progress: scrollProgress, hasPassedHero, scrollTop } = useScrollProgress()
  const navVariant = getNavVariant(location.pathname)
  const scrollSwitchPx = getScrollSwitchPx(location.pathname, windowHeight)

  useEffect(() => {
    const onResize = () => setWindowHeight(window.innerHeight)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar
        isHome={isHome}
        scrollProgress={isHome ? scrollProgress : 0}
        hasPassedHero={!isHome || hasPassedHero}
        onMenuClick={() => setMenuOpen(true)}
        variant={navVariant}
        scrollTop={scrollTop}
        scrollSwitchPx={scrollSwitchPx}
      />
      <main className="flex-1 w-full min-w-0">
        <Outlet />
      </main>
      <MenuFlyout
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </div>
  )
}

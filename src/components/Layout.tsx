import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { NavBar } from './NavBar'
import { MenuFlyout } from './MenuFlyout'
import { useScrollProgress } from '@/hooks/useScrollProgress'

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { progress: scrollProgress, hasPassedHero } = useScrollProgress()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar
        isHome={isHome}
        scrollProgress={isHome ? scrollProgress : 0}
        hasPassedHero={!isHome || hasPassedHero}
        onMenuClick={() => setMenuOpen(true)}
      />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <MenuFlyout
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </div>
  )
}

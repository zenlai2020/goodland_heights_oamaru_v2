import { Link } from 'react-router-dom'
import {
  NAV_HEIGHT_INITIAL_PX,
  NAV_HEIGHT_SCROLLED_PX,
  NAV_HEIGHT_HOME_INITIAL_PX,
  NAV_TITLE_FONT_SIZE_PX,
  NAV_TITLE_SCROLLED_FONT_SIZE_PX,
  NAV_TITLE_CONTAINER_W_PX,
  NAV_PADDING_PX,
  NAV_GAP_PX,
} from '@/constants/design'

interface NavBarProps {
  isHome: boolean
  scrollProgress?: number
  hasPassedHero?: boolean
  onMenuClick: () => void
}

export function NavBar({ scrollProgress = 0, hasPassedHero = false, onMenuClick, isHome }: NavBarProps) {
  const isScrolled = scrollProgress > 0.08
  const sloganOpacity = Math.max(0, 1 - scrollProgress * 2.5)
  const titleTransition = Math.max(0, Math.min((scrollProgress - 0.08) / 0.25, 1))

  const isHomeExpanded = isHome && !isScrolled
  const titleFontSize =
    isHomeExpanded
      ? NAV_TITLE_FONT_SIZE_PX
      : isHome
        ? NAV_TITLE_FONT_SIZE_PX - (NAV_TITLE_FONT_SIZE_PX - NAV_TITLE_SCROLLED_FONT_SIZE_PX) * titleTransition
        : undefined

  const height = isHomeExpanded
    ? NAV_HEIGHT_HOME_INITIAL_PX
    : isScrolled
      ? NAV_HEIGHT_SCROLLED_PX
      : NAV_HEIGHT_INITIAL_PX

  const textLight = isHomeExpanded

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-center overflow-hidden transition-all duration-300 ease-out ${hasPassedHero ? 'bg-background' : ''}`}
      style={{
        height: `${height}px`,
        paddingTop: `${NAV_PADDING_PX}px`,
        paddingBottom: `${NAV_PADDING_PX}px`,
        paddingLeft: `${NAV_PADDING_PX}px`,
        paddingRight: `${NAV_PADDING_PX}px`,
      }}
    >
      <div
        className="flex items-center justify-between mx-auto w-full max-w-[1440px]"
        style={{ gap: `${NAV_GAP_PX}px` }}
      >
        <Link
          to="/contact"
          className={`font-body text-sm tablet:text-base opacity-90 hover:opacity-100 transition-opacity shrink-0 ${
            textLight ? 'text-white' : 'text-primary'
          }`}
        >
          Contact us
        </Link>

        <div className="flex-1 flex flex-col items-center justify-center min-w-0 self-stretch">
          <Link
            to="/"
            className={`font-newyork text-center transition-all duration-300 leading-tight flex items-center justify-center min-h-0 ${
              textLight ? 'text-white' : 'text-primary'
            } ${!isHome ? 'text-xl tablet:text-2xl desktop:text-2xl' : ''}`}
            style={{
              fontSize: isHome ? `${titleFontSize}px` : undefined,
              maxWidth: isHomeExpanded ? `${NAV_TITLE_CONTAINER_W_PX}px` : undefined,
            }}
          >
            Goodland Heights
          </Link>
          {isHome && sloganOpacity > 0.01 && (
            <div
              className="flex items-center justify-center gap-4 tablet:gap-6 mt-2 transition-opacity duration-300"
              style={{ opacity: sloganOpacity }}
            >
              <span
                className={`h-px shrink-0 ${textLight ? 'bg-white/90' : 'bg-primary/80'}`}
                style={{ width: isHomeExpanded ? 80 : 48 }}
                aria-hidden
              />
              <span
                className={`font-body tracking-wide text-center whitespace-nowrap text-lg tablet:text-xl ${
                  textLight ? 'text-white' : 'text-primary'
                }`}
              >
                Serene Retreat for your Soul
              </span>
              <span
                className={`h-px shrink-0 ${textLight ? 'bg-white/90' : 'bg-primary/80'}`}
                style={{ width: isHomeExpanded ? 80 : 48 }}
                aria-hidden
              />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onMenuClick}
          className="p-2 hover:opacity-80 transition-opacity shrink-0"
          aria-label="Open menu"
          style={{ color: textLight ? 'white' : 'var(--color-primary)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </header>
  )
}

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

/** 非首页「深色顶」页面：滚动超过此高度后切到蓝字，避免与下方浅色内容相近 */
const NAV_SCROLL_SWITCH_PX = 140

/** 'light' = 下方为深色/蓝色时用白字；'dark' = 下方为浅色/白色时用 primary 蓝 */
export type NavVariant = 'light' | 'dark'

interface NavBarProps {
  isHome: boolean
  scrollProgress?: number
  hasPassedHero?: boolean
  onMenuClick: () => void
  /** 非首页时：根据页面顶部背景决定文字与菜单图标颜色，首页忽略 */
  variant?: NavVariant
  /** 当前滚动高度，用于在「深色顶」页面滚动后自动切蓝字，避免与浅色背景相近 */
  scrollTop?: number
  /** 可选：自定义切换高度（如 Joy40 全屏 hero 用 100vh），不传则用 NAV_SCROLL_SWITCH_PX */
  scrollSwitchPx?: number
}

export function NavBar({ scrollProgress = 0, onMenuClick, isHome, variant = 'dark', scrollTop = 0, scrollSwitchPx }: NavBarProps) {
  const isScrolled = scrollProgress > 0.08
  const sloganOpacity = Math.max(0, 1 - scrollProgress * 1.5)
  const titleTransition = Math.max(0, Math.min((scrollProgress - 0.08) / 0.5, 1))

  const isHomeExpanded = isHome && !isScrolled
  const titleFontSize =
    isHomeExpanded
      ? NAV_TITLE_FONT_SIZE_PX
      : isHome
        ? NAV_TITLE_FONT_SIZE_PX - (NAV_TITLE_FONT_SIZE_PX - NAV_TITLE_SCROLLED_FONT_SIZE_PX) * titleTransition
        : undefined

  const height =
    isHome
      ? NAV_HEIGHT_HOME_INITIAL_PX -
        (NAV_HEIGHT_HOME_INITIAL_PX - NAV_HEIGHT_SCROLLED_PX) * titleTransition
      : isScrolled
        ? NAV_HEIGHT_SCROLLED_PX
        : NAV_HEIGHT_INITIAL_PX

  const switchPx = scrollSwitchPx ?? NAV_SCROLL_SWITCH_PX
  const nonHomeUseLight = !isHome && variant === 'light' && scrollTop < switchPx

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-center overflow-hidden bg-transparent transition-[background-color] duration-300 ease-out"
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
        <div className="flex-1 flex flex-col items-start min-w-0 self-stretch">
          <div className="w-full">
            <Link
              to="/"
              state={!isHome ? { skipLanding: true } : undefined}
              className={`font-newyork leading-tight inline-block min-h-0 ${isHome ? 'whitespace-nowrap relative' : ''} ${
                !isHome ? `text-xl tablet:text-2xl desktop:text-2xl transition-colors duration-300 ${nonHomeUseLight ? 'text-white' : 'text-primary'}` : ''
              }`}
              style={{
                ...(isHome && {
                  fontSize: `${titleFontSize}px`,
                  maxWidth: isHomeExpanded ? `${NAV_TITLE_CONTAINER_W_PX}px` : undefined,
                  marginLeft: `${50 * (1 - titleTransition)}%`,
                  transform: `translateX(${-50 * (1 - titleTransition)}%)`,
                }),
                ...(!isHome && !nonHomeUseLight && {
                  textShadow: '0 0 1px rgba(255,255,255,0.5), 0 1px 2px rgba(0,0,0,0.08)',
                }),
              }}
            >
              {isHome ? (
                <>
                  <span style={{ color: 'white', opacity: 1 - titleTransition }}>Goodland Heights</span>
                  <span
                    className="absolute left-0 top-0 whitespace-nowrap"
                    style={{ color: 'var(--color-primary)', opacity: titleTransition }}
                    aria-hidden
                  >
                    Goodland Heights
                  </span>
                </>
              ) : (
                'Goodland Heights'
              )}
            </Link>
          </div>
          {isHome && sloganOpacity > 0.01 && (
            <div
              className="w-full flex items-center justify-center gap-4 tablet:gap-6 mt-2 relative"
              style={{ opacity: sloganOpacity }}
            >
              <div className="flex items-center justify-center gap-4 tablet:gap-6" style={{ opacity: 1 - titleTransition }}>
                <span className="h-px shrink-0 bg-white/90" style={{ width: isHomeExpanded ? 80 : 48 }} aria-hidden />
                <span className="font-body tracking-wide text-center whitespace-nowrap text-lg tablet:text-xl text-white">
                  A Horizon of Mountain and Sea
                </span>
                <span className="h-px shrink-0 bg-white/90" style={{ width: isHomeExpanded ? 80 : 48 }} aria-hidden />
              </div>
              <div
                className="flex items-center justify-center gap-4 tablet:gap-6 absolute inset-0"
                style={{ opacity: titleTransition }}
                aria-hidden
              >
                <span className="h-px shrink-0 bg-primary/80" style={{ width: isHomeExpanded ? 80 : 48 }} />
                <span className="font-body tracking-wide text-center whitespace-nowrap text-lg tablet:text-xl text-primary">
                  A Horizon of Mountain and Sea
                </span>
                <span className="h-px shrink-0 bg-primary/80" style={{ width: isHomeExpanded ? 80 : 48 }} />
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onMenuClick}
          className="relative p-2 hover:opacity-80 transition-opacity shrink-0 w-14 h-14 flex items-center justify-center -mt-1"
          aria-label="Open menu"
        >
          {isHome ? (
            <>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="absolute"
                style={{ opacity: 1 - titleTransition }}
                aria-hidden
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="absolute"
                style={{ opacity: titleTransition }}
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </>
          ) : (
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke={nonHomeUseLight ? 'white' : 'var(--color-primary)'}
              strokeWidth="1.5"
              strokeLinecap="round"
              className="transition-[stroke] duration-300"
              style={{
                ...(!nonHomeUseLight && { filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.4))' }),
              }}
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}

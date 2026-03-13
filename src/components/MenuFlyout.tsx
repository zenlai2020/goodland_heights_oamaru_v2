import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const STAGGER_MS = 160
const LINK_TRANSITION_MS = 550
/** 退场时长缩短为入场的一半 */
const STAGGER_MS_EXIT = 80
const LINK_TRANSITION_MS_EXIT = 275
/** 先快后慢、缓冲停止：ease-out 曲线 */
const EASE_OUT_CURVE = 'cubic-bezier(0.22, 1, 0.36, 1)'

interface MenuFlyoutProps {
  open: boolean
  onClose: () => void
}

const links = [
  { to: '/overview', label: 'Goodland Heights Oamaru' },
  { to: '/joy40', label: 'Joy 40 - Services Apartment' },
  { to: '/premiumsection', label: 'Premium Sections' },
  { href: 'https://goodland.co.nz/', label: 'About Goodland Group', external: true },
  { to: '/contact', label: 'Contact' },
]

/** 退场：最后一项 Contact 开始飘出时同步开始收底板，板与字一起往右消失 */
const CLOSE_DELAY_MS = (links.length - 1) * STAGGER_MS_EXIT

export function MenuFlyout({ open, onClose }: MenuFlyoutProps) {
  const [entered, setEntered] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!open) {
      setEntered(false)
      setIsClosing(false)
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
        closeTimeoutRef.current = null
      }
      return
    }
    const id = requestAnimationFrame(() => setEntered(true))
    return () => cancelAnimationFrame(id)
  }, [open])

  const handleOverlayClick = () => {
    if (!open) return
    setIsClosing(true)
    closeTimeoutRef.current = setTimeout(() => {
      closeTimeoutRef.current = null
      onClose()
    }, CLOSE_DELAY_MS)
  }

  const linkVisible = open && !isClosing && entered

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/20 z-50 transition-opacity duration-500 ease-out ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full z-50 transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          transition: `transform ${open ? '500ms' : '250ms'} ${EASE_OUT_CURVE}`,
          background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.7) 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <div className="relative flex flex-col h-full pt-24 px-8 pb-16 overflow-hidden ml-auto w-1/2 min-w-[280px]">
          <button
            type="button"
            onClick={handleOverlayClick}
            className="group absolute top-6 left-8 w-[60px] h-[60px] flex items-center justify-center text-primary hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-label="Close menu"
          >
            <span className="inline-block transition-transform duration-200 ease-out group-hover:rotate-45 origin-center">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="12" y1="6" x2="12" y2="18" />
                <line x1="6" y1="12" x2="18" y2="12" />
              </svg>
            </span>
          </button>
          <nav className="flex flex-col flex-1 justify-stretch">
            {links.map((link, index) => {
              const { to, href, label, external } = link
              const key = to ?? href ?? label
              const style = {
                transform: linkVisible ? 'translateX(0)' : 'translateX(100%)',
                opacity: linkVisible ? 1 : 0,
                transition: `transform ${isClosing ? LINK_TRANSITION_MS_EXIT : LINK_TRANSITION_MS}ms ${EASE_OUT_CURVE}, opacity ${isClosing ? LINK_TRANSITION_MS_EXIT : LINK_TRANSITION_MS}ms ${EASE_OUT_CURVE}`,
                transitionDelay: `${index * (isClosing ? STAGGER_MS_EXIT : STAGGER_MS)}ms`,
              }
              const baseClass = 'flex-1 flex items-center justify-center text-center font-newyork text-primary hover:text-white text-2xl tablet:text-4xl desktop:text-5xl transition-colors duration-200 border-b border-primary/15 min-h-0'
              if (external && href) {
                return (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className={baseClass}
                    style={style}
                  >
                    {label}
                  </a>
                )
              }
              return (
                <Link
                  key={key}
                  to={to!}
                  onClick={onClose}
                  className={baseClass}
                  style={style}
                >
                  {label}
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}

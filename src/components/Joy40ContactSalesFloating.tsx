import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { JOY40_SALES_CARDS } from '@/data/salesTeam'
import { SalesContactCard } from '@/components/SalesContactCard'

/** 相对整页内容「贴住」滚动：先随页面上移，此阶段持续约 SCROLL_LAG_MS */
const SCROLL_LAG_MS = 500
/** 之后过渡到钉在视口右下角区域，过渡时长（略长更易显得顺滑） */
const VIEWPORT_BLEND_DURATION_MS = 1150
/** 视为「回到页顶」的 scrollY 阈值：此时清空会话计时 */
const SCROLL_TOP_THRESHOLD = 2
/** 两次 scroll 事件间隔超过此值视为「新一段滚动」，重新走约 0.5s 跟页 + 钉视口（连续滚动不重置） */
const SCROLL_IDLE_MS = 450

/** 起止速度更柔和，比 cubic 更不易有「突然加速」感 */
function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2
}

/**
 * 临界阻尼式平滑跟随（近似 Unity SmoothDamp）
 */
function smoothDamp(
  current: number,
  target: number,
  velocityRef: { current: number },
  smoothTime: number,
  deltaTime: number,
): number {
  const st = Math.max(0.0001, smoothTime)
  const omega = 2 / st
  const x = omega * deltaTime
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x)
  const change = current - target
  const temp = (velocityRef.current + omega * change) * deltaTime
  velocityRef.current = (velocityRef.current - omega * temp) * exp
  return target + (change + temp) * exp
}

export function Joy40ContactSalesFloating() {
  const [expanded, setExpanded] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const currentOffsetRef = useRef(0)
  const velocityRef = useRef(0)
  const lastTimeRef = useRef<number | null>(null)

  /** 当前「跟页→钉视口」动画段的起点时间 */
  const scrollSessionStartRef = useRef<number | null>(null)
  /**
   * 文档空间竖直锚点：本段开始时 anchor = currentOffset + scrollY，
   * 跟页阶段目标 translateY = anchor - scrollY，与段起点连续、不会跳到「整页 -scrollY」的绝对值。
   */
  const sessionScrollAnchorRef = useRef<number | null>(null)
  /** 上一次 scroll 事件时间；用于检测停顿后的新一段滚动 */
  const lastScrollEventAtRef = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      const t = performance.now()
      const y = window.scrollY
      if (y < SCROLL_TOP_THRESHOLD) {
        lastScrollEventAtRef.current = t
        return
      }
      const last = lastScrollEventAtRef.current
      const isNewBurst = last === null || t - last > SCROLL_IDLE_MS
      if (isNewBurst) {
        scrollSessionStartRef.current = t
        sessionScrollAnchorRef.current = currentOffsetRef.current + window.scrollY
        velocityRef.current = 0
      }
      lastScrollEventAtRef.current = t
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    let raf = 0
    const loop = (now: number) => {
      const last = lastTimeRef.current ?? now
      const dt = Math.min((now - last) / 1000, 0.05)
      lastTimeRef.current = now

      const scrollY = window.scrollY

      if (scrollY < SCROLL_TOP_THRESHOLD) {
        scrollSessionStartRef.current = null
        sessionScrollAnchorRef.current = null
      } else if (scrollSessionStartRef.current === null) {
        scrollSessionStartRef.current = now
        sessionScrollAnchorRef.current = currentOffsetRef.current + scrollY
      }

      const sessionStart = scrollSessionStartRef.current
      const elapsed = sessionStart !== null ? now - sessionStart : 0

      let blend = 0
      if (scrollY >= SCROLL_TOP_THRESHOLD && elapsed >= SCROLL_LAG_MS) {
        const t = Math.min(1, (elapsed - SCROLL_LAG_MS) / VIEWPORT_BLEND_DURATION_MS)
        blend = easeInOutSine(t)
      }
      if (scrollY < SCROLL_TOP_THRESHOLD) {
        blend = 0
      }

      /** 跟页：anchor - scrollY；钉视口：blend→1 时收到 0；起点用 anchor 保证与上一帧连续 */
      const anchor = sessionScrollAnchorRef.current
      let targetTranslateY = 0
      if (anchor !== null && scrollY >= SCROLL_TOP_THRESHOLD) {
        const docOffset = anchor - scrollY
        targetTranslateY = docOffset * (1 - blend)
      }

      /**
       * blend===0 时必须硬贴 docOffset：若用 smoothDamp 跟页，current 会滞后于 target；
       * 一旦 blend>0，target 略向视口收，阻尼会先往「更负」追一帧，产生先后退再前进的错觉。
       */
      let next: number
      if (blend === 0) {
        next = targetTranslateY
        velocityRef.current = 0
      } else {
        const dampSmooth = 0.28 + blend * 0.45
        next = smoothDamp(
          currentOffsetRef.current,
          targetTranslateY,
          velocityRef,
          dampSmooth,
          dt,
        )
      }
      currentOffsetRef.current = next

      const el = wrapRef.current
      if (el) {
        el.style.left = '90%'
        el.style.right = 'auto'
        el.style.willChange = 'transform'
        el.style.transform = `translate3d(-50%, ${next}px, 0)`
      }

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lastTimeRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!expanded) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpanded(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [expanded])

  const panel = expanded
    ? createPortal(
        <div
          className="fixed z-[100] bottom-4 right-4 left-4 tablet:left-auto w-[min(100vw-2rem,34rem)] max-w-[min(100vw-2rem,34rem)] max-h-[min(90vh,720px)] overflow-y-auto rounded-xl border border-primary/25 bg-background shadow-xl p-4 tablet:p-5 flex flex-col gap-4"
          role="dialog"
          aria-modal="false"
          aria-labelledby="joy40-contact-sales-title"
        >
            <div className="flex items-start justify-between gap-3">
              <h2 id="joy40-contact-sales-title" className="font-newyork text-primary text-xl tablet:text-2xl">
                Contact Sales
              </h2>
              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="shrink-0 font-body text-sm text-primary/70 hover:text-primary px-2 py-1 rounded border border-primary/20 hover:bg-white/80"
              >
                Close
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {JOY40_SALES_CARDS.map((person) => (
                <SalesContactCard key={person.email} person={person} layout="inline" />
              ))}
            </div>
        </div>,
        document.body,
      )
    : null

  return (
    <>
      <div
        ref={wrapRef}
        className={`fixed z-[80] bottom-[calc(1.25rem+7rem)] tablet:bottom-[calc(1.75rem+7rem)] pointer-events-none transition-opacity duration-200 ${
          expanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        style={{ left: '90%', right: 'auto', transform: 'translate3d(-50%, 0, 0)' }}
      >
        <button
          type="button"
          onClick={() => setExpanded(true)}
          aria-label="Open contact sales"
          aria-expanded={expanded}
          aria-haspopup="dialog"
          className={`flex max-w-[min(92vw,22rem)] shrink-0 items-center justify-center rounded-xl border border-primary/25 bg-white/55 px-6 py-4 tablet:px-10 tablet:py-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white hover:border-primary/35 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/30 ${
            expanded ? 'pointer-events-none' : 'pointer-events-auto'
          }`}
        >
          <span className="font-newyork text-primary text-[1.9rem] tablet:text-[2rem] text-center leading-tight tracking-tight">
            Contact
            <br />
            Sales
          </span>
        </button>
      </div>
      {panel}
    </>
  )
}

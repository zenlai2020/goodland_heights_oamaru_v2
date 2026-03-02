import { useState, useEffect } from 'react'

// 文字：淡入约 2s（先快后慢）→ 停留 1.5s → 淡出约 2s（先慢后快）
const FADE_IN_MS = 2000
const DISPLAY_MS = 1500
const FADE_OUT_MS = 2000
// 左右门板向两侧推开，先快后慢的缓冲感
const DOOR_MS = 1000

interface LandingOverlayProps {
  onComplete: () => void
}

export function LandingOverlay({ onComplete }: LandingOverlayProps) {
  const [phase, setPhase] = useState<'fadeIn' | 'show' | 'fadeOut' | 'doors' | 'done'>('fadeIn')
  // 淡入时下一帧再设为可见，让透明度从 0 慢慢过渡到 100
  const [fadeInVisible, setFadeInVisible] = useState(false)

  useEffect(() => {
    if (phase === 'fadeIn') {
      const start = requestAnimationFrame(() => {
        requestAnimationFrame(() => setFadeInVisible(true))
      })
      const t = setTimeout(() => setPhase('show'), FADE_IN_MS)
      return () => {
        cancelAnimationFrame(start)
        clearTimeout(t)
      }
    }
    if (phase === 'show') {
      const t = setTimeout(() => setPhase('fadeOut'), DISPLAY_MS)
      return () => clearTimeout(t)
    }
    if (phase === 'fadeOut') {
      const t = setTimeout(() => setPhase('doors'), FADE_OUT_MS)
      return () => clearTimeout(t)
    }
    if (phase === 'doors') {
      const t = setTimeout(() => {
        setPhase('done')
        onComplete()
      }, DOOR_MS)
      return () => clearTimeout(t)
    }
  }, [phase, onComplete])

  if (phase === 'done') return null

  const textOpacity =
    phase === 'fadeIn' ? (fadeInVisible ? 'opacity-100' : 'opacity-0') :
    phase === 'show' ? 'opacity-100' :
    phase === 'fadeOut' ? 'opacity-0' : 'opacity-0'

  // 淡入：先快后慢 → ease-in；淡出：先慢后快 → ease-out
  const textTransition =
    phase === 'fadeIn'
      ? { duration: '2000ms', timing: 'ease-in' as const }
      : phase === 'fadeOut'
        ? { duration: '2000ms', timing: 'ease-out' as const }
        : { duration: '0ms', timing: 'ease-in' as const }

  const leftDoorTranslate = phase === 'doors' ? '-100%' : '0'
  const rightDoorTranslate = phase === 'doors' ? '100%' : '0'

  // doors 阶段根容器透明，才能看到左右白块移开、露出后面的 Home
  const rootBg = phase === 'doors' ? 'bg-transparent' : 'bg-white'

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center ${rootBg}`}
      aria-hidden="true"
    >
      {/* 白色底图分成左右两块，像推拉门向两侧移开，先快后慢；移开时中间露出 Home */}
      <div
        className="absolute inset-0 flex"
        style={{ zIndex: 1 }}
      >
        <div
          className="flex-1 bg-white transition-transform"
          style={{
            transform: `translateX(${leftDoorTranslate})`,
            transitionDuration: `${DOOR_MS}ms`,
            transitionTimingFunction: 'ease-out',
          }}
        />
        <div
          className="flex-1 bg-white transition-transform"
          style={{
            transform: `translateX(${rightDoorTranslate})`,
            transitionDuration: `${DOOR_MS}ms`,
            transitionTimingFunction: 'ease-out',
          }}
        />
      </div>
      {/* 居中文字：淡入 2s（0→100）→ 停 1.5s → 淡出 2s */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <span
          className={`font-newyork text-primary text-4xl tablet:text-6xl desktop:text-7xl transition-opacity ${textOpacity}`}
          style={{
            transitionDuration: textTransition.duration,
            transitionTimingFunction: textTransition.timing,
          }}
        >
          Goodland Heights
        </span>
      </div>
    </div>
  )
}

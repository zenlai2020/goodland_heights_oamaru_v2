import { useEffect, useRef } from 'react'

interface HeroSectionProps {
  scrollProgress: number
}

const HERO_INITIAL_H = 100
const HERO_FINAL_H = 150

export function HeroSection({ scrollProgress }: HeroSectionProps) {
  const heightVh = HERO_INITIAL_H + (HERO_FINAL_H - HERO_INITIAL_H) * scrollProgress
  const videoRef = useRef<HTMLVideoElement>(null)

  // 手机端微信等环境下，autoplay 可能不生效，需程序触发 play
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const play = () => {
      video.play().catch(() => {})
    }
    play()
    // 页面可见时再试一次（如从后台切回）
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') play()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  return (
    <section
      className="relative w-full overflow-hidden bg-[#e8ecf0]"
      style={{ height: `${heightVh}vh` }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-top"
        autoPlay
        muted
        loop
        playsInline
        webkit-playsinline
        x5-playsinline="true"
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
        x5-video-orientation="portrait"
        preload="auto"
        src="/images/hero_bg.mp4"
      />
      {/* Slogan 已移至 NavBar 的 1440×240 导航容器内，位于 Goodland Heights 下方 */}
    </section>
  )
}

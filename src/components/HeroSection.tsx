import { useEffect, useRef } from 'react'

interface HeroSectionProps {
  scrollProgress: number
}

const HERO_INITIAL_H = 100
const HERO_FINAL_H = 150

export function HeroSection({ scrollProgress }: HeroSectionProps) {
  const heightVh = HERO_INITIAL_H + (HERO_FINAL_H - HERO_INITIAL_H) * scrollProgress
  const videoRef = useRef<HTMLVideoElement>(null)

  // 微信：需通过 WeixinJSBridge 触发 play。WhatsApp/Telegram 等：用 canplay 重试，避免视频未加载完成时 play 失效
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const doPlay = () => {
      const isPlaying =
        video.currentTime > 0 &&
        !video.paused &&
        !video.ended &&
        video.readyState > 2
      if (!isPlaying) {
        video.play().catch(() => {})
      }
    }

    const isWeChat = /MicroMessenger/i.test(navigator.userAgent)

    if (isWeChat && window.WeixinJSBridge) {
      window.WeixinJSBridge.invoke('getNetworkType', {}, doPlay)
    } else if (isWeChat) {
      document.addEventListener('WeixinJSBridgeReady', () => {
        window.WeixinJSBridge?.invoke('getNetworkType', {}, doPlay)
      })
    } else {
      doPlay()
    }

    // WhatsApp、Telegram 等内置浏览器：视频加载完成后再试一次（部分 WebView 需此步骤）
    const onCanPlay = () => doPlay()
    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('loadeddata', onCanPlay)

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (isWeChat && window.WeixinJSBridge) {
          window.WeixinJSBridge.invoke('getNetworkType', {}, doPlay)
        } else {
          doPlay()
        }
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('loadeddata', onCanPlay)
    }
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
        x-webkit-airplay="allow"
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

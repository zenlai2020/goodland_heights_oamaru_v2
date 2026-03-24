interface HeroSectionProps {
  scrollProgress: number
}

const HERO_INITIAL_H = 100
const HERO_FINAL_H = 150

export function HeroSection({ scrollProgress }: HeroSectionProps) {
  const heightVh = HERO_INITIAL_H + (HERO_FINAL_H - HERO_INITIAL_H) * scrollProgress

  return (
    <section
      className="relative w-full overflow-hidden bg-[#e8ecf0]"
      style={{ height: `${heightVh}vh` }}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover object-top"
        autoPlay
        muted
        loop
        playsInline
        webkit-playsinline
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
        x5-video-orientation="portrait"
        preload="auto"
      >
        {/* WebM 供现代浏览器使用；MP4 供微信、Safari 等使用（X5 内核不支持 WebM） */}
        <source src="/images/hero_bg.webm" type="video/webm" />
        <source src="/images/hero_bg.mp4" type="video/mp4" />
      </video>
      {/* Slogan 已移至 NavBar 的 1440×240 导航容器内，位于 Goodland Heights 下方 */}
    </section>
  )
}

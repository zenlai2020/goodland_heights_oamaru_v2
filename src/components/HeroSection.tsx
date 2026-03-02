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
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(/images/hero_bg.webp)` }}
      />
      {/* Slogan 已移至 NavBar 的 1440×240 导航容器内，位于 Goodland Heights 下方 */}
    </section>
  )
}

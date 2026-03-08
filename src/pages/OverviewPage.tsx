import { useState } from 'react'
import { Footer } from '@/components/Footer'
import { FeaturesSection } from '@/components/FeaturesSection'

export function OverviewPage() {
  const [isCalloutVisible, setIsCalloutVisible] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Master plan section: joy40_bg 背景，地图 + callout */}
      <section className="w-full pt-[90px] pb-12 tablet:pt-[96px] tablet:pb-16 desktop:pt-[96px] desktop:pb-16 px-6 tablet:px-10 desktop:px-10 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/joy40_bg.webp)' }}>
        <div className="w-full tablet:max-w-tablet desktop:max-w-desktop mx-auto flex flex-col tablet:flex-row desktop:flex-row tablet:items-stretch desktop:items-stretch gap-6 tablet:gap-8 desktop:gap-8">
          <div
            className="flex-1 w-full aspect-[16/9] tablet:aspect-[16/9] desktop:aspect-[2/1] rounded-xl overflow-hidden relative"
            onMouseEnter={() => setIsCalloutVisible(true)}
            onMouseLeave={() => setIsCalloutVisible(false)}
          >
            <img src="/images/01_Overview.webp" alt="Master plan" className="w-full h-full object-cover" />
            <div
              className="absolute pointer-events-none w-[25%] min-w-[200px] max-w-[800px] aspect-[1/1]"
              style={{ left: '52%', top: '33%' }}
            >
              <svg
                width="100%"
                height="auto"
                viewBox="-10 -340 880 350"
                preserveAspectRatio="xMinYMin meet"
                fill="none"
                className="text-primary"
              >
                <path
                  d="M 0 0 L 300 -330 L 860 -330"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 1030,
                    strokeDashoffset: isCalloutVisible ? 0 : 1030,
                    transition: 'stroke-dashoffset 0.5s ease-out',
                    transitionDelay: isCalloutVisible ? '500ms' : '0ms',
                  }}
                />
                <circle
                  cx="0"
                  cy="0"
                  r="9"
                  fill="currentColor"
                  style={{
                    opacity: isCalloutVisible ? 1 : 0,
                    transition: 'opacity 0.3s ease-out',
                    transitionDelay: isCalloutVisible ? '800ms' : '0ms',
                  }}
                />
              </svg>
              {/* 横线上方：Phase 2 : Joy 40，右缘与横线右端对齐；Phase 2 在 Phase 1 播完后播 */}
              <div
                className="absolute right-[1.2%] top-0 -translate-y-[calc(100%-2px)] text-right font-body text-primary text-base font-medium whitespace-nowrap transition-opacity duration-300"
                style={{
                  opacity: isCalloutVisible ? 1 : 0,
                  transitionDelay: isCalloutVisible ? '900ms' : '0ms',
                }}
              >
                Phase 2 : Joy 40
              </div>
              {/* 横线下方：Service Apartment，右缘与横线右端对齐 */}
              <div
                className="absolute right-[1.2%] top-0 mt-2 text-right font-body text-primary/80 text-sm whitespace-nowrap transition-opacity duration-300"
                style={{
                  opacity: isCalloutVisible ? 1 : 0,
                  transitionDelay: isCalloutVisible ? '900ms' : '0ms',
                }}
              >
                Service Apartment
              </div>
            </div>

            {/*
              第二个 callout 可调参数：
              ① 起始点（折线圆点在地图上的位置）：改下面 style 的 left、top（如 '65%' '52%'）。
              ② 斜线：path 里第一个 L 的 two numbers → "L 300 -330" 表示从 (0,0) 到 (300,-330)。
                 改大 300 或把 -330 的绝对值改大 = 斜线更长；改小 = 更短。负号表示向上。
              ③ 横线：path 里第二个 L → "L 860 -330" 表示横线终点 (860,-330)，横线长度 = 860 - 300 = 560。
                 改 860 即可改横线长度（变大=更长，变小=更短）；-330 保持与斜线终点一致才水平。
              ④ viewBox 必须包住整条 path 的所有点，否则会被裁掉看不见！
                 viewBox="minX minY 宽 高"：path 里用到的 x 要在 [minX, minX+宽] 内，y 要在 [minY, minY+高] 内。
                 例如 path 到 (860,-330)，则 minY 要 ≤-330，宽要 ≥860+余量。你之前 "-30 -200 600 200" 只包住 x≤570、y≥-200，所以 (860,-330) 在框外，横线被裁掉。
              ⑤ strokeDasharray / strokeDashoffset 要 ≥ 路径总长，否则横线会被截断（已设 3000）。
            */}
            <div
              className="absolute pointer-events-none w-[25%] min-w-[200px] max-w-[800px] aspect-[1/1]"
              style={{ left: '62%', top: '50%' }}
            >
              <svg
                width="100%"
                height="auto"
                viewBox="-10 -220 880 220"
                preserveAspectRatio="xMinYMin meet"
                fill="none"
                className="text-primary"
              >
                {/* 斜线与 Phase 2 同斜率：330/300=1.1，故 200 对应 220 → (200,-220)；横线 y=-220，viewBox 顶即横线故 top-0 对齐 */}
                <path
                  d="M 0 0 L 200 -220 L 860 -220"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 3000,
                    strokeDashoffset: isCalloutVisible ? 0 : 3000,
                    transition: isCalloutVisible ? 'stroke-dashoffset 0.85s ease-out' : 'stroke-dashoffset 0.28s ease-out',
                    transitionDelay: '0ms',
                  }}
                />
                <circle
                  cx="0"
                  cy="0"
                  r="9"
                  fill="currentColor"
                  style={{
                    opacity: isCalloutVisible ? 1 : 0,
                    transition: 'opacity 0.25s ease-out',
                    transitionDelay: isCalloutVisible ? '150ms' : '0ms',
                  }}
                />
              </svg>
              {/* Phase 1：线伸出较慢、文字与圆点较快出现 */}
              <div
                className="absolute right-[1.2%] top-0 -translate-y-[calc(100%-2px)] text-right font-body text-primary text-base font-medium whitespace-nowrap transition-opacity duration-300"
                style={{
                  opacity: isCalloutVisible ? 1 : 0,
                  transitionDelay: isCalloutVisible ? '150ms' : '0ms',
                }}
              >
                Phase 1 : Premium Section
              </div>
              <div
                className="absolute right-[1.2%] top-0 mt-2 text-right font-body text-primary/80 text-sm whitespace-nowrap transition-opacity duration-300"
                style={{
                  opacity: isCalloutVisible ? 1 : 0,
                  transitionDelay: isCalloutVisible ? '150ms' : '0ms',
                }}
              >
                Individual Lots
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Masterplan: 版式参考首页 A Horizon of Mountain and Sea，左侧标题、右下左对齐正文，无按钮 */}
      <section className="w-full min-h-[480px] tablet:min-h-[560px] desktop:min-h-[640px] pt-10 tablet:pt-12 desktop:pt-16 pb-12 tablet:pb-16 desktop:pb-20 px-6 tablet:px-10 desktop:px-10 bg-background">
        <div className="w-full max-w-[1440px] mx-auto min-h-[400px] tablet:min-h-[480px] desktop:min-h-[520px] grid grid-cols-1 tablet:grid-cols-[1.15fr_1fr] gap-10 tablet:gap-12 desktop:gap-16">
          <div className="flex flex-col items-start justify-start text-left">
            <h2 className="font-newyork text-primary font-semibold tracking-tight">
              <span className="text-6xl tablet:text-7xl desktop:text-7xl">The Masterplan</span>
            </h2>
          </div>
          <div className="flex flex-col items-start justify-end text-left tablet:ml-10 desktop:ml-16">
            <div className="font-body text-primary/90 text-sm tablet:text-base desktop:text-base max-w-xl tablet:max-w-md desktop:max-w-lg leading-relaxed space-y-4 tablet:space-y-5">
              <p>
                Goodland Heights is envisioned as a hillside community that evolves gradually over time. Beyond the first residences, the masterplan explores opportunities for additional neighbourhoods across the surrounding landscape.
              </p>
              <p>
                Future stages of development will expand the residential areas while introducing shared community amenities designed to support everyday life.
              </p>
              <p>
                Plans for the future include a small community centre, light commercial spaces, and gathering areas that may host cafés, creative studios, and neighbourhood services.
              </p>
              <p>
                Walking paths and landscaped corridors will connect different parts of the community, creating a neighbourhood that remains closely linked to the surrounding natural environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full overflow-hidden shrink-0 px-6 tablet:px-10 desktop:px-10">
        <div className="w-full max-w-[1440px] mx-auto">
          <img
            src="/images/joy40_exterior.webp"
            alt="Joy40 exterior"
            className="w-full h-auto object-cover object-center block"
          />
        </div>
      </section>

      {/* The First Neighbourhood：镜像版式，正文在左、标题在右；正文与下图间距同 The Masterplan */}
      <section className="w-full min-h-[480px] tablet:min-h-[560px] desktop:min-h-[640px] pt-10 tablet:pt-12 desktop:pt-16 pb-12 tablet:pb-16 desktop:pb-20 px-6 tablet:px-10 desktop:px-10 bg-background">
        <div className="w-full max-w-[1440px] mx-auto min-h-[400px] tablet:min-h-[480px] desktop:min-h-[520px] grid grid-cols-1 tablet:grid-cols-[1fr_1.15fr] gap-10 tablet:gap-12 desktop:gap-16">
          <div className="flex flex-col items-start justify-end text-left tablet:mr-10 desktop:mr-16 tablet:ml-8 desktop:ml-14 order-2 tablet:order-1">
            <div className="font-body text-primary/90 text-sm tablet:text-base desktop:text-base max-w-xl tablet:max-w-md desktop:max-w-lg leading-relaxed space-y-4 tablet:space-y-5">
              <p>
                The first stage of Goodland Heights introduces the initial homes that establish the character of the community.
              </p>
              <p>
                Premium Sections provide generous hillside residential sites where future homes can respond naturally to the surrounding landscape and views.
              </p>
              <p>
                Alongside them, Joy40 Service Apartments introduce a flexible living model designed for remote professionals, long-stay residents, and lifestyle investors seeking a quieter way of living.
              </p>
              <p>
                Together, these residences form the beginning of the Goodland Heights neighbourhood — a place where architecture, landscape, and lifestyle are carefully balanced.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end justify-start text-right order-1 tablet:order-2">
            <h2 className="font-newyork text-primary font-semibold tracking-tight">
              <span className="text-6xl tablet:text-7xl desktop:text-7xl">The First Neighbourhood</span>
            </h2>
          </div>
        </div>
      </section>

      <section className="w-full overflow-hidden shrink-0 px-6 tablet:px-10 desktop:px-10 flex justify-center -mt-6 tablet:-mt-8 desktop:-mt-10">
        <div className="w-full max-w-[1440px] mx-auto flex justify-center">
          <img
            src="/images/location map.webp"
            alt="Location map"
            className="max-w-full max-h-[85vh] w-auto h-auto object-contain block"
          />
        </div>
      </section>

      {/* 图下两栏：左侧距离列表，右侧正文 + CTA，格式参考截图 */}
      <section className="w-full py-12 tablet:py-16 desktop:py-20 px-6 tablet:px-10 desktop:px-10 bg-background">
        <div className="w-full max-w-[1440px] mx-auto grid grid-cols-1 tablet:grid-cols-[1fr_2fr] gap-10 tablet:gap-16 desktop:gap-20">
          <div className="flex flex-col gap-8 tablet:gap-10">
            <div>
              <h3 className="font-newyork text-primary font-medium text-2xl tablet:text-3xl desktop:text-3xl uppercase tracking-wide mb-4">
                Within 5 kilometers:
              </h3>
              <ul className="font-body text-primary/90 text-xs tablet:text-sm space-y-2" aria-label="Within 5 kilometers">
                <li className="flex items-baseline gap-2">
                  <span className="text-primary shrink-0" aria-hidden>→</span>
                  <span>Main Town Street (Thames Street Commercial District)</span>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="text-primary shrink-0" aria-hidden>→</span>
                  <span>Oamaru Harbour Area</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-newyork text-primary font-medium text-2xl tablet:text-3xl desktop:text-3xl uppercase tracking-wide mb-4">
                Within 15 kilometers:
              </h3>
              <ul className="font-body text-primary/90 text-xs tablet:text-sm space-y-2" aria-label="Within 15 kilometers">
                <li className="flex items-baseline gap-2">
                  <span className="text-primary shrink-0" aria-hidden>→</span>
                  <span>Bushy Beach Penguin Viewing Area (Wild Yellow-eyed Penguins)</span>
                </li>
                <li className="flex items-baseline gap-2">
                  <span className="text-primary shrink-0" aria-hidden>→</span>
                  <span>Oamaru Blue Penguin Colony</span>
                </li>
              </ul>
            </div>
          </div>
          {/* 右侧正文：手动调位置可改下一行 — items-end=靠右 / items-start=靠左 / items-center=居中；ml-*=与左栏间距(如 ml-8, ml-12, ml-16, ml-20, ml-24) */}
          <div className="flex flex-col justify-center items-end tablet:ml-0 desktop:ml-0 w-full min-w-0">
            {/* 正文块宽度可改为 max-w-xl / max-w-2xl / max-w-3xl 等 */}
            <p className="font-body text-primary/90 text-base tablet:text-lg desktop:text-lg leading-relaxed w-full max-w-xl mb-8 tablet:mb-10">
              6 hectares of bushland separate the island from the hustle and bustle of the city, offering a peaceful and private life on the island. Yet, you can reach convenient living facilities within minutes.
            </p>
            <a href="/overview#location" className="font-body text-primary text-sm tablet:text-base uppercase tracking-wide inline-flex items-center gap-1 border-b border-primary pb-0.5 w-fit hover:opacity-80 transition-opacity">
              Explore the area
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="w-full overflow-hidden shrink-0 px-6 tablet:px-10 desktop:px-10">
        <div className="w-full max-w-[1440px] mx-auto">
          <img
            src="/images/joy community.webp"
            alt="Joy community"
            className="w-full h-auto object-cover object-center block"
          />
        </div>
      </section>

      {/* Joy Community：版式同 The Masterplan，左侧标题、右下左对齐正文 */}
      <section className="w-full min-h-[480px] tablet:min-h-[560px] desktop:min-h-[640px] pt-10 tablet:pt-12 desktop:pt-16 pb-12 tablet:pb-16 desktop:pb-20 px-6 tablet:px-10 desktop:px-10 bg-background">
        <div className="w-full max-w-[1440px] mx-auto min-h-[400px] tablet:min-h-[480px] desktop:min-h-[520px] grid grid-cols-1 tablet:grid-cols-[1.15fr_1fr] gap-10 tablet:gap-12 desktop:gap-16">
          <div className="flex flex-col items-start justify-start text-left">
            <h2 className="font-newyork text-primary font-semibold tracking-tight">
              <span className="text-6xl tablet:text-7xl desktop:text-7xl">Joy Community</span>
            </h2>
          </div>
          <div className="flex flex-col items-start justify-end text-left tablet:ml-10 desktop:ml-16">
            <div className="font-body text-primary/90 text-sm tablet:text-base desktop:text-base max-w-xl tablet:max-w-md desktop:max-w-lg leading-relaxed space-y-4 tablet:space-y-5">
              <p>
                At the heart of Goodland Heights is the emerging idea of Joy Community — an approach to living that embraces slower rhythms, creativity, and connection.
              </p>
              <p>
                Rather than simply creating housing, the vision explores how smaller coastal towns like Oamaru can support new ways of living and working.
              </p>
              <p>
                For digital professionals, creative residents, and those seeking a quieter lifestyle, such communities offer an alternative to large cities — combining natural surroundings, cultural character, and flexible living.
              </p>
              <p>
                Joy Community represents an evolving concept that connects people, place, and lifestyle within thoughtfully designed neighbourhoods.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FeaturesSection />

      <section className="w-full max-w-none overflow-hidden shrink-0 aspect-[21/9] bg-background-alt">
        <img
          src="/images/location_s.webp"
          alt="Oamaru location"
          className="w-full h-full object-cover object-center block"
        />
      </section>
      <div className="flex-1" />
      <Footer />
    </div>
  )
}

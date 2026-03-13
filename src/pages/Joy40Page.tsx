import { useState } from 'react'
import { Footer } from '@/components/Footer'

const housingTypes = [
  { type: 'Apartment Type 1', desc: '1 bedroom, 1 bathroom, 1 living room, 1 kitchen', image: '/images/1a_axo.webp', id: 1 },
  { type: 'Apartment Type 2', desc: '1 bedroom, 1 bathroom, 1 living room, 1 kitchen', image: '/images/2a_axo.webp', id: 2 },
  { type: 'Apartment Type 3', desc: '1 bedroom, 1 bathroom, 1 kitchen', image: '/images/3a_axo.webp', id: 3 },
]

const carouselImagesByType: Record<number, string[]> = {
  1: ['/images/a1a_1.png', '/images/a1a_2.png', '/images/a1a_3.png'],
  2: ['/images/a2a_1.png', '/images/a2a_2.png', '/images/a2a_3.png'],
  3: ['/images/a3a_1.png', '/images/a3a_2.png', '/images/a3a_3.png'],
}

export function Joy40Page() {
  const [selectedType, setSelectedType] = useState(2)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [carouselOpacity, setCarouselOpacity] = useState(1)
  const [pendingCarouselIndex, setPendingCarouselIndex] = useState<number | null>(null)

  const handleCarouselChange = (newIndex: number) => {
    if (newIndex === carouselIndex && !pendingCarouselIndex) return
    if (pendingCarouselIndex !== null) return
    setPendingCarouselIndex(newIndex)
    setCarouselOpacity(0)
    setTimeout(() => {
      setCarouselIndex(newIndex)
      setPendingCarouselIndex(null)
      setCarouselOpacity(1)
    }, 300)
  }
  const carouselImages = carouselImagesByType[selectedType]

  return (
    <div className="min-h-screen min-w-0 flex flex-col bg-background">
      {/* Hero: 与 joy40_interior 完全一致——仅 img w-full h-auto，无固定高度，随宽度等比缩放 */}
      <section className="w-full overflow-hidden">
        <img
          src="/images/joy40_exterior.webp"
          alt="Joy40 exterior"
          className="w-full h-auto object-cover object-center block"
        />
      </section>

      {/* Intro: 版式参考 Overview 页 The Masterplan，左侧大标题、右侧左对齐正文 */}
      <section className="w-full min-h-[480px] tablet:min-h-[560px] desktop:min-h-[640px] pt-10 tablet:pt-12 desktop:pt-16 pb-12 tablet:pb-16 desktop:pb-20 px-6 tablet:px-10 desktop:px-10 bg-background">
        <div className="w-full max-w-[1440px] mx-auto min-h-[400px] tablet:min-h-[480px] desktop:min-h-[520px] grid grid-cols-1 tablet:grid-cols-[1.15fr_1fr] gap-10 tablet:gap-12 desktop:gap-16">
          <div className="flex flex-col items-start justify-start text-left">
            <h2 className="font-newyork text-primary font-semibold tracking-tight">
              <span className="text-6xl tablet:text-7xl desktop:text-7xl">A Smarter Way to Live, Work, and Stay</span>
            </h2>
          </div>
          <div className="flex flex-col items-start justify-end text-left tablet:ml-10 desktop:ml-16">
            <div className="font-body text-primary/90 text-sm tablet:text-base desktop:text-base max-w-xl tablet:max-w-md desktop:max-w-lg leading-relaxed space-y-4 tablet:space-y-5">
              <p>
                Joy40 introduces a limited collection of thoughtfully designed service apartments within the Goodland Heights community in Oamaru. Created for remote professionals, long-stay travellers, and lifestyle residents, the residences combine private comfort with shared community living.
              </p>
              <p>
                Set on the gentle hills above the coastline, Joy40 offers a quiet environment where modern living meets the natural beauty of North Otago.
              </p>
            </div>
          </div>
        </div>
      </section>

        {/* Apartment Type */}
        <section className="w-full py-16 tablet:py-24 desktop:py-24 px-6 tablet:px-10 desktop:px-10 bg-background">
          <div className="w-full tablet:max-w-tablet desktop:max-w-desktop mx-auto">
            <header className="text-center mb-12 tablet:mb-16 desktop:mb-16">
              <h2 className="font-newyork text-primary font-semibold tracking-tight text-6xl tablet:text-7xl desktop:text-7xl mb-3">
                Apartment Type
              </h2>
              <p className="font-body text-primary/90 text-base tablet:text-lg desktop:text-lg max-w-xl mx-auto">
                Joy40 offers a range of apartment types designed for flexibility and long-stay comfort.
              </p>
            </header>
            <div className="grid grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-3 gap-8">
              {housingTypes.map((h) => {
                const isSelected = selectedType === h.id
                return (
                  <button
                    key={h.type}
                    type="button"
                    onClick={() => {
                      setSelectedType(h.id)
                      setCarouselIndex(0)
                    }}
                    className={`flex flex-col text-left bg-background-alt rounded-lg overflow-hidden border-2 transition-colors ${
                      isSelected ? 'border-primary' : 'border-primary/10 hover:border-primary/30'
                    }`}
                  >
                    <div className="aspect-[1/1] overflow-hidden bg-background">
                      <img
                        src={h.image}
                        alt={h.type}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-body font-medium text-primary mb-1">{h.type}</h3>
                      <p className="font-body text-primary/70 text-sm">{h.desc}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Featured property */}
        <section className="w-full py-16 tablet:py-24 desktop:py-24 px-6 tablet:px-10 desktop:px-10 bg-background border-t border-primary/10">
          <div className="w-full tablet:max-w-tablet desktop:max-w-desktop mx-auto">
            <div className="grid grid-cols-1 tablet:grid-cols-[7fr_3fr] desktop:grid-cols-[7fr_3fr] gap-8 tablet:gap-10 desktop:gap-12 items-start">
              {/* Left: larger image */}
              <div className="relative order-1">
                <div className="aspect-[4/3] tablet:aspect-[4/3] desktop:aspect-[3/2] rounded-lg overflow-hidden bg-background relative">
                  <img
                    src={carouselImages[carouselIndex]}
                    alt={housingTypes.find(h => h.id === selectedType)?.type ?? 'Apartment Type 1'}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                    style={{ opacity: carouselOpacity }}
                  />
                  <button
                    type="button"
                    onClick={() => handleCarouselChange((carouselIndex - 1 + 3) % 3)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center hover:opacity-90 transition-opacity"
                    aria-label="Previous image"
                  >
                    <img src="/images/arrow.webp" alt="" className="w-full h-full object-contain" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCarouselChange((carouselIndex + 1) % 3)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center hover:opacity-90 transition-opacity"
                    aria-label="Next image"
                  >
                    <img src="/images/arrow.webp" alt="" className="w-full h-full object-contain scale-x-[-1]" />
                  </button>
                </div>
                <div className="flex justify-center items-center gap-3 mt-3 w-[180px] mx-auto">
                  {carouselImages.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleCarouselChange(i)}
                      className={`h-0.5 transition-all duration-200 ${
                        i === carouselIndex ? 'flex-[2] bg-primary' : 'flex-[1] min-w-[24px] bg-gray-400'
                      }`}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
              {/* Right: floor plan at top, then details */}
              <div className="flex flex-col order-2">
                <div className="w-full aspect-[3/2] rounded-lg overflow-hidden bg-background mb-4">
                  <img
                    src="/images/03_building plan.webp"
                    alt="Floor plan"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="pl-6">
                  <h3 className="font-newyork text-primary text-2xl mb-1">{housingTypes.find(h => h.id === selectedType)?.type ?? 'Apartment Type 1'}</h3>
                  <p className="font-body text-primary/80 text-sm mb-4">40.5m²</p>
                  <button
                    type="button"
                    className="w-fit mt-16 px-6 py-3 border-2 border-primary text-primary font-body text-sm rounded hover:bg-primary hover:text-white transition-colors"
                  >
                    Booking Viewing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* 全屏宽图：暂时不显示 */}
      {false && (
      <section className="w-full overflow-hidden">
        <img
          src="/images/joy40_interior.webp"
          alt="Joy40 interior"
          className="w-full h-auto object-cover object-center"
        />
      </section>
      )}

      {/* A New Model for Flexible Living：版式参考 Overview 页 The First Neighbourhood，正文在左、标题在右 */}
      <section className="w-full min-h-[480px] tablet:min-h-[560px] desktop:min-h-[640px] pt-10 tablet:pt-12 desktop:pt-16 pb-12 tablet:pb-16 desktop:pb-20 px-6 tablet:px-10 desktop:px-10 bg-background">
        <div className="w-full max-w-[1440px] mx-auto min-h-[400px] tablet:min-h-[480px] desktop:min-h-[520px] grid grid-cols-1 tablet:grid-cols-[1fr_1.15fr] gap-10 tablet:gap-12 desktop:gap-16">
          <div className="flex flex-col items-start justify-end text-left tablet:mr-10 desktop:mr-16 tablet:ml-8 desktop:ml-14 order-2 tablet:order-1">
            <div className="font-body text-primary/90 text-sm tablet:text-base desktop:text-base max-w-xl tablet:max-w-md desktop:max-w-lg leading-relaxed space-y-4 tablet:space-y-5">
              <p>
                Joy40 reimagines the service apartment for modern lifestyles. Designed for digital professionals, creative travellers, and long-stay residents, the apartments offer a balance of independence and community.
              </p>
              <p>
                Each residence provides a comfortable private living space, while shared facilities and thoughtful planning support a low-maintenance and socially connected lifestyle.
              </p>
              <p>
                Here, residents can enjoy both privacy and a sense of belonging within a future-oriented neighbourhood.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end justify-start text-right order-1 tablet:order-2">
            <h2 className="font-newyork text-primary font-semibold tracking-tight">
              <span className="text-6xl tablet:text-7xl desktop:text-7xl">A New Model for Flexible Living</span>
            </h2>
          </div>
        </div>
      </section>

      {/* Sampleboard：与 joy40_interior 一致，img w-full h-auto，容器随图高度完整展示 */}
      <section className="w-full overflow-hidden">
        <img
          src="/images/sampleboard.webp"
          alt="Sample board"
          className="w-full h-auto object-cover object-center block"
        />
      </section>

      {/* Simple, Contemporary Living：版式参考 A Smarter Way to Live, Work, and Stay，左侧标题、右侧正文；Design features 及列表在正文下方 */}
      <section className="w-full min-h-[480px] tablet:min-h-[560px] desktop:min-h-[640px] pt-10 tablet:pt-12 desktop:pt-16 pb-12 tablet:pb-16 desktop:pb-20 px-6 tablet:px-10 desktop:px-10 bg-background border-t border-primary/10">
        <div className="w-full max-w-[1440px] mx-auto min-h-[400px] tablet:min-h-[480px] desktop:min-h-[520px] grid grid-cols-1 tablet:grid-cols-[1.15fr_1fr] gap-10 tablet:gap-12 desktop:gap-16">
          <div className="flex flex-col items-start justify-start text-left">
            <h2 className="font-newyork text-primary font-semibold tracking-tight">
              <span className="text-6xl tablet:text-7xl desktop:text-7xl">Simple, Contemporary Living</span>
            </h2>
          </div>
          <div className="flex flex-col items-start justify-end text-left tablet:ml-10 desktop:ml-16">
            <div className="font-body text-primary/90 text-sm tablet:text-base desktop:text-base max-w-xl tablet:max-w-md desktop:max-w-lg leading-relaxed space-y-4 tablet:space-y-5">
              <p>
                The apartments are designed with efficient layouts and natural light, creating comfortable spaces for both living and remote work. Large windows frame views of the surrounding hills and the distant ocean horizon, bringing the landscape into everyday life. Carefully considered interiors and compact layouts make the homes easy to maintain while remaining comfortable for longer stays.
              </p>
              <h3 className="font-body font-medium text-primary text-sm tablet:text-base desktop:text-base pt-2 tablet:pt-4">
                Design features
              </h3>
              <ul className="space-y-2 list-disc list-inside text-primary/90 text-sm tablet:text-base desktop:text-base">
                <li>Contemporary apartment layouts</li>
                <li>Efficient use of space</li>
                <li>Natural light and open living areas</li>
                <li>Private balconies in selected units</li>
                <li>Modern interior finishes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

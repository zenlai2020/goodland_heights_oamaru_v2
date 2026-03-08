import { useState, useRef, useEffect } from 'react'
import { Footer } from '@/components/Footer'

const housingTypes = [
  { type: 'Land 1', desc: '1 bedroom, 1 bathroom, living room', image: '/images/1a_axo.webp', id: 1 },
  { type: 'Land 2', desc: '2 bedrooms, 1 bathroom, open plan', image: '/images/2a_axo.webp', id: 2 },
  { type: 'Land 3', desc: '3 bedrooms, 2 bathrooms, family space', image: '/images/3a_axo.webp', id: 3 },
]

const carouselImagesByType: Record<number, string[]> = {
  1: ['/images/a1a_1.png', '/images/a1a_2.png', '/images/a1a_3.png'],
  2: ['/images/a2a_1.png', '/images/a2a_2.png', '/images/a2a_3.png'],
  3: ['/images/a3a_1.png', '/images/a3a_2.png', '/images/a3a_3.png'],
}

export function PropertiesPage() {
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
  const [isCalloutVisible, setIsCalloutVisible] = useState(false)
  const [calloutSize, setCalloutSize] = useState({ width: 0, height: 0 })
  const calloutRef = useRef<HTMLDivElement>(null)
  const carouselImages = carouselImagesByType[selectedType]

  useEffect(() => {
    const el = calloutRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setCalloutSize({ width: Math.round(width), height: Math.round(height) })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="pt-[78px]">
        {/* Overview / Map section */}
        <section className="w-full py-12 tablet:py-16 desktop:py-16 px-6 tablet:px-10 desktop:px-10 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/joy40_bg.webp)' }}>
          <div className="w-full tablet:max-w-tablet desktop:max-w-desktop mx-auto flex flex-col tablet:flex-row desktop:flex-row tablet:items-stretch desktop:items-stretch gap-6 tablet:gap-8 desktop:gap-8">
            <div
              className="flex-1 w-full aspect-[16/9] tablet:aspect-[16/9] desktop:aspect-[2/1] rounded-xl overflow-hidden relative"
              onMouseEnter={() => setIsCalloutVisible(true)}
              onMouseLeave={() => setIsCalloutVisible(false)}
            >
              <img src="/images/01_Overview.webp" alt="Master plan" className="w-full h-full object-cover" />
              {/* Callout: bent line + text, positioned by % within master plan container */}
              <div
                ref={calloutRef}
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
                  {/* Path: anchor (0,0) -> right-up to (240,-330) -> horizontal to (860,-330) */}
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
                      transitionDelay: isCalloutVisible ? '0ms' : '0.2s',
                    }}
                  />
                  {/* Anchor dot */}
                  <circle
                    cx="0"
                    cy="0"
                    r="9"
                    fill="currentColor"
                    style={{
                      opacity: isCalloutVisible ? 1 : 0,
                      transition: 'opacity 0.3s ease-out',
                    }}
                  />
                  </svg>
                {/* 文字：在第二段横线上方，右对齐，与折线末端端点对齐 */}
                <div
                  className="absolute right-0 top-0 -translate-y-[calc(100%+6px)] text-right font-body text-primary text-base font-medium whitespace-nowrap transition-opacity duration-300"
                  style={{
                    opacity: isCalloutVisible ? 1 : 0,
                    transitionDelay: isCalloutVisible ? '400ms' : '0ms',
                  }}
                >
                  <p>Sector 2: Lot 10</p>
                  <p className="text-primary/80 text-sm mt-0.5">Future Parks</p>
                </div>
                {/* 调试：显示 Callout 实际宽高，上线前可删除 */}
                <div className="absolute bottom-1 right-1 font-mono text-xs text-primary/80 bg-white/90 px-2 py-1 rounded shadow">
                  {calloutSize.width} × {calloutSize.height} px
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Housing Type */}
        <section className="w-full py-16 tablet:py-24 desktop:py-24 px-6 tablet:px-10 desktop:px-10 bg-background">
          <div className="w-full tablet:max-w-tablet desktop:max-w-desktop mx-auto">
            <header className="text-center mb-12">
              <h2 className="font-newyork text-primary text-2xl tablet:text-3xl desktop:text-3xl mb-2">
                Housing Type
              </h2>
              <p className="font-body text-primary/80 text-sm tablet:text-base desktop:text-base max-w-xl mx-auto">
                A calm, premium housing community between mountain and sea
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
                      <p className="font-body text-primary/70 text-sm mb-4">{h.desc}</p>
                      <span className="font-body text-primary text-sm inline-flex items-center gap-1">
                        Read More +
                      </span>
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
                    alt="House 01-A"
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
                  <h3 className="font-newyork text-primary text-2xl mb-1">House 01-A</h3>
                  <p className="font-body text-primary/80 text-sm mb-4">40.5m²</p>
                  <div className="flex flex-col gap-2 mb-4">
                    <p className="font-body text-primary/80 text-sm flex items-center gap-2">
                      <span className="w-4 h-4 bg-primary/20 rounded" aria-hidden />
                      Joy 40 Serviced Apartments
                    </p>
                    <p className="font-body text-primary/80 text-sm flex items-center gap-2">
                      <span className="w-4 h-4 bg-primary/20 rounded" aria-hidden />
                      First Ridge Road 1141
                    </p>
                  </div>
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
      </div>
      <Footer />
    </div>
  )
}

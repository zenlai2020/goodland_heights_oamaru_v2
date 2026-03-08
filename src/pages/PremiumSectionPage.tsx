import { useState } from 'react'
import { Footer } from '@/components/Footer'

const carouselImages = ['/images/land_01.webp', '/images/land_02.webp', '/images/land_03.webp']
const plotLabels = ['Private Plot 01', 'Private Plot 02', 'Private Plot 03']
const plotAreas = ['500㎡', '514㎡', '507㎡']

export function PremiumSectionPage() {
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
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* 顶部图片 */}
      <section className="w-full overflow-hidden">
        <img
          src="/images/premiumsection_top.webp"
          alt="Premium Section"
          className="w-full h-auto object-cover object-center block"
        />
      </section>

      {/* A Limited Collection：版式参考 Joy40 页 A Smarter Way to Live, Work, and Stay */}
      <section className="w-full min-h-[360px] tablet:min-h-[420px] desktop:min-h-[480px] pt-12 tablet:pt-16 desktop:pt-20 pb-8 tablet:pb-10 desktop:pb-12 px-6 tablet:px-10 desktop:px-10 bg-background">
        <div className="w-full max-w-[1440px] mx-auto min-h-[280px] tablet:min-h-[340px] desktop:min-h-[380px] grid grid-cols-1 tablet:grid-cols-[1.15fr_1fr] gap-10 tablet:gap-12 desktop:gap-16">
          <div className="flex flex-col items-start justify-start text-left">
            <h2 className="font-newyork text-primary font-semibold tracking-tight">
              <span className="text-6xl tablet:text-7xl desktop:text-7xl">A Limited Collection</span>
            </h2>
          </div>
          <div className="flex flex-col items-start justify-end text-left tablet:ml-10 desktop:ml-16">
            <div className="font-body text-primary/90 text-sm tablet:text-base desktop:text-base max-w-xl tablet:max-w-md desktop:max-w-lg leading-relaxed space-y-4 tablet:space-y-5">
              <p>
                The first release at Goodland Heights includes around 20 premium residential sections, forming the initial stage of the hillside community.
              </p>
              <p>
                A number of sites have already been secured, making this a limited opportunity to establish a home within the early neighbourhood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plot 图：A Limited Collection 下方 */}
      <section className="w-full overflow-hidden pt-8 tablet:pt-10 desktop:pt-12 pb-12 tablet:pb-16 desktop:pb-20 px-6 tablet:px-10 desktop:px-10">
        <div className="w-full max-w-[900px] mx-auto">
          <img
            src="/images/premiumsection_plot.webp"
            alt="Premium Section plot"
            className="w-full h-auto object-cover object-center block"
          />
        </div>
      </section>

        {/* Featured property */}
        <section className="w-full py-16 tablet:py-24 desktop:py-24 px-6 tablet:px-10 desktop:px-10 bg-background border-t border-primary/10">
          <div className="w-full tablet:max-w-tablet desktop:max-w-desktop mx-auto">
            <div className="grid grid-cols-1 tablet:grid-cols-[7fr_3fr] desktop:grid-cols-[7fr_3fr] gap-8 tablet:gap-10 desktop:gap-12 items-start">
              {/* Left: carousel image */}
              <div className="relative order-1">
                <div className="aspect-[4/3] tablet:aspect-[4/3] desktop:aspect-[3/2] rounded-lg overflow-hidden bg-background relative">
                  <img
                    src={carouselImages[carouselIndex]}
                    alt={plotLabels[carouselIndex]}
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
              {/* Right: Gallery + details */}
              <div className="flex flex-col order-2">
                <div className="pl-6">
                  <h2 className="font-newyork text-primary font-semibold tracking-tight text-6xl tablet:text-7xl desktop:text-7xl mb-12 tablet:mb-16 desktop:mb-20">
                    Plots Gallery
                  </h2>
                  <h3 className="font-newyork text-primary text-2xl mb-4 tablet:mb-6">{plotLabels[carouselIndex]}</h3>
                  <p className="font-body text-primary/80 text-base tablet:text-lg mb-4">{plotAreas[carouselIndex]}</p>
                  <button
                    type="button"
                    className="w-fit mt-8 px-6 py-3 border-2 border-primary text-primary font-body text-sm rounded hover:bg-primary hover:text-white transition-colors"
                  >
                    Booking Viewing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      <Footer />
    </div>
  )
}

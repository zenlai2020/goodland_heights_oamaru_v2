import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { LandingOverlay } from '@/components/LandingOverlay'
import { HeroSection } from '@/components/HeroSection'
import { ProductsSection } from '@/components/ProductsSection'
import { WhyOamaruSection } from '@/components/WhyOamaruSection'
// import { FeaturesSection } from '@/components/FeaturesSection'
import { Footer } from '@/components/Footer'

export function HomePage() {
  const location = useLocation()
  const skipLanding = location.state?.skipLanding === true
  const [landingDone, setLandingDone] = useState(skipLanding)
  const { progress: scrollProgress } = useScrollProgress()

  return (
    <>
      {!landingDone && (
        <LandingOverlay onComplete={() => setLandingDone(true)} />
      )}
      <div className="min-h-screen flex flex-col">
        <HeroSection scrollProgress={scrollProgress} />
        <div className="w-full flex-1">
          <ProductsSection />
          <div className="w-full px-6 tablet:px-10 desktop:px-10 bg-background" aria-hidden>
            <div className="h-px min-h-px bg-primary/20 w-full tablet:max-w-tablet desktop:max-w-desktop mx-auto" />
          </div>
          <WhyOamaruSection />
          <div className="w-full px-6 tablet:px-10 desktop:px-10 bg-background" aria-hidden>
            <div className="h-px min-h-px bg-primary/20 w-full tablet:max-w-tablet desktop:max-w-desktop mx-auto" />
          </div>
          {/* <FeaturesSection /> */}
        </div>
        <Footer />
      </div>
    </>
  )
}

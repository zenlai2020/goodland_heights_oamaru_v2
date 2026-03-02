import { Footer } from '@/components/Footer'

export function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="pt-[78px] flex-1 py-16 tablet:py-24 desktop:py-24 px-6 tablet:px-10 desktop:px-10">
        <div className="w-full tablet:max-w-tablet desktop:max-w-desktop mx-auto">
          <h1 className="font-newyork text-primary text-3xl tablet:text-4xl desktop:text-4xl mb-6">
            About Goodland Heights
          </h1>
          <p className="font-body text-primary/90 max-w-2xl leading-relaxed">
            Goodland Heights is a premium residential community in Oamaru, New Zealand,
            designed for those who seek a balance between natural surroundings and modern living.
            We offer prime sites and home & land packages tailored to your lifestyle.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

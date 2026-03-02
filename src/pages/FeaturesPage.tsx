import { Footer } from '@/components/Footer'

const features = [
  { title: 'Natural Surrounding', description: 'Embrace the tranquility of nature' },
  { title: 'Active Lifestyle', description: 'Engage in a vibrant community' },
  { title: 'Digital Nomad', description: 'Work from anywhere, anytime' },
]

export function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="pt-[78px] flex-1 py-16 tablet:py-24 desktop:py-24 px-6 tablet:px-10 desktop:px-10">
        <div className="w-full tablet:max-w-tablet desktop:max-w-desktop mx-auto">
          <h1 className="font-newyork text-primary text-3xl tablet:text-4xl desktop:text-4xl mb-4">
            Features
          </h1>
          <p className="font-body text-primary/80 text-base mb-12 max-w-xl">
            A closer look at what Oamaru has to offer
          </p>
          <div className="grid grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-3 gap-8">
            {features.map((f) => (
              <article key={f.title} className="p-6 rounded-lg bg-background-alt border border-primary/10">
                <h2 className="font-body font-medium text-primary text-lg mb-2">{f.title}</h2>
                <p className="font-body text-primary/80 text-sm">{f.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

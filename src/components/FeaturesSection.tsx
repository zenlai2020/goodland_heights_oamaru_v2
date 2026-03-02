import { Link } from 'react-router-dom'

const features = [
  {
    title: 'Natural Surrounding',
    description: 'Embrace the tranquility of nature',
    image: '/images/feature_nature.webp',
  },
  {
    title: 'Active Lifestyle',
    description: 'Engage in a vibrant community',
    image: '/images/feature_elder.webp',
  },
  {
    title: 'Digital Nomad',
    description: 'Work from anywhere, anytime',
    image: '/images/feature_digitalnomad.webp',
  },
]

export function FeaturesSection() {
  return (
    <section className="w-full py-16 tablet:py-24 desktop:py-24 px-6 tablet:px-10 desktop:px-10 bg-background">
      <div className="w-full tablet:max-w-tablet desktop:max-w-desktop mx-auto">
        <header className="text-center mb-12 tablet:mb-16 desktop:mb-16">
          <h2 className="font-newyork text-primary text-2xl tablet:text-3xl desktop:text-3xl mb-2">
            Features
          </h2>
          <p className="font-body text-primary/90 text-sm tablet:text-base desktop:text-base max-w-xl mx-auto">
            A truly premium, thriving community between new realms and old
          </p>
        </header>
        <div className="grid grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-3 gap-8 tablet:gap-6 desktop:gap-6">
          {features.map((f) => (
            <article key={f.title} className="flex flex-col bg-background rounded-lg overflow-hidden">
              <div className="aspect-[400/283] overflow-hidden bg-background-alt">
                <img
                  src={f.image}
                  alt={f.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 tablet:p-6 desktop:p-6 flex flex-col gap-2">
                <h3 className="font-body font-medium text-primary text-base">
                  {f.title}
                </h3>
                <p className="font-body text-primary/80 text-sm">
                  {f.description}
                </p>
                <Link
                  to="/features"
                  className="font-body text-primary text-sm mt-2 hover:opacity-80 transition-opacity inline-flex items-center gap-1"
                >
                  Read More
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'

export function ProductsSection() {
  return (
    <section className="w-full py-16 tablet:py-24 desktop:py-24 px-6 tablet:px-10 desktop:px-10 bg-background border-t border-primary/10">
      <div className="w-full tablet:max-w-tablet desktop:max-w-desktop mx-auto">
        <header className="text-center mb-12 tablet:mb-16 desktop:mb-16">
          <h2 className="font-newyork text-primary text-2xl tablet:text-4xl desktop:text-5xl font-light mb-2">
            Explore the residences
          </h2>
          <p className="font-newyork text-primary/90 text-base tablet:text-lg desktop:text-xl font-extralight max-w-3xl mx-auto">
            A community shaped by landscape, lifestyle, and thoughtful design.
          </p>
        </header>
        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-2 gap-8 tablet:gap-12 desktop:gap-12">
          <article className="flex flex-col group/product1">
            <Link
              to="/premiumsection"
              className="block relative aspect-[4/3] rounded-lg overflow-hidden bg-background-alt mb-4 cursor-pointer"
            >
              <img
                src="/images/product_01.webp"
                alt="Premium Sections"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/product1:opacity-100 transition-opacity duration-300"
                aria-hidden
              >
                <span className="text-white font-newyork text-2xl tablet:text-3xl desktop:text-3xl text-center w-[60%] scale-150">
                  Premium Sections
                </span>
              </div>
            </Link>
            <h3 className="font-body font-medium text-primary text-lg mb-1">
              Premium Sections
            </h3>
            <p className="font-body text-primary/80 text-sm">
              Generous residential sites set across the hills of Goodland Heights, offering space, views, and the opportunity to create a home connected to nature.
            </p>
          </article>
          <article className="flex flex-col group/product2">
            <Link
              to="/joy40"
              className="block relative aspect-[4/3] rounded-lg overflow-hidden bg-background-alt mb-4 cursor-pointer"
            >
              <img
                src="/images/product_02.webp"
                alt="Joy40 Service Apartments"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/product2:opacity-100 transition-opacity duration-300"
                aria-hidden
              >
                <div className="w-[60%] scale-150 flex items-center justify-center translate-y-6">
                  <img
                    src="/images/joy40 logo-white.svg"
                    alt=""
                    className="w-full h-auto object-contain"
                    aria-hidden
                  />
                </div>
              </div>
            </Link>
            <h3 className="font-body font-medium text-primary text-lg mb-1">
              Joy40 Service Apartments
            </h3>
            <p className="font-body text-primary/80 text-sm">
              A collection of thoughtfully designed service apartments created for modern lifestyles, combining private comfort with shared community living.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

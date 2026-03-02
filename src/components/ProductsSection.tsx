export function ProductsSection() {
  return (
    <section className="w-full py-16 tablet:py-24 desktop:py-24 px-6 tablet:px-10 desktop:px-10 bg-background border-t border-primary/10">
      <div className="w-full tablet:max-w-tablet desktop:max-w-desktop mx-auto">
        <header className="text-center mb-12 tablet:mb-16 desktop:mb-16">
          <h2 className="font-newyork text-primary text-2xl tablet:text-3xl desktop:text-3xl mb-2">
            Products
          </h2>
          <p className="font-body text-primary/90 text-sm tablet:text-base desktop:text-base max-w-xl mx-auto">
            Find what suits your needs and elevate your life
          </p>
        </header>
        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-2 gap-8 tablet:gap-12 desktop:gap-12">
          <article className="flex flex-col">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-background-alt mb-4">
              <img
                src="/images/product_01.jpg"
                alt="Prime Sites"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-body font-medium text-primary text-lg mb-1">
              Prime Sites
            </h3>
            <p className="font-body text-primary/80 text-sm">
              Build your dream home overlooking the Oamaru Harbour
            </p>
          </article>
          <article className="flex flex-col">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-background-alt mb-4">
              <img
                src="/images/product_02.png"
                alt="Home & Land"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-body font-medium text-primary text-lg mb-1">
              Home & Land
            </h3>
            <p className="font-body text-primary/80 text-sm">
              Thoughtful layouts provide space to grow
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}

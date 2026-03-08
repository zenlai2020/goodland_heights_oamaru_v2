import { Link } from 'react-router-dom'

/**
 * 版式：主标题 + 副标题在左上角（大字号），正文 + CTA 在右下角（小字号），不对称布局。
 */
export function WhyOamaruSection() {
  return (
    <section className="w-full min-h-[480px] tablet:min-h-[560px] desktop:min-h-[640px] pt-10 tablet:pt-12 desktop:pt-16 pb-12 tablet:pb-16 desktop:pb-20 px-6 tablet:px-10 desktop:px-10 bg-background">
      <div className="w-full max-w-[1440px] mx-auto min-h-[400px] tablet:min-h-[480px] desktop:min-h-[520px] grid grid-cols-1 tablet:grid-cols-[1.15fr_1fr] gap-10 tablet:gap-12 desktop:gap-16">
        {/* 左上：主标题，大字号 */}
        <div className="flex flex-col items-start justify-start text-left">
          <h2 className="font-newyork text-primary font-light tracking-tight whitespace-nowrap">
            <span className="text-2xl tablet:text-4xl desktop:text-4xl">A Horizon of </span> 
            <span className="text-3xl tablet:text-5xl desktop:text-7xl">Mountain and Sea</span>
          </h2>
        </div>

        {/* 右下：正文 + Enquiry Now，在容器内左对齐，整体稍往右移 */}
        <div className="flex flex-col items-start justify-end text-left tablet:ml-10 desktop:ml-16">
          <div className="font-body text-primary/90 text-sm tablet:text-base desktop:text-base max-w-xl tablet:max-w-md desktop:max-w-lg leading-relaxed space-y-4 tablet:space-y-5 mb-8 tablet:mb-10">
            <p>
              Set on the gentle hills above Oamaru, Goodland Heights looks out across a rare meeting of mountain landscapes and the Pacific Ocean.
            </p>
            <p>
              The horizon stretches wide, offering light, space, and a sense of quiet distance from the pace of city life.
            </p>
            <p>
              Here, nature and thoughtful planning come together to create a place for living, retreat, and inspiration.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-10 py-4 border-2 border-primary text-primary font-body text-base tablet:text-lg font-medium rounded transition-colors hover:bg-black hover:border-black hover:text-white"
          >
            Enquiry Now
          </Link>
        </div>
      </div>
    </section>
  )
}

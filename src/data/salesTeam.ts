export type SalesPhone = { display: string; tel: string }

export type SalesPerson = {
  title: string
  image: string
  phones: SalesPhone[]
  email: string
}

export const SALES_TEAM: SalesPerson[] = [
  {
    title: 'For Joy40 Sales',
    image: '/images/sales1.webp',
    phones: [
      { display: '022 580 9115', tel: '0225809115' },
      { display: '03 352 6166', tel: '033526166' },
    ],
    email: 'casey.laulala@harcourtsgold.co.nz',
  },
  {
    title: 'For Joy40 Sales',
    image: '/images/sales2.webp',
    phones: [
      { display: '03 434 3496', tel: '034343496' },
      { display: '027 420 3461', tel: '0274203461' },
    ],
    email: 'jan.meikle@harcourts.co.nz',
  },
  {
    title: 'For Premium Sections',
    image: '/images/sales3.webp',
    phones: [{ display: '(021) 0422068', tel: '0210422068' }],
    email: 'info@goodland.co.nz',
  },
]

/** Contact 页中间列与 Joy40 悬浮窗：前两张 Joy40 销售卡片 */
export const JOY40_SALES_CARDS = SALES_TEAM.slice(0, 2)

export type SalesPhone = { display: string; tel: string }

export type SalesPerson = {
  title: string
  /** 右侧标题下方一行，与 title 同字号风格 */
  name: string
  image: string
  phones: SalesPhone[]
  email: string
}

export const SALES_TEAM: SalesPerson[] = [
  {
    title: 'For Joy40 Sales',
    name: 'Casey Laulala',
    image: '/images/sales1.webp',
    phones: [
      { display: '022 580 9115', tel: '0225809115' },
      { display: '03 352 6166', tel: '033526166' },
    ],
    email: 'casey.laulala@harcourtsgold.co.nz',
  },
  {
    title: 'For Joy40 Sales',
    name: 'Jan Meikle',
    image: '/images/sales2.webp',
    phones: [
      { display: '03 434 3496', tel: '034343496' },
      { display: '027 420 3461', tel: '0274203461' },
    ],
    email: 'jan.meikle@harcourts.co.nz',
  },
  {
    title: 'For Premium Sections',
    name: 'Justin Wu',
    image: '/images/sales3.webp',
    phones: [{ display: '(021) 0422068', tel: '0210422068' }],
    email: 'justin.wu@raywhite.com',
  },
]

/** Contact 页中间列与 Joy40 悬浮窗：前两张 Joy40 销售卡片 */
export const JOY40_SALES_CARDS = SALES_TEAM.slice(0, 2)

/** Premium Section 页悬浮窗：Contact 页第三张卡片（For Premium Sections） */
export const PREMIUM_SECTION_SALES_CARDS = [SALES_TEAM[2]]

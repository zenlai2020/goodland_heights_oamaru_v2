/**
 * 设计稿基准：Figma 原设计宽度为 1440px（Desktop）。
 * 注意：用户提供的截图可能是 2x 导出（即 2880px 宽），
 * 校验或从截图量取尺寸时需按设计宽度 1440 换算（截图量得的值 ÷ 2 = 设计稿 px）。
 */

/** 三档视口宽度（断点 min-width）：手机 / 平板 / 电脑 */
export const VIEWPORT_MOBILE_PX = 375
export const VIEWPORT_TABLET_PX = 800
export const VIEWPORT_DESKTOP_PX = 1440

export const DESIGN_BASE_WIDTH_PX = VIEWPORT_DESKTOP_PX

/** 导航栏：设计稿 78px 高，滚动后 72px（容纳 32px 标题 + 上下留白）*/
export const NAV_HEIGHT_INITIAL_PX = 78
export const NAV_HEIGHT_SCROLLED_PX = 72

/** 首页导航容器：1440×240，含大标题与副标题 */
export const NAV_HEIGHT_HOME_INITIAL_PX = 240

/** 首页大标题：96px 字号，容器 828×200；滚动后 32px */
export const NAV_TITLE_FONT_SIZE_PX = 96
export const NAV_TITLE_SCROLLED_FONT_SIZE_PX = 32
export const NAV_TITLE_CONTAINER_W_PX = 828
export const NAV_TITLE_CONTAINER_H_PX = 200

/** 导航栏 padding（Figma layout_FNRTQF: padding 20px）*/
export const NAV_PADDING_PX = 20

/** 导航栏左右元素间距（Figma gap 40px）*/
export const NAV_GAP_PX = 40

/** 毛玻璃强度（Figma effect_7HOVW3: blur 64px）*/
export const NAV_BACKDROP_BLUR_PX = 64

/** Hero 区域在设计稿中的高度（Figma layout_AGHI7O: 900px @ 1440）≈ 83.3% 视口 */
export const HERO_HEIGHT_DESIGN_PX = 900

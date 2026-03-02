# Goodland Heights Oamaru v2

React + TypeScript + Vite + Tailwind CSS website for Goodland Heights Oamaru, based on the Figma design.

**设计稿与截图说明**：Figma 原设计宽度为 **1440px**（Desktop）。若提供的截图是 2x 导出（图像宽度 2880px），校验时请按 1440 基准换算：**截图上的量取数值 ÷ 2 = 设计稿 px**。本仓库内所有尺寸均按 1440 设计宽度实现。

## 三档视口（断点）

| 设备 | 视口宽度 | 断点 (min-width) | Tailwind 前缀 | 内容最大宽度 |
|------|----------|-------------------|---------------|--------------|
| 手机 | 375px    | 默认              | （无）        | 100%         |
| 平板 | 800px    | 800px             | `tablet:`     | 800px        |
| 电脑 | 1440px   | 1440px            | `desktop:`    | 1440px       |

- **Desktop**：苹果/PC 等 ≥1440px 宽时使用。
- **Tablet**：平板 800px～&lt;1440px 时使用。
- **Mobile**：手机 &lt;800px 时使用（设计基准宽度 375px）。

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view locally.

## Fonts

Place your font files in `public/fonts/`:

- **NewYork_PERSONAL_USE**.otf (or .ttf) – headings / “Goodland Heights” branding
- **AlimamaFangYuanTiVF-Thin**.otf (or .ttf) – body / UI text

If the files are missing, the app falls back to system fonts (Georgia, system-ui).

## Routes

- `/` – Home (Landing → Hero, Products, Why Oamaru, Features, Footer)
- `/properties` – Properties (overview, housing types, featured property)
- `/about` – About
- `/contact` – Contact
- `/features` – Features

## Design notes

- **Landing**: Blue “Goodland Heights” fades in, shows 3s, fades out; two white panels slide apart to reveal Home.
- **Home scroll**: Nav and “Goodland Heights” title shrink; slogan “Serene Retreat for your Soul” (with side lines) fades out; hero height grows and background image zooms.
- **Menu**: Hamburger opens a right-side flyout with Features, Properties, About, Contact.

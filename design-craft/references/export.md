# 設計稿匯出指南

本文件說明如何將 design-craft skill 產生的單檔 HTML（React + Babel）匯出為各種格式。

## PDF 匯出

### 方法 A：瀏覽器列印（Print to PDF）

適合：單頁設計、infographic、快速輸出。

**步驟：**
1. 在瀏覽器開啟 HTML 檔案
2. 按 `Ctrl+P`（Windows/Linux）或 `Cmd+P`（macOS）
3. 目的地選「Save as PDF」或「另存為 PDF」

**建議設定：**

| 設定項目 | 建議值 |
|---------|--------|
| 紙張大小 | A4 或自訂（例如 1920×1080） |
| 邊界 | 無（None / 0） |
| 縮放比例 | 100% |
| 背景圖形 | 勾選（必須勾選，否則背景色/圖不會輸出） |

> 注意：Chrome 的「無邊界」模式仍可能留有細邊，可在 HTML 加上 `@page { margin: 0; }` CSS 消除。

### 方法 B：Playwright / Puppeteer（程式化匯出）

適合：批次處理、自動化 CI/CD、需要精準像素控制的輸出。安裝：`npm install playwright && npx playwright install chromium`

**Node.js 範例（ESM）：**
```javascript
import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

// Set viewport to match your design dimensions
await page.setViewportSize({ width: 1440, height: 900 });

// Use absolute path; file:// URI required for local files
await page.goto('file:///absolute/path/to/design.html');

// Wait for fonts and animations to settle
await page.waitForTimeout(500);

// Export as PDF
await page.pdf({
  path: 'output.pdf',
  width: '1440px',
  height: '900px',
  printBackground: true, // required for background colors and images
});

// Export as PNG screenshot
await page.screenshot({
  path: 'output.png',
  fullPage: false,
  clip: { x: 0, y: 0, width: 1440, height: 900 },
});

await browser.close();
```

**Retina（2x）截圖：**
```javascript
const context = await browser.newContext({
  deviceScaleFactor: 2, // 2x pixel density
});
const page = await context.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
// ...navigate and screenshot as above
```

### 方法 C：wkhtmltopdf（不推薦）

`wkhtmltopdf` 使用舊版 WebKit 引擎（約 Qt 5.x），存在以下限制：

- **不支援 React / Babel**：JSX 在瀏覽器端 transpile 無法正確執行
- **CSS 支援度差**：Flexbox、Grid、CSS 變數、`backdrop-filter` 等現代語法不穩定
- **字型渲染差異大**：Google Fonts 等外部字型可能無法載入

僅在無法使用 Playwright 的環境中考慮使用，且需事先測試輸出結果。

## 截圖匯出（PNG / JPG）

**瀏覽器 DevTools：** F12 → `Ctrl+Shift+P` / `Cmd+Shift+P` → 輸入 `Capture screenshot`，可選完整頁面、可視區域或指定元素。

**Playwright：** 使用上方方法 B 的 `page.screenshot()` 範例，加上 `deviceScaleFactor: 2` 可輸出 Retina 2x 解析度：

```javascript
const context = await browser.newContext({
  deviceScaleFactor: 2, // output image will be 2880×1800 for 1440×900 viewport
});
```

## Slide Deck 匯出（PPTX）

> 重要限制：HTML / CSS / React 無法直接匯出為 PPTX 格式，所有方案皆為間接轉換。

### 方案 A（推薦）：PDF → Google Slides

1. 用方法 A 或 B 匯出 PDF
2. 開啟 Google Slides → 「檔案」→「匯入投影片」
3. 選擇 PDF 檔案，每頁 PDF 會變成一張圖片投影片
4. 可在 Slides 內加上說明文字、動畫等

**優點：** 流程簡單，保留視覺效果。  
**缺點：** 投影片內容為圖片，無法在 Slides 內編輯文字。

### 方案 B：Playwright 截圖 + pptxgenjs 組合

適合：需要在 PPTX 內保留部分可編輯結構，或批次處理多張 slide 的情境。安裝：`npm install playwright pptxgenjs`

**範例：**
```javascript
import { chromium } from 'playwright';
import pptxgen from 'pptxgenjs';

const slides = [
  'file:///absolute/path/slide-01.html',
  'file:///absolute/path/slide-02.html',
];

const browser = await chromium.launch();
const pptx = new pptxgen();

// Set presentation dimensions (16:9)
pptx.defineLayout({ name: 'WIDE', width: 13.33, height: 7.5 });
pptx.layout = 'WIDE';

for (const url of slides) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(url);
  await page.waitForTimeout(500);

  // Capture as base64 PNG
  const imgData = await page.screenshot({ encoding: 'base64' });
  await page.close();

  // Add slide with full-bleed image
  const slide = pptx.addSlide();
  slide.addImage({
    data: `image/png;base64,${imgData}`,
    x: 0, y: 0, w: '100%', h: '100%',
  });
}

await browser.close();
await pptx.writeFile({ fileName: 'output.pptx' });
```

### 方案 C：直接在 HTML 版本呈現

design-craft skill 產生的 slide 版本（`deck_stage.js`）支援全螢幕模式，可直接用瀏覽器 present：

- 按 `F11` 進入全螢幕
- 使用鍵盤方向鍵或滑鼠點擊切換頁面
- 適合在有網路的環境直接簡報，無需轉檔

## 尺寸速查表

| 用途 | 推薦尺寸（px） |
|------|--------------|
| 簡報 16:9（高解析） | 1920 × 1080 |
| 簡報 16:9（螢幕用） | 1440 × 810 |
| A4 直式（96 dpi） | 794 × 1123 |
| Dribbble | 1600 × 1200 |
| Twitter / X OG Image | 1200 × 628 |
| iOS App Store（iPhone 15 Pro） | 1290 × 2796 |

## 動畫設計的匯出注意事項

- **PDF 無法保留動畫**：PDF 只捕捉靜態畫面，CSS animation 和 JS transition 不會呈現
- **截圖只抓單一靜態 frame**：若動畫尚未到達目標狀態，需調整 `waitForTimeout` 時間

**若需要展示動畫，改用 Playwright 錄製影片：**

```javascript
// recordVideo must be set at context creation, not on the page
const context = await browser.newContext({
  recordVideo: { dir: './videos/', size: { width: 1440, height: 900 } },
});
const page = await context.newPage();
await page.goto('file:///absolute/path/to/design.html');
await page.waitForTimeout(3000); // let animations play out
await context.close(); // video (.webm) is saved on context close
await browser.close();
```

輸出為 `.webm`，可用 ffmpeg 轉換：`ffmpeg -i videos/output.webm -c:v libx264 output.mp4`

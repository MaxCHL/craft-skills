# 互動原型規則

> 適用：App 原型、Web mockup、可點擊的高保真 UI 呈現。

---

## 開工前確認清單

在動手前，先確認以下事項（一次問完）：

```
開始製作原型前，確認幾件事：

1. 平台：iOS App / Android App / Web（桌面）/ Web（行動）？
2. 核心畫面：需要哪幾個主要頁面？（建議 3–5 個，覆蓋主要流程）
3. 有設計稿或截圖嗎？有的話請提供作為參考
4. 有品牌色或字體規範嗎？
```

---

## 裝置邊框使用

| 平台 | 使用元件 | 尺寸 |
|------|---------|------|
| iOS | `assets/ios_frame.jsx` | 預設 `standard` 393×852；`"pro"` 402×874、`"pro-max"` 440×956、`"se"` 375×667 |
| Android | `assets/android_frame.jsx` | 預設 `pixel` 412×917；`"pixel-compact"` 393×851、`"samsung-s"` 360×780、`"samsung-plus"` 384×854、`"ultra"` 384×832 |
| macOS App | `assets/macos_window.jsx` | 預設 `default` 1280×800（內容區）；title bar 額外加 28px |
| Web 桌面 | `assets/browser_window.jsx` | 1440 × 900（內容區高度；實際元件總高多 ~54px chrome bar） |
| Web 行動 | 直接用 393 × 852 viewport 容器，不套 ios_frame.jsx | 393 × 852 |

裝置邊框 inline 進 HTML，prototype 內容放在邊框內的 viewport 容器中。

---

## 狀態管理原則

```javascript
// State management pattern for prototypes
const AppState = {
  current: 'home',    // current screen name
  history: [],        // navigation stack

  navigate(screen) {
    this.history.push(this.current);
    this.current = screen;
    this.render();
  },

  back() {
    if (this.history.length > 0) {
      this.current = this.history.pop();
      this.render();
    }
  }
};
```

- 每個畫面是獨立的 `<div>` 或 React component，用 state 控制顯示 / 隱藏
- 不用 `window.location`，不依賴路由函式庫
- 動畫切換：`transition: opacity 0.2s, transform 0.25s`；保持輕量

---

## 真實圖片取用

若需要展示圖片內容：

1. **優先**：Picsum（`https://picsum.photos/{w}/{h}`）— 穩定可用，支援任意尺寸
2. **次選**：Placehold.co（`https://placehold.co/{w}x{h}`）— 可自訂色彩與文字標籤
3. **明確標記**：所有佔位圖片用 `data-placeholder="true"` 標記，交付時告知使用者替換

禁止使用 Unsplash Source API（`source.unsplash.com` 已於 2022 年關閉，所有請求均 503）。
禁止使用 AI 生成圖片 URL 或任何未驗證的外部網址。

---

## 互動細節標準

- **點擊 / Tap**：有 `active` 狀態（輕微縮放 `scale(0.97)` 或背景色變化）
- **按鈕**：最小點擊區域 44 × 44px（iOS HIG 標準）
- **輸入框**：有 focus 樣式（邊框色變化 + 輕微陰影）
- **Loading 狀態**：超過 3 個畫面的 prototype 需加 skeleton screen 或 spinner

---

## Placeholder 標記規範

不確定內容時，誠實標記而非亂填：

```html
<!-- Text placeholder -->
<span data-placeholder="copy">此處為正式文案</span>

<!-- Image placeholder -->
<div data-placeholder="image" style="background: #E5E7EB; border-radius: 8px;">
  <span style="color: #9CA3AF; font-size: 12px;">400 × 300 產品圖</span>
</div>
```

---

## 交付驗證

完成後執行：

```bash
# Playwright screenshot verification
npx playwright screenshot --browser chromium prototype.html output.png

# Or open in browser directly
open prototype.html
```

確認：
- [ ] 所有按鈕可點擊，切換正確
- [ ] 裝置邊框完整顯示
- [ ] 字體 / 色彩符合指定風格
- [ ] 沒有 console error

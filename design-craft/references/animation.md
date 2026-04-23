# 動畫設計規則

> 適用：原型互動動效、簡報頁面切換、資訊圖表動態、Loading 狀態、UI micro-interaction。

---

## 動畫使用原則

動畫服務目的，不成為主角：

1. **有意義** — 每個動畫應傳達狀態變化、引導注意力、或提供操作回饋
2. **快不慢** — UI 動畫應讓人感覺「順暢」而非「等待」
3. **克制** — 同一時間只有一個主角在動；不要全部同時動
4. **尊重偏好** — 永遠實作 `prefers-reduced-motion`

---

## Motion Tokens

```css
/* Duration */
--dur-instant:  80ms;   /* 即時回饋：tap feedback、toggle */
--dur-fast:    150ms;   /* 快速過渡：tooltip、dropdown */
--dur-normal:  250ms;   /* 標準過渡：頁面切換、modal */
--dur-slow:    400ms;   /* 強調：onboarding、hero animation */
--dur-enter:   300ms;   /* 進場 */
--dur-exit:    200ms;   /* 離場（通常比進場快） */

/* Easing */
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);    /* 標準：大多數 UI 過渡 */
--ease-enter:   cubic-bezier(0, 0, 0.2, 1);       /* 物件從靜止加速進場 */
--ease-exit:    cubic-bezier(0.4, 0, 1, 1);       /* 離場加速到靜止 */
--ease-bounce:  cubic-bezier(0.34, 1.56, 0.64, 1);/* 輕微彈性（謹慎使用） */
--ease-linear:  linear;                            /* 只用於 progress / spin */
```

---

## 場景類型與推薦規格

| 場景 | 動畫方式 | Duration | Easing |
|------|---------|---------|--------|
| 頁面切換（原型） | `opacity` + 微 `translateY(-8px→0)` | 250ms | ease-enter |
| 模態視窗出現 | `opacity` + `scale(0.96→1)` | 200ms | ease-enter |
| 抽屜 / Drawer | `translateX(-100%→0)` | 300ms | ease-enter |
| Tooltip / Popover | `opacity` + `scale(0.95→1)` | 150ms | ease-enter |
| Tap / Click 回饋 | `scale(0.97)` 壓下 → release 彈回 | 150ms total | linear |
| 數字遞增（CountUp） | `requestAnimationFrame` 數字插值 | 600–800ms | ease-out |
| Progress bar 填充 | `width` CSS transition | 視進度而定 | linear |
| 幻燈片切換 | sequential fade（參見下方） | 300ms × 2 | ease |
| Loading spinner | `rotate(360deg)` infinite | 800ms/cycle | linear |

---

## deck_stage.js 動畫說明

`deck_stage.js` 內建的頁面切換是 **sequential fade**：

1. 前頁 opacity `1 → 0`（300ms）
2. 待 300ms 後，新頁 opacity `0 → 1`（300ms）

**合適加動畫的頁面類型**

| 頁面類型 | 建議 |
|---------|------|
| 封面頁 | 標題做 `translateY(-20px → 0) + opacity` 進場，delay 100ms |
| 數據頁 | 大數字做 CountUp；圖表做 draw animation |
| 強調頁（全版色塊） | 切換後立刻觸發文字 stagger 進場，delay 每行 80ms |
| 一般內容頁 | 不加額外動畫，切換的 fade 本身已足夠 |

---

## CSS 實作範本

### 元素進場（通用）

```css
.animate-in {
  animation: fadeSlideIn var(--dur-normal, 250ms) var(--ease-enter, cubic-bezier(0,0,0.2,1)) both;
}
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### Stagger 分段進場（最多 4–5 項）

```css
.stagger-item { animation: fadeSlideIn 250ms var(--ease-enter) both; }
.stagger-item:nth-child(1) { animation-delay:   0ms; }
.stagger-item:nth-child(2) { animation-delay:  80ms; }
.stagger-item:nth-child(3) { animation-delay: 160ms; }
.stagger-item:nth-child(4) { animation-delay: 240ms; }
```

### Tap 回饋

```css
.btn:active { transform: scale(0.97); transition: transform 80ms linear; }
.btn        { transition: transform 150ms var(--ease-default); }
```

### Reduced Motion（必實作）

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 常見錯誤

- **Duration 太長**：UI 動畫超過 400ms 讓人覺得慢；>600ms 只適合 hero / onboarding
- **全部同時動**：同頁超過 2 個元素同時動，使用者不知道看哪裡
- **Bounce 濫用**：彈性感在大多數 UI 場景不合適，謹慎使用
- **元素消失無 exit 動畫**：突然消失比任何動畫都更突兀；出場要有 exit
- **用 top/left/width 做動畫**：觸發 Layout 重排；永遠用 `transform` + `opacity`
- **忘記 prefers-reduced-motion**：前庭障礙使用者可能因動畫造成不適，這是可及性要求

---

## R1 / R7 / Anti-AI 風格的動畫哲學

這三種 Trending 風格刻意「反流暢」：

- 使用 `steps()` easing 製造逐格動畫感
- 用微小的 `translateX(±2px)` jitter 模擬手持攝影機
- 刻意的不完美 timing（非整數 delay）
- 避免任何 ease-in-out 的「AI 式流暢感」

```css
/* Anti-AI jitter keyframe */
@keyframes jitter {
  0%   { transform: translate(0, 0) rotate(0deg); }
  25%  { transform: translate(1px, -1px) rotate(0.3deg); }
  50%  { transform: translate(-1px, 1px) rotate(-0.2deg); }
  75%  { transform: translate(1px, 0) rotate(0.1deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}
```

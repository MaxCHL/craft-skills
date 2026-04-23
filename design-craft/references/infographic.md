# 資訊圖表規則

> 適用：資訊圖、數據視覺化、Dashboard、統計摘要頁、報告插圖。

---

## 開工前確認清單

```
開始製作資訊圖前，確認幾件事：

1. 資料來源：有具體數據嗎？請提供（即使是草稿數字也可以）
2. 輸出形式：網頁瀏覽 / 截圖用 / 印刷 PDF？
3. 尺寸需求：固定尺寸（如 A4、1080px 方形）或自適應？
4. 主要訊息：這張圖最想讓人記住哪一件事？
```

資料不齊時：先用 `data-placeholder` 佔位，標記清楚再交付。

---

## 圖表類型選擇

| 目的 | 推薦圖表 |
|------|---------|
| 比較大小 | 橫條圖（Bar）、點圖（Dot plot） |
| 趨勢變化 | 折線圖（Line）、面積圖（Area） |
| 組成比例 | 圓餅圖（Pie，≤5 項）、矩形樹圖（Treemap） |
| 相關性 | 散點圖（Scatter）、氣泡圖（Bubble） |
| 分佈 | 直方圖（Histogram）、箱形圖（Box） |
| 流程 / 關係 | Sankey 圖、網路圖 |
| 地理資料 | Choropleth Map（搭配 GeoJSON） |

**避免使用**：3D 圓餅圖（難以判讀）、雙 Y 軸（容易誤導）

---

## 技術實作

### 優先使用 Chart.js（CDN inline）

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
```

簡單圖表（Bar、Line、Pie）用 Chart.js 即可。

### 複雜視覺化用純 CSS / SVG

進度條、比較圖、關係圖等，用 CSS Grid + SVG 手刻，不依賴外部函式庫。

### 圖表設定原則

```javascript
// Default chart options — clean, minimal
const defaultOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom', labels: { padding: 20 } },
    tooltip: { backgroundColor: '#1F2937', padding: 12, cornerRadius: 8 }
  },
  scales: {
    x: { grid: { display: false }, border: { display: false } },
    y: { grid: { color: 'rgba(0,0,0,0.06)' }, border: { display: false } }
  }
};
```

---

## 色彩規範

**數據圖表色板（預設）**

```css
--color-primary:   #2563EB;  /* main data series */
--color-secondary: #7C3AED;  /* second series */
--color-accent:    #059669;  /* positive / highlight */
--color-warning:   #D97706;  /* warning / attention */
--color-danger:    #DC2626;  /* negative / critical */
--color-neutral:   #6B7280;  /* supporting / inactive */
```

- 色盲友善：避免純紅 / 純綠作為唯一區分依據，搭配形狀或圖案
- 最多使用 5 個系列色；超過 5 個系列考慮分圖

---

## 資訊層級設計

每張資訊圖應有明確的三層結構：

```
Layer 1（一眼看見）：主數字 / 核心結論 — 最大字號、最強顏色
Layer 2（細讀理解）：圖表本體、輔助文字
Layer 3（參考佐證）：來源標注、方法說明、腳注
```

---

## 印刷 / 截圖輸出

- 網頁瀏覽：`width: 100%; max-width: 1200px`，自適應
- 固定截圖：明確指定 `width + height`，用 `overflow: hidden`
- 印刷 PDF：使用 `@media print` 加入樣式，隱藏互動元素

---

## 常見錯誤

- 圖表沒有標題（讀者不知道看什麼）
- 沒有來源標注（可信度下降）
- 色彩對比不足（WCAG AA：一般文字 ≥ 4.5:1；大文字 18pt+ 或粗體 14pt+ 則 ≥ 3:1）
- Y 軸不從零開始但沒有標注說明（誤導讀者）
- 資料點太多導致視覺雜亂（超過 12 個資料點考慮摘要化）

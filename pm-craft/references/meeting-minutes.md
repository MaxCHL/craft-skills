# Meeting Minutes — 逐字稿到專業會議記錄

把雜亂的會議逐字稿（含 STT 同音字、贅字、缺結構）轉為**多維度**的專業會議記錄。

**載入時機**：使用者請求「整理會議記錄」「會議逐字稿整理」「會議摘要」「抓 action items」「meeting minutes」「transcript cleanup」。

---

## When to Use

- 使用者提供一段（或一份檔案）會議逐字稿、錄音轉文字結果
- 即使逐字稿不完整、缺講者標籤、缺日期，仍應主動處理並標註不確定

## When NOT to Use

- 還沒有逐字稿（這不是 STT 工具）→ 請使用者先轉文字
- 即時會議協作 / 同步筆記 → 此 reference 是事後整理用
- 多語翻譯 → 預設保留原語言（zh-TW 為主）

---

## Workflow（6-Phase）

詳見 `meeting-minutes/workflow.md`。摘要：

1. **Intake** — 抽 metadata（日期、與會者、議程、會議類型）；缺漏標 `[需確認]`
2. **Preprocess** — 套 `meeting-minutes/stt-correction.md` 修同音字、清贅字、normalize 講者
3. **Segment** — 依議程或主題斷句切段
4. **Extract** — 撈決議、行動項目、風險、開放問題
5. **Assemble** — 套 `meeting-minutes/dimensions.md` 組四維度輸出
6. **Verify & Save** — 列 `[需確認]` 清單；預設寫到 `./meeting-notes/YYYY-MM-DD-{slug}.md`

---

## Input Detection

掃描逐字稿開頭 / 結尾 / 使用者訊息，嘗試抓：

| 欄位 | 抓取線索 |
|------|---------|
| 日期 | 「今天是」「2026/05/14」「禮拜四」（轉絕對日期） |
| 與會者 | 講者標籤、自我介紹段、寄件人 |
| 會議目的 | 開場白「我們今天要討論...」 |
| 議程 | 「第一個議題」「先講 A 再講 B」 |
| 會議類型 | 見下方 Routing Table |

任何欄位缺漏 → 在輸出 metadata 區用 `[需確認]` 標註，**不停下來問**（除非完全無法判讀會議主題）。

---

## Routing Table — 選範本

依逐字稿關鍵詞自動路由：

| 線索關鍵詞 | 範本檔 |
|-----------|--------|
| roadmap, OKR, KR, GTM, 競品, pricing, 上線, 業務 | `meeting-minutes/template-product.md` |
| 1-on-1, 績效, 目標設定, career, 回饋, growth | `meeting-minutes/template-one-on-one.md` |
| 訪談, 痛點, 使用情境, JTBD, persona | `meeting-minutes/template-customer-interview.md` |
| 架構, API, schema, migration, 技術選型, ADR | `meeting-minutes/template-technical.md` |

若關鍵詞混合或不明顯 → 預設 `template-product.md`，並在 metadata 標 `[推測:產品決策會議]`。

---

## Core Principles

1. **保真優先** — 不改寫原始講者意圖；不確定用 `[需確認]` 而非腦補
2. **三層標註系統**
   - `[需確認]` — 資訊缺漏（無日期、Owner 不明）
   - `[推測:X]` — STT 修正建議（同音字、人名）；X 是修正後內容
   - `[unclear]` — 完全無法判讀的片段，保留原文於 Appendix
3. **行動項目鐵三角** — Owner、Due、可驗收完成條件，缺一即標 `[需確認]`
4. **決議 vs 討論分離** — 沒拍板的不放 Decisions，放 Open Questions
5. **主動補完** — metadata、議程結構、會議目的若缺，主動推測並標註；不卡關提問

---

## Output Dimensions（預設四維全產）

詳見 `meeting-minutes/dimensions.md`。

1. **TL;DR** — 3-5 句，30 秒可掌握
2. **Executive Summary** — 一頁式，套 SCQA 框架
3. **Detailed Notes** — 依議程逐項，含背景 / 討論 / 結論
4. **Decisions & Action Items** — 表格化，Owner + Due + 完成條件

附加區塊每份都有：Open Questions、Risks & Blockers、Appendix（標註索引、待釐清清單、`[unclear]` 原文）。

---

## Best Practices 對應

詳見 `meeting-minutes/best-practices.md`：

- **Robert's Rules of Order** — 動議 / 附議 / 表決紀錄
- **ISO 9001 品質紀錄** — 可追溯性
- **ADR** — 技術會議的決策紀錄
- **JTBD** — 客戶訪談的提問框架
- **SCQA** — Executive Summary 的寫作框架
- **RACI** — Action Item 的責任分配

---

## Output Rules

### 預設行為（使用者沒指定）

- 產出**四個維度全部** + 附加區塊
- **存檔**到 `./meeting-notes/YYYY-MM-DD-{slug}.md`（資料夾不存在則自動建立）
- slug 規則：從會議標題抽 2-4 字關鍵詞，kebab-case

### 使用者明說「不要存檔」/「inline」

- 僅輸出到對話，不寫檔
- 仍產四維度全部（除非另外縮減）

### 使用者指定維度（例「只要 TL;DR 和 action items」）

- 僅產指定維度；仍寫檔（除非明說 inline）

---

## File Map

```
pm-craft/references/meeting-minutes.md         ← you are here (entry)
pm-craft/references/meeting-minutes/
├── workflow.md                                ← 六階段流程細節
├── stt-correction.md                          ← STT 修正規則
├── dimensions.md                              ← 四維度格式規範
├── best-practices.md                          ← Robert's Rules / ISO / ADR / JTBD / SCQA
├── template-product.md                        ← 產品/業務決策範本
├── template-one-on-one.md                     ← 1-on-1 範本（含隱私警告）
├── template-customer-interview.md             ← 客戶訪談範本
└── template-technical.md                      ← 技術討論範本
```

---

## Anti-Patterns（絕不做）

- ❌ 編造 metadata（日期、與會者）以避免標 `[需確認]`
- ❌ 把「討論過但未拍板」寫成 Decision
- ❌ Action Item 沒 Owner 還照樣丟出
- ❌ 大幅改寫使用者原文（除非明說「強力潤稿」）
- ❌ 直接刪掉 `[unclear]` 片段（必須保留於 Appendix）
- ❌ 為了排版整齊就省略反對意見 / 未解問題

---

## Integration with pm-craft

會議記錄常常**餵入下游 PM 文件**：

| 會議類型 | 下游產出 |
|---------|---------|
| 客戶訪談 | 多場彙整 → `opportunity-brief.md` |
| 產品決策 | 拍板的功能 → `epic.md` / `product-spec.md` |
| 技術討論 | ADR 草稿 → spec 的 Non-Goals / Constraints |
| 1-on-1 | （通常獨立，不下游）|

當會議記錄產出後，若使用者要把 insights 變成 Opportunity Brief / Spec，**自動建議路由到對應 reference**。

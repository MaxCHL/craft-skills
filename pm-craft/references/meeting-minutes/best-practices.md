# 會議記錄最佳實務精華

整合多個業界標準與框架，按使用情境對應。

---

## 1. Robert's Rules of Order — 正式會議結構

來源：美國國會議事規則改編，廣泛用於董事會、正式委員會。

### 核心概念

| 概念 | 中文 | 用途 |
|------|------|------|
| Motion | 動議 | 正式提案：「我提議...」 |
| Second | 附議 | 至少需一人附議才能進入討論 |
| Debate | 辯論 | 正反雙方陳述 |
| Vote | 表決 | 唱名 / 舉手 / 鼓掌；記下贊成 / 反對 / 棄權人數 |
| Minority Report | 少數意見 | 反對方有權留下立場記錄 |
| Tabled | 暫緩 | 不否決，但延後處理 |

### 在會議記錄中的應用

- **正式拍板** = Decisions 表 D#，要記「誰提議、誰附議、表決結果」
- **沒附議** = 動議自動失效，**不放 Decisions**，放 Open Questions
- **少數意見** = Decisions 表的「反對意見」欄；引用反對方原話

### 範本對應

`template-product.md`、`template-one-on-one.md` 不嚴格套用；
正式董事會 / 法人代表會議若使用此 skill，可手動指定 Robert's Rules 模式。

---

## 2. ISO 9001 品質紀錄 — 可追溯性

來源：ISO 9001 質量管理體系，「品質紀錄」要求。

### 三大要求

1. **可識別** — 誰、何時、依據什麼
2. **可追溯** — 從決議能回推到當時的討論、證據、反對意見
3. **不可竄改** — 紀錄一旦封存不應修改；修正用新版本

### 在會議記錄中的應用

- **必填欄位**：日期、與會者、主持人、Note Taker
- **決議的「Rationale」欄不能省**（沒寫理由 = 不可追溯）
- **反對意見必須記** — 即使最後拍板，少數意見的存在是品質紀錄的證據
- **版本管理** — 修訂時新增版本（v1, v2），不直接覆寫
- **附件參照** — 引用的數據 / 文件 / 競品報告應在 Appendix 列出來源

---

## 3. ADR — Architecture Decision Records（技術決策紀錄）

來源：Michael Nygard, 2011。已成為技術決策的事實標準。

### 四要素

```markdown
# ADR-NNN: {標題}

## Status
{Proposed / Accepted / Deprecated / Superseded by ADR-XXX}

## Context
{為何要做這個決定？當時面對什麼問題、什麼約束？}

## Decision
{我們決定做 X，因為...}

## Consequences
{這個決定的後果，包括好、壞、中立的影響}
```

### 在會議記錄中的應用（技術會議）

`template-technical.md` 內建。技術決策每一條都對應一個 ADR 草稿：

| ADR 欄位 | 對應到會議記錄 |
|---------|---------------|
| Context | Detailed Notes 的「背景」段 |
| Decision | Decisions 表 D# |
| Consequences | Risks & Blockers + Open Questions |
| Status | 預設 Accepted（會議當下拍板）|

**延伸**：若團隊已有 ADR 倉庫，會議記錄可在 Appendix 標「本次會議產出 ADR-042, ADR-043 草稿」。

---

## 4. JTBD — Jobs-to-be-Done（客戶訪談框架）

來源：Clayton Christensen，廣泛用於客戶訪談、產品發現。

### 核心問句

| 維度 | 問什麼 |
|------|--------|
| Situation | 「上次發生這個需求時，你正在做什麼？」 |
| Motivation | 「你為什麼要 hire 這個解決方案？」 |
| Expected Outcome | 「事情做完後，你希望變成什麼樣？」 |
| Alternative | 「你目前用什麼方法解決？為什麼不夠好？」 |
| Trigger | 「什麼事件讓你開始找這個解決方案？」 |

### 在會議記錄中的應用（客戶訪談）

`template-customer-interview.md` 內建。Detailed Notes 每個訪談主題都要嘗試抓出：

1. **情境（Situation）** — 受訪者面對的具體場景
2. **痛點（Pain）** — 卡在哪
3. **動機（Motivation / Job）** — 真正想完成的事
4. **替代方案（Workaround）** — 目前怎麼解
5. **觸發事件（Trigger）** — 什麼時候會想換解法
6. **期待結果（Expected Outcome）** — 成功定義

**verbatim quote 是訪談紀錄的精華**，每個主題至少保留 1-2 句原文。

---

## 5. SCQA — McKinsey 寫作框架

來源：Barbara Minto, *The Pyramid Principle*。

### 四段式

| 段 | 寫什麼 |
|----|--------|
| **S**ituation | 大家都知道的背景共識 |
| **C**omplication | 出現的問題 / 變化 / 新資訊 |
| **Q**uestion | 因此產生的核心問題 |
| **A**nswer | 我們的答案 / 決議 |

### 在會議記錄中的應用

**Executive Summary 一定套 SCQA**。

範例：
> **Situation**: 我們今年 Q1-Q2 主推成人版疫苗任務平台，預期 6 月 PMF。
> **Complication**: 6 月 user testing 顯示成人 CPA 高於預期 40%，且競品 Y 已切入。
> **Question**: Q3 應該堅持成人版，還是轉向小兒疫苗 PoC？
> **Answer**: 決議轉向小兒疫苗 PoC，成人版暫緩（D1）。

---

## 6. RACI — 行動項目責任分配

用於 Action Items 的 Owner 不明時的盤點工具。

| 角色 | 意義 |
|------|------|
| **R**esponsible | 實際執行（一個人）|
| **A**ccountable | 最終負責（一個人，可能 = R）|
| **C**onsulted | 需被諮詢（多人）|
| **I**nformed | 需被告知結果（多人）|

### 應用

- Action Items 的 Owner 欄 = **R**
- 若一個 Action 牽涉多人，可在「完成條件」欄補註「需 consult [X]」「需 inform [Y]」
- 「PM 團隊」這種模糊 Owner → 拆成具體的 R + A

---

## 7. 五個好會議記錄的金科玉律

整合所有框架後的精華：

1. **動詞優先** — 「決定做 X」勝過「討論了 X」
2. **編號可追溯** — D1, A1, Q1, R1 全文一致，方便引用
3. **不確定要標** — 寧可標 `[需確認]` 也別腦補
4. **反對意見要留** — 即使沒採納（ISO 9001 + Robert's Rules）
5. **可執行勝過完整** — Action Items 有 Owner + Due 比把所有討論抄齊更重要

---

## 8. 反模式（什麼是壞的會議記錄）

- ❌ **流水帳** — 逐字翻譯誰說了什麼，沒有結構
- ❌ **粉飾太平** — 把反對意見刪掉，只留拍板結論
- ❌ **模糊 Action** — 「研究一下 X」「再看看 Y」（沒 Owner、沒 Due）
- ❌ **混淆「討論」與「決議」** — 都丟到 Decisions 區
- ❌ **缺背景** — 只記結論，三個月後沒人記得為什麼這樣決定
- ❌ **過度潤稿** — 改成書面語以致原意失真
- ❌ **沒 timestamp** — 跨會議無法排序、無法追溯
